import { Paragraph } from "@models";

const paragraph = (id: string) => {
  return Paragraph.getById(id);
};

export default {
  paragraph,
};
