import { Router } from "express";
import { brandRouter } from "./routers/BrandRouter";
import { categoryRouter } from "./routers/CategoryRouter";
import { productRouter } from "./routers/ProductRouter";

export const routes = Router();

routes.use(brandRouter);
routes.use(categoryRouter);
routes.use(productRouter);