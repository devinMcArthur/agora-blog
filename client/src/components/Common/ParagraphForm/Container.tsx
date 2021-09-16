import { Heading } from "@chakra-ui/layout";
import React from "react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";
import Loading from "../Loading";
import StatementForm from "./StatementForm";

const Container = () => {
  const {
    state: { statements },
  } = useParagraphForm();

  if (statements === undefined) return <Loading />;
  if (statements === null) return <Heading>Unable to find this page</Heading>;

  const statementForms = statements.map((statement) => (
    <StatementForm statement={statement} />
  ));

  return <div>{statementForms}</div>;
};

export default Container;
