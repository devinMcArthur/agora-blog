import populateOptions from "./populate_Options";

export default interface GetByIDOptions extends populateOptions {
  throwError?: boolean;
}
