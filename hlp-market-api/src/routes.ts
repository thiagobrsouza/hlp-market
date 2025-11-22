import { Router } from "express";
import { brandRouter } from "./routers/BrandRouter";
import { categoryRouter } from "./routers/CategoryRouter";
import { productRouter } from "./routers/ProductRouter";
import { supplierRouter } from "./routers/SupplierRouter";
import { invoiceRouter } from "./routers/InvoiceRouter";

export const routes = Router();

routes.use(brandRouter);
routes.use(categoryRouter);
routes.use(productRouter);

routes.use(supplierRouter);
routes.use(invoiceRouter);