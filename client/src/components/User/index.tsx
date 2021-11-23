import React from "react";

import { useParams } from "react-router";
import { UserMatchParams } from "../../models/pageParams";
import { UserQuery, useUserQuery } from "../../generated/graphql";
import Loading from "../Common/Loading";
import { Box, Container, Heading } from "@chakra-ui/layout";
import Icon from "@chakra-ui/icon";
import { GoVerified } from "react-icons/go";
import { useAuth } from "../../contexts/Auth";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import UserSettings from "./views/Settings";

const User = () => {
  /**
   * ----- Hook Initialization -----
   */
  const { userId } = useParams<UserMatchParams>();

  const {
    state: { user: authUser },
  } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = React.useState<UserQuery["user"]>();

  const { data, loading } = useUserQuery({
    variables: {
      id: userId,
    },
  });

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data?.user) setUser(data.user);
  }, [data, loading]);

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (user) {
      let settingsButton;
      if (userId === authUser?._id) {
        settingsButton = <Button onClick={onOpen}>Edit Profile</Button>;
      }

      return (
        <Container maxW="80%" pt={3}>
          <Box display="flex" flexDir="row" justifyContent="space-between">
            <Box display="flex" flexDir="row">
              <Heading>
                {user.firstName} {user.middleName} {user.lastName}
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
                <UserSettings />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      );
    } else return <Loading />;
  }, [authUser?._id, isOpen, onClose, onOpen, user, userId]);
};

export default User;
