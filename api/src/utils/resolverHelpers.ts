import { StringArrayData } from "@graphql/resolvers/statement/mutations";
import { IContext } from "@typescript/graphql";
import {
  IStringArrayBuildData,
  IStylesBuildData,
} from "@typescript/models/Statement";

const validateVerifiedUser = (ctx: IContext) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!ctx.user) throw new Error("Must be logged in to do this");

      if (!ctx.user.verified)
        throw new Error("You do not have permission to do this");

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const handleStringArray = (dataStringArray: StringArrayData[]) => {
  return new Promise<IStringArrayBuildData[]>(async (resolve, reject) => {
    try {
      const stringArray: IStringArrayBuildData[] = [];

      for (let j = 0; j < dataStringArray.length; j++) {
        const stringArrayItem = dataStringArray[j];

        const styles: IStringArrayBuildData["styles"] = [];

        for (let s = 0; s < stringArrayItem.styles.length; s++) {
          const dataStyle = stringArrayItem.styles[s];

          let value: IStylesBuildData["value"] = {};

          if (dataStyle.type === "image") {
            const imageFile = await dataStyle.value!.image!.file;

            value = {
              image: {
                ...dataStyle.value!.image!,
                file: {
                  mimetype: imageFile.mimetype,
                  stream: imageFile.createReadStream(),
                },
              },
            };
          } else {
            value = {
              page: dataStyle.value?.page,
              statement: dataStyle.value?.statement,
              url: dataStyle.value?.url,
              variable: dataStyle.value?.variable,
            };
          }

          styles.push({
            ...dataStyle,
            value,
          });
        }

        stringArray.push({
          ...stringArrayItem,
          styles,
        });
      }

      resolve(stringArray);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  validateVerifiedUser,
  handleStringArray,
};
