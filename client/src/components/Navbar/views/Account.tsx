import React from "react";

import { Button } from "@chakra-ui/button";
import { FiUser } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useUserLoginForm } from "../../../forms/user";
import { useUserLoginMutation } from "../../../generated/graphql";
import { useAuth } from "../../../contexts/Auth";
import { useHistory } from "react-router";

const NavbarAccount = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    login,
    logout,
    state: { user },
  } = useAuth();
  const [loginMutation, { loading }] = useUserLoginMutation();

  const { FormComponents, setError } = useUserLoginForm();

  const history = useHistory();

  React.useEffect(() => {
    if (user) onClose();
  }, [user, onClose]);

  console.log("user", user);

  return (
    <>
      {user ? (
        <Menu>
          <MenuButton
            backgroundColor="gray.700"
            fontWeight="bold"
            borderRadius="50%"
            width="40px"
            height="40px"
            color="white"
            _hover={{ backgroundColor: "gray.800" }}
          >
            {user.firstName.charAt(0)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => history.push(`/u/${user._id}`)}>
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => logout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          fontWeight="bold"
          backgroundColor="transparent"
          border="1px solid black"
          size="sm"
          borderRadius={0}
          _hover={{ backgroundColor: "gray.400" }}
          leftIcon={<FiUser />}
          onClick={onOpen}
        >
          Sign In
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted>
            <TabList>
              <Tab>Sign in</Tab>
              <Tab>Sign up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormComponents.Form
                  submitHandler={async (data) => {
                    try {
                      const result = await loginMutation({
                        variables: { data },
                      });

                      if (result.data?.login) login(result.data.login);
                    } catch (e: any) {
                      setError(
                        "email",
                        { message: e.message },
                        { shouldFocus: true }
                      );
                    }
                  }}
                >
                  <FormComponents.Email />
                  <FormComponents.Password />
                  <Button isLoading={loading} type="submit" w="100%" my={2}>
                    Submit
                  </Button>
                </FormComponents.Form>
              </TabPanel>
              <TabPanel>signup</TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NavbarAccount;
