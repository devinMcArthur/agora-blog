import { FilterQuery } from "mongoose";

export interface IListOptions<Document> {
  offset?: number;
  pageLimit?: number;
  query?: FilterQuery<Document>;
}
