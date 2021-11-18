import * as React from "react";
import dayjs from "dayjs";

import PageCard from "../Common/PageCard";
import Loading from "../Common/Loading";
import FinalValue from "./views/FinalValue";

import { useVariableQuery } from "../../generated/graphql";
import { Container, Divider, Flex, Heading } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import TextLink from "../Common/TextLink";
import { FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi";
import UserLink from "../Common/UserLink";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import VariableEditProposal from "../Common/VariableEditProposal";
import { useAuth } from "../../contexts/Auth";
import { useDisclosure } from "@chakra-ui/hooks";
import EditVariable from "../EditVariable";

type Props = {
  match: any;
};

const Variable = (props: Props) => {
  /**
   * ----- Hook Initialization -----
   */

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { requiresVerification } = useAuth();

  const { data, loading } = useVariableQuery({
    variables: { id: props.match.params.variableID },
  });

  const [version, setVersion] = React.useState(0);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (data?.variable && !loading) {
      setVersion(data.variable.versions.length - 1);
    }
  }, [data, loading]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.variable && !loading) {
      const { variable } = data;
      const relatedPageList = variable.relatedPages.map((relatedPage) => (
        <PageCard
          page={relatedPage}
          referenceObject={{ type: "variable", variableID: variable._id }}
        />
      ));

      const editProposals = variable.editProposals.map((editProposal) => (
        <VariableEditProposal variableEditProposal={editProposal} />
      ));

      const leftChevronDisabled = version === 0;
      const rightChevronDisabled = version === variable.versions.length - 1;

      const currentVersion = variable.versions[version];

      let author = variable.originalAuthor;
      if (version !== 0 && variable.versions[version].sourceEditProposal) {
        author = variable.versions[version].sourceEditProposal!.author;
      }

      return (
        <Flex flexDirection="column">
          <Box display="flex" flexDir="row" justifyContent="space-between">
            <Heading size="lg">{variable.title}</Heading>
            <IconButton
              aria-label="edit"
              icon={<FiEdit />}
              onClick={() => requiresVerification(() => onOpen())}
            />
          </Box>
          <Divider m={2} />
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            w="100%"
            borderRadius={3}
            backgroundColor="gray.200"
            p={3}
          >
            <IconButton
              aria-label="previous"
              icon={<FiChevronLeft />}
              isDisabled={leftChevronDisabled}
              my="auto"
              onClick={() => {
                if (!leftChevronDisabled) setVersion(version - 1);
              }}
            />
            <Box
              display="flex"
              flexDir="column"
              justifyContent="space-between"
              textAlign="center"
            >
              <Heading size="lg" m={2}>
                <FinalValue finalValue={currentVersion.finalValue} />
              </Heading>
              <i>{dayjs(currentVersion.createdAt).format("MMM D, YYYY")}</i>
              <span>
                {currentVersion.sourceUrl ? (
                  <i>
                    <TextLink link={currentVersion.sourceUrl} isExternal>
                      source
                    </TextLink>{" "}
                    /{" "}
                  </i>
                ) : null}
                <UserLink user={author} />
              </span>
            </Box>
            <IconButton
              aria-label="next"
              icon={<FiChevronRight />}
              isDisabled={rightChevronDisabled}
              my="auto"
              onClick={() => {
                if (!rightChevronDisabled) setVersion(version + 1);
              }}
            />
          </Box>
          <Divider m={2} />
          <Tabs variant="line">
            <TabList>
              <Tab>References</Tab>
              <Tab>Edit Proposals</Tab>
            </TabList>
            <TabPanels>
              <TabPanel display="flex" flexDir="column">
                {relatedPageList}
              </TabPanel>
              <TabPanel display="flex" flexDir="column">
                {editProposals}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Propose an edit</ModalHeader>
              <ModalBody>
                <EditVariable
                  variable={variable}
                  onSuccess={() => {
                    onClose();
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [data, isOpen, loading, onClose, onOpen, requiresVerification, version]);

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Variable;
