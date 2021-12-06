const questionLink = (slug: string) => {
  return `/q/${slug}`;
};

const createLink = {
  questionLink,
};

export default createLink;
