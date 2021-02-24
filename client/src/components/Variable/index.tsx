import * as React from "react";
import moment from "moment";

import PageCard from "../Common/PageCard";
import Loading from "../Common/Loading";
import FinalValue from "./views/FinalValue";

import { useVariableQuery } from "../../generated/graphql";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TextLink from "../Common/TextLink";

type Props = {
  match: any;
};

const Variable = (props: Props) => {
  const { data, loading } = useVariableQuery({
    variables: { id: props.match.params.variableID },
  });
  const [showPrevious, setShowPrevious] = React.useState<Boolean>(false);
  const toggleShowPrevious = () => setShowPrevious(!showPrevious);

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

    let previousVersions = (
      <Box align="center">
        <Text
          as="span"
          _hover={{ cursor: "pointer", borderBottom: "1px solid gray" }}
          onClick={() => toggleShowPrevious()}
        >
          Show Previous
        </Text>
      </Box>
    );
    if (showPrevious) {
      previousVersions = (
        <Box align="center">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {variable.versions.map((version, index) => {
                if (index !== variable.versions.length - 1)
                  return (
                    <Tr>
                      <Th>
                        {moment(version.createdAt).format("MMMM D YYYY, h:mm")}
                      </Th>
                      <Th isNumeric>
                        <FinalValue finalValue={version.finalValue} />
                      </Th>
                      <Th>
                        <TextLink link={currentVersion.sourceURL!} isExternal>
                          source
                        </TextLink>
                      </Th>
                    </Tr>
                  );
                else return null;
              })}
            </Tbody>
          </Table>
          <Text
            as="span"
            _hover={{ cursor: "pointer", borderBottom: "1px solid gray" }}
            onClick={() => toggleShowPrevious()}
          >
            Hide Previous
          </Text>
        </Box>
      );
    }

    content = (
      <Flex flexDirection="column">
        <Heading size="lg">{variable.title}</Heading>
        <Divider m={2} />
        <Heading size="md">
          Current: <FinalValue finalValue={currentVersion.finalValue} />
        </Heading>
        <i>updated: {currentVersion.createdAt}</i>
        {currentVersion.sourceURL ? (
          <i>
            <TextLink link={currentVersion.sourceURL} isExternal>
              source
            </TextLink>
          </i>
        ) : null}
        {variable.versions.length > 1 ? previousVersions : null}
        <Divider m={2} />
        <Flex flexDir="column">{relatedPageList}</Flex>
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
