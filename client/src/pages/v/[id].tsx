import React from "react";

import Head from "next/head";
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Container, Divider, Flex, Heading } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi";
import { useAuth } from "../../contexts/Auth";
import { PageSsrVariableComp, ssrSsrVariable } from "../../generated/page";
import FinalValue from "../../components/Variable/FinalValue";
import dayjs from "dayjs";
import UserLink from "../../components/Common/UserLink";
import TextLink from "../../components/Common/TextLink";
import ClientOnly from "../../components/Common/ClientOnly";
import VariablePageTabs from "../../components/v/id/Tabs";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import EditVariable from "../../components/EditVariable";
import { RestSsrVariableSnippetFragment } from "../../generated/graphql";

const Variable: PageSsrVariableComp = ({ data: propsData }) => {
  const { title, versions, originalAuthor, _id } = propsData!.variable!;

  /**
   * ----- Hook Initialization -----
   */

  const { requiresVerification } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [version, setVersion] = React.useState(versions.length - 1);
  const [fetchedVariablePortion, setFetchedVariablePortion] =
    React.useState<RestSsrVariableSnippetFragment>();

  /**
   * ----- Rendering -----
   */

  const leftChevronDisabled = React.useMemo(() => {
    return version === 0;
  }, [version]);

  const rightChevronDisabled = React.useMemo(() => {
    return version === versions.length - 1;
  }, [versions, version]);

  const author = React.useMemo(() => {
    if (version !== 0 && versions[version].sourceEditProposal)
      return versions[version].sourceEditProposal!.author;
    else return originalAuthor;
  }, [version, versions, originalAuthor]);

  const currentVersion = React.useMemo(() => {
    return versions[version];
  }, [versions, version]);

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex flexDir="column">
        <Box display="flex" flexDir="row" justifyContent="space-between">
          <Heading size="lg">{title}</Heading>
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
        <ClientOnly>
          <VariablePageTabs
            id={_id}
            onFetch={(variable) => setFetchedVariablePortion(variable)}
          />
        </ClientOnly>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Propose an edit</ModalHeader>
          <ModalBody>
            <EditVariable
              variableId={_id}
              variableCache={fetchedVariablePortion}
              onSuccess={() => {
                onClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrSsrVariable.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.variable) notFound = true;

  return { ...res, notFound };
};

export default Variable;
