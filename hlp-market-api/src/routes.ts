import { Router } from "express";
import { brandRouter } from "./routers/BrandRouter";
import { categoryRouter } from "./routers/CategoryRouter";
import { productRouter } from "./routers/ProductRouter";
import { supplierRouter } from "./routers/SupplierRouter";
import { invoiceRouter } from "./routers/InvoiceRouter";
import { stockRouter } from "./routers/StockRouter";

export const routes = Router();

routes.use(brandRouter);
routes.use(categoryRouter);
routes.use(productRouter);

routes.use(supplierRouter);
routes.use(invoiceRouter);
routes.use(stockRouter);