import { Heading } from "@chakra-ui/layout";
import React from "react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";
import Loading from "../Loading";
import SlateTest from "./SlateTest";

const Container = () => {
  const {
    state: { paragraph },
  } = useParagraphForm();

  if (paragraph === null) return <Heading>Unable to find this page</Heading>;
  if (paragraph) return <SlateTest />;

  return <Loading />;
};

export default Container;
