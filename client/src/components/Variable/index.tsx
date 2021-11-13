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

  const content = React.useMemo(() => {
    if (data?.variable && !loading) {
      const { variable } = data;
      const relatedPageList = variable.relatedPages.map((relatedPage) => (
        <PageCard
          page={relatedPage}
          referenceObject={{ type: "variable", variableID: variable._id }}
        />
      ));

      const currentVersion = variable.versions[variable.versions.length - 1];

      return (
        <Flex flexDirection="column">
          <Heading size="lg">{variable.title}</Heading>
          <Divider m={2} />
          <Heading size="md">
            Current: <FinalValue finalValue={currentVersion.finalValue} />
          </Heading>
          <i>updated: {currentVersion.createdAt}</i>
          {currentVersion.sourceUrl ? (
            <i>
              <TextLink link={currentVersion.sourceUrl} isExternal>
                source
              </TextLink>
            </i>
          ) : null}
          <Divider m={2} />
          <Flex>{relatedPageList}</Flex>
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [data, loading]);

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Variable;
