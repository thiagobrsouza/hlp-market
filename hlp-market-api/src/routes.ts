import { Router } from "express";
import { brandRouter } from "./routers/BrandRouter";
import { categoryRouter } from "./routers/CategoryRouter";
import { productRouter } from "./routers/ProductRouter";
import { supplierRouter } from "./routers/SupplierRouter";
import { invoiceRouter } from "./routers/InvoiceRouter";
import { stockRouter } from "./routers/StockRouter";
import { orderRouter } from "./routers/OrderRouter";
import { customerRouter } from "./routers/CustomerRouter";
import { userRouter } from "./routers/UserRouter";
import { authRouter } from "./routers/AuthRouter";

export const routes = Router();

routes.use(authRouter);
routes.use(brandRouter);
routes.use(categoryRouter);
routes.use(productRouter);

routes.use(supplierRouter);
routes.use(invoiceRouter);
routes.use(stockRouter);
routes.use(orderRouter);
routes.use(customerRouter);

routes.use(userRouter);