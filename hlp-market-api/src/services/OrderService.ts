import type { Order } from "../models/Order.js";
import { prisma } from "../resources/PrismaClient.js";

export class OrderService {

    async create({ customerId, items }: Order) {
        return prisma.$transaction(async (tx) => {
            // 1. Calculate the total value of the order and check stock availability
            let totalOrderValue = 0;
            for (const item of items) {
                const stockItems = await tx.stockItem.findMany({
                    where: {
                        productId: item.productId,
                        quantity: { gt: 0 }
                    },
                    orderBy: { createdAt: 'asc' }
                });

                const totalStock = stockItems.reduce((acc, stock) => acc + stock.quantity, 0);
                if (totalStock < item.quantity) {
                    throw new Error(`Not enough stock for product ID ${item.productId}`);
                }
                totalOrderValue += item.quantity * item.unitPrice;
            }

            // 2. Create the Order
            const order = await tx.order.create({
                data: {
                    customerId,
                    totalValue: totalOrderValue
                }
            });

            // 3. Process each item using FIFO and create OrderItems
            for (const item of items) {
                let quantityToFulfill = item.quantity;

                const stockItems = await tx.stockItem.findMany({
                    where: {
                        productId: item.productId,
                        quantity: { gt: 0 }
                    },
                    orderBy: { createdAt: 'asc' }
                });

                for (const stockItem of stockItems) {
                    if (quantityToFulfill === 0) break;

                    const quantityFromThisStock = Math.min(stockItem.quantity, quantityToFulfill);

                    // Create OrderItem
                    await tx.orderItem.create({
                        data: {
                            orderId: order.id,
                            stockItemId: stockItem.id,
                            quantity: quantityFromThisStock,
                            unitPrice: item.unitPrice,
                            totalValue: quantityFromThisStock * item.unitPrice
                        }
                    });

                    // Update StockItem quantity
                    await tx.stockItem.update({
                        where: { id: stockItem.id },
                        data: { quantity: { increment: -quantityFromThisStock } }
                    });

                    quantityToFulfill -= quantityFromThisStock;
                }
            }

            // 4. Return the complete order with its items
            return tx.order.findUnique({
                where: { id: order.id },
                include: { orderItems: { include: { stockItem: { include: { product: true } } } } }
            });
        });
    }

    async findAll() {
        return prisma.order.findMany({
            include: {
                customer: true,
                orderItems: {
                    include: {
                        stockItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });
    }

    async findById(id: number) {
        return prisma.order.findUnique({
            where: { id },
            include: {
                customer: true,
                orderItems: {
                    include: {
                        stockItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });
    }

    async deleteOne(id: number) {
        return prisma.$transaction(async (tx) => {
            // 1. Find all order items
            const orderItems = await tx.orderItem.findMany({
                where: { orderId: id }
            });

            // 2. Revert stock for each item
            for (const item of orderItems) {
                await tx.stockItem.update({
                    where: { id: item.stockItemId },
                    data: { quantity: { increment: item.quantity } }
                });
            }

            // 3. Delete order items and the order itself
            await tx.orderItem.deleteMany({ where: { orderId: id } });
            await tx.order.delete({ where: { id } });

            return { message: "Order deleted successfully" };
        });
    }

    async deleteOrderItem(orderId: number, orderItemId: number) {
        return prisma.$transaction(async (tx) => {
            // 1. Find the order item
            const orderItem = await tx.orderItem.findUnique({
                where: { id: orderItemId }
            });

            if (!orderItem || orderItem.orderId !== orderId) {
                throw new Error("Order item not found in this order");
            }

            // 2. Revert stock
            await tx.stockItem.update({
                where: { id: orderItem.stockItemId },
                data: { quantity: { increment: orderItem.quantity } }
            });

            // 3. Delete the order item
            await tx.orderItem.delete({ where: { id: orderItemId } });

            // 4. Recalculate order total value
            const remainingItems = await tx.orderItem.findMany({
                where: { orderId: orderId }
            });
            const newTotalValue = remainingItems.reduce((acc, item) => acc + item.totalValue.toNumber(), 0);

            // 5. Update order total value
            return tx.order.update({
                where: { id: orderId },
                data: { totalValue: newTotalValue },
                include: { orderItems: true }
            });
        });
    }

    async update(id: number, { customerId, items }: Order) {
        return prisma.$transaction(async (tx) => {
            // 1. Revert all stock from the original order
            const originalOrderItems = await tx.orderItem.findMany({
                where: { orderId: id }
            });

            for (const item of originalOrderItems) {
                await tx.stockItem.update({
                    where: { id: item.stockItemId },
                    data: { quantity: { increment: item.quantity } }
                });
            }

            // 2. Delete old order items
            await tx.orderItem.deleteMany({ where: { orderId: id } });

            // 3. Now, run the creation logic again for the new items
            let newTotalOrderValue = 0;
            for (const item of items) {
                const stockItems = await tx.stockItem.findMany({
                    where: {
                        productId: item.productId,
                        quantity: { gt: 0 }
                    },
                    orderBy: { createdAt: 'asc' }
                });

                const totalStock = stockItems.reduce((acc, stock) => acc + stock.quantity, 0);
                if (totalStock < item.quantity) {
                    throw new Error(`Not enough stock for product ID ${item.productId} for update`);
                }
                newTotalOrderValue += item.quantity * item.unitPrice;
            }

            // 4. Update the order itself
            await tx.order.update({
                where: { id },
                data: {
                    customerId,
                    totalValue: newTotalOrderValue
                }
            });

            // 5. Process each new item using FIFO
            for (const item of items) {
                let quantityToFulfill = item.quantity;
                const stockItems = await tx.stockItem.findMany({
                    where: {
                        productId: item.productId,
                        quantity: { gt: 0 }
                    },
                    orderBy: { createdAt: 'asc' }
                });

                for (const stockItem of stockItems) {
                    if (quantityToFulfill === 0) break;
                    const quantityFromThisStock = Math.min(stockItem.quantity, quantityToFulfill);

                    await tx.orderItem.create({
                        data: {
                            orderId: id,
                            stockItemId: stockItem.id,
                            quantity: quantityFromThisStock,
                            unitPrice: item.unitPrice,
                            totalValue: quantityFromThisStock * item.unitPrice
                        }
                    });

                    await tx.stockItem.update({
                        where: { id: stockItem.id },
                        data: { quantity: { increment: -quantityFromThisStock } }
                    });

                    quantityToFulfill -= quantityFromThisStock;
                }
            }

            // 6. Return the updated order
            return tx.order.findUnique({
                where: { id },
                include: { orderItems: { include: { stockItem: { include: { product: true } } } } }
            });
        });
    }
}
