import _ from "lodash";

import ElasticsearchClient from "@elasticsearch/client";
import { logger } from "@logger";
import { VariableDocument } from "@models";
import { ES_ensureVariableMapping } from "./mapping";
import { ES_ensureVariableSettings } from "./settings";

export const ES_ensureVariableIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureVariableSettings();
      await ES_ensureVariableMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateVariable = (variable: VariableDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      logger.debug(`Updating variable ${variable._id} in ES`);
      await ElasticsearchClient.update({
        index: "variable",
        id: variable._id.toString(),
        body: {
          doc: {
            variable: {
              title: variable.title,
            },
          },
          doc_as_upsert: true,
        },
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
