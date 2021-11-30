import React from "react";

import Head from "next/head";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Container, Heading } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import { useAuth } from "../../contexts/Auth";
import { PageSsrUserComp, ssrSsrUser } from "../../generated/page";
import { Button } from "@chakra-ui/button";
import { GoVerified } from "react-icons/go";
import Icon from "@chakra-ui/icon";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import ClientOnly from "../../components/Common/ClientOnly";
import UserSettings from "../../components/u/id/Settings";

const User: PageSsrUserComp = ({ data: propsData }) => {
  const { user: propsUser } = propsData!;

  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user: authUser },
  } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * ----- Rendering -----
   */

  const settingsButton = React.useMemo(() => {
    if (propsUser._id === authUser?._id) {
      return <Button onClick={onOpen}>Edit Profile</Button>;
    }
  }, [propsUser, authUser]);

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>
          {propsUser.firstName} {propsUser.lastName}
        </title>
      </Head>
      <Box display="flex" flexDir="row" justifyContent="space-between">
        <Box display="flex" flexDir="row">
          <Heading>
            {propsUser.firstName} {propsUser.middleName} {propsUser.lastName}
          </Heading>
          <Icon margin="auto" mx={2} as={GoVerified} />
        </Box>
        {settingsButton}
      </Box>
      {/* SETTINGS MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalBody>
            <ClientOnly>
              <UserSettings />
            </ClientOnly>
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
  const res = await ssrSsrUser.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.user) notFound = true;

  return { ...res, notFound };
};

export default User;
