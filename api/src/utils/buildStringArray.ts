import { File } from "@models";
import {
  IStringArrayBuildData,
  StyleTypes,
} from "@typescript/models/Statement";

const buildStringArray = (stringArray: IStringArrayBuildData[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await Promise.all(
          stringArray.map(async (item) => {
            return {
              ...item,
              styles: await Promise.all(
                item.styles.map(async (style) => {
                  let value = {};

                  switch (style.type) {
                    case StyleTypes.image: {
                      value = {
                        image: {
                          caption: style.value?.image?.caption,
                          sourceUrl: style.value?.image?.sourceUrl,
                          file: (await File.build(style.value!.image!.file))
                            ._id,
                        },
                      };
                      break;
                    }
                    default: {
                      value = { ...style.value };
                    }
                  }

                  return {
                    type: style.type,
                    variant: style.variant,
                    value,
                  };
                })
              ),
            };
          })
        )
      );
    } catch (e) {
      reject(e);
    }
  });
};

export default buildStringArray;
