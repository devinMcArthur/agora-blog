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
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useUserLoginForm, useUserSignupForm } from "../../../forms/user";
import {
  useCreateUserMutation,
  useUserLoginMutation,
} from "../../../generated/graphql";
import { useAuth } from "../../../contexts/Auth";
import { useHistory } from "react-router";
import Loading from "../../Common/Loading";

const NavbarAccount = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    login,
    logout,
    state: { user },
  } = useAuth();

  const [loginMutation, { loading: loginLoading }] = useUserLoginMutation();
  const [createUser, { loading: createUserLoading }] = useCreateUserMutation();

  const { FormComponents: LoginFormComponents, setError: setLoginError } =
    useUserLoginForm();
  const {
    FormComponents: SignupFormComponents,
    setGeneralError: setSignupError,
  } = useUserSignupForm();

  const history = useHistory();

  React.useEffect(() => {
    if (user) onClose();
  }, [user, onClose]);

  const content = React.useMemo(() => {
    if (user) {
      return (
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
            <MenuGroup title={`${user.firstName} ${user.lastName}`}>
              <MenuItem onClick={() => history.push(`/u/${user._id}`)}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      );
    } else if (user === null) {
      return (
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
      );
    } else if (user === undefined) {
      return <Loading />;
    }
  }, [history, logout, onOpen, user]);

  return (
    <>
      {content}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted>
            <TabList>
              <Tab>Sign in</Tab>
              <Tab>Sign up</Tab>
            </TabList>
            <TabPanels backgroundColor="gray.100">
              <TabPanel>
                {/* SIGN IN */}
                <LoginFormComponents.Form
                  submitHandler={async (data) => {
                    try {
                      const result = await loginMutation({
                        variables: { data },
                      });

                      if (result.data?.login) login(result.data.login);
                    } catch (e: any) {
                      setLoginError(
                        "email",
                        { message: e.message },
                        { shouldFocus: true }
                      );
                    }
                  }}
                >
                  <LoginFormComponents.Email isLoading={loginLoading} />
                  <LoginFormComponents.Password isLoading={loginLoading} />
                  <Button
                    border="1px solid black"
                    isLoading={loginLoading}
                    type="submit"
                    w="100%"
                    mt={3}
                  >
                    Submit
                  </Button>
                </LoginFormComponents.Form>
              </TabPanel>
              <TabPanel>
                {/* SIGN UP */}
                <SignupFormComponents.Form
                  submitHandler={async (data) => {
                    try {
                      const result = await createUser({ variables: { data } });

                      if (result.data?.createUser)
                        login(result.data.createUser);
                    } catch (e: any) {
                      setSignupError(e.message);
                    }
                  }}
                >
                  <SignupFormComponents.GeneralError />
                  <SignupFormComponents.FirstName />
                  <SignupFormComponents.LastName />
                  <SignupFormComponents.MiddleName />
                  <SignupFormComponents.Email />
                  <SignupFormComponents.Password />
                  <SignupFormComponents.ConfirmationPassword />
                  <Button
                    border="1px solid black"
                    isLoading={createUserLoading}
                    type="submit"
                    w="100%"
                    mt={3}
                  >
                    Submit
                  </Button>
                </SignupFormComponents.Form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NavbarAccount;
