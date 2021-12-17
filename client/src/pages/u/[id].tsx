import React from "react";

import Head from "next/head";
import { Text } from "@chakra-ui/react";
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
import UserContributions from "../../components/u/id/Contributions";

const User: PageSsrUserComp = ({ data: propsData }) => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user: authUser },
  } = useAuth();

  const [user, setUser] = React.useState(propsData!.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (propsData?.user) setUser(propsData.user);
  }, [propsData]);

  /**
   * ----- Rendering -----
   */

  const settingsButton = React.useMemo(() => {
    if (user._id === authUser?._id) {
      return <Button onClick={onOpen}>Edit Profile</Button>;
    }
  }, [user, authUser, onOpen]);

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>
          {user.firstName} {user.lastName}
        </title>
        <meta
          name="description"
          content={`Page for ${user.firstName} ${user.lastName}`}
        />
      </Head>
      <Box display="flex" flexDir="row" justifyContent="space-between">
        <Box display="flex" flexDir="row">
          <Heading>
            {user.firstName} {user.middleName} {user.lastName}
          </Heading>
          <Icon margin="auto" mx={2} as={GoVerified} />
        </Box>
        {settingsButton}
      </Box>
      <Box>{user.bio && <Text m={2}>{user.bio}</Text>}</Box>
      <ClientOnly>
        <UserContributions id={user._id} />
      </ClientOnly>
      {/* SETTINGS MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalBody>
            <ClientOnly>
              <UserSettings
                onUpdate={(data) => {
                  onClose();
                  setUser(data);
                }}
              />
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
