import * as mongoose from "mongoose";

import PageSchema, { PageModel as PM, PageDocument as PD } from "./functions";

export interface PageModel extends PM {}

export interface PageDocument extends PD {}

export default mongoose.model<PD, PM>("Page", PageSchema);
