import { Heading } from "@chakra-ui/layout";
import React from "react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";
import Loading from "../Loading";
import RichText from "../RichText";

const Container = () => {
  const {
    state: { slateParagraph },
    updateSlateParagraph,
  } = useParagraphForm();

  if (slateParagraph === null)
    return <Heading>Unable to find this page</Heading>;
  if (slateParagraph)
    return <RichText value={slateParagraph} onChange={updateSlateParagraph} />;

  return <Loading />;
};

export default Container;
