import * as React from "react";

import PageCard from "../Common/PageCard";
import Container from "../Common/Container";
import Flex from "../Common/Flex";
import Loading from "../Common/Loading";
import FinalValue from "./views/FinalValue";

import { useVariableQuery } from "../../generated/graphql";

type Props = {
  match: any;
};

const Variable = (props: Props) => {
  const { data, loading } = useVariableQuery({
    variables: { id: props.match.params.variableID },
  });

  let content = <Loading />;
  if (data?.variable && !loading) {
    const { variable } = data;
    const relatedPageList = variable.relatedPages.map((relatedPage) => (
      <PageCard
        page={relatedPage}
        referenceObject={{ type: "variable", variableID: variable._id }}
      />
    ));

    const currentVersion = variable.versions[variable.versions.length - 1];

    content = (
      <Flex flexDirection="column">
        <h2>{variable.title}</h2>
        <h3>
          Current: <FinalValue finalValue={currentVersion.finalValue} />
        </h3>
        <i>updated: {currentVersion.createdAt}</i>
        <i>
          <a href={currentVersion.sourceURL} target="_blank" rel="noreferrer">
            source
          </a>
        </i>
        <Flex>{relatedPageList}</Flex>
      </Flex>
    );
  }

  return <Container>{content}</Container>;
};

export default Variable;
