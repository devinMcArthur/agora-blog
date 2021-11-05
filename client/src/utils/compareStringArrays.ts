import { FullStringArraySnippetFragment } from "../generated/graphql";

const compareStringArrays = (
  stringArray1: FullStringArraySnippetFragment[],
  stringArray2: FullStringArraySnippetFragment[]
) => {
  if (stringArray1.length !== stringArray2.length) {
    return false;
  }

  for (let i = 0; i < stringArray1.length; i++) {
    const item1 = stringArray1[i];
    const item2 = stringArray2[i];

    if (item1.string !== item2.string) return false;

    if (item1.styles.length !== item2.styles.length) return false;

    // filter styles
    const filteredStyles1 = item1.styles.filter((a, b) => {
      // @ts-expect-error
      if (a.type < b.type) return -1;
      // @ts-expect-error
      if (a.type > b.type) return 1;
      return 0;
    });

    const filteredStyles2 = item2.styles.filter((a, b) => {
      // @ts-expect-error
      if (a.type < b.type) return -1;
      // @ts-expect-error
      if (a.type > b.type) return 1;
      return 0;
    });

    for (let s = 0; s < filteredStyles1.length; s++) {
      const style1 = filteredStyles1[s];
      const style2 = filteredStyles2[s];

      if (style1.type !== style2.type) return false;

      if (style1.variant !== style2.variant) return false;

      if (style1.value.image) {
        if (style1.value.image.caption !== style2.value.image?.caption)
          return false;
        if (style1.value.image.file._id !== style2.value.image?.file._id)
          return false;
        if (style1.value.image.sourceUrl !== style2.value.image.sourceUrl)
          return false;
      }

      if (style1.value.page) {
        if (style1.value.page._id !== style2.value.page?._id) return false;
      }

      if (style1.value.statement) {
        if (style1.value.statement._id !== style2.value.statement?._id)
          return false;
      }

      if (style1.value.url) {
        if (style1.value.url !== style2.value.url) return false;
      }

      if (style1.value.variable) {
        if (style1.value.variable._id !== style2.value.variable?._id)
          return false;
        if (style1.value.variable.title !== style2.value.variable.title)
          return false;
        if (
          style1.value.variable.finalValue !== style2.value.variable.finalValue
        )
          return false;
      }
    }
  }

  return true;
};

export default compareStringArrays;
