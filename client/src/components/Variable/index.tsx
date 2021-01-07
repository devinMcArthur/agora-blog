import * as React from "react";

import PageCard from "../Common/PageCard";
import Loading from "../Common/Loading";
import FinalValue from "./views/FinalValue";

import { useVariableQuery } from "../../generated/graphql";
import { Container, Divider, Flex, Heading } from "@chakra-ui/react";
import TextLink from "../Common/TextLink";

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
        <Heading size="lg">{variable.title}</Heading>
        <Divider m={2} />
        <Heading size="md">
          Current: <FinalValue finalValue={currentVersion.finalValue} />
        </Heading>
        <i>updated: {currentVersion.createdAt}</i>
        <i>
          <TextLink link={currentVersion.sourceURL} isExternal>
            source
          </TextLink>
        </i>
        <Divider m={2} />
        <Flex>{relatedPageList}</Flex>
      </Flex>
    );
  }

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Variable;
