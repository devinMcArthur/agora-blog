import React from "react";

import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useUserLoginForm, useUserSignupForm } from "../../../forms/user";
import {
  useCreateUserMutation,
  useUserLoginMutation,
} from "../../../generated/graphql";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Button } from "@chakra-ui/button";
import { useAuth } from "..";

interface ISignIn {
  isOpen: boolean;
  close: () => void;
}

const SignIn = ({ isOpen, close }: ISignIn) => {
  const { login } = useAuth();

  const [loginMutation, { loading: loginLoading }] = useUserLoginMutation();
  const [createUser, { loading: createUserLoading }] = useCreateUserMutation();

  const { FormComponents: LoginFormComponents, setError: setLoginError } =
    useUserLoginForm();
  const {
    FormComponents: SignupFormComponents,
    setGeneralError: setSignupError,
  } = useUserSignupForm();

  return (
    <Modal isOpen={isOpen} onClose={close}>
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

                    if (result.data?.createUser) login(result.data.createUser);
                  } catch (e: any) {
                    setSignupError(e.message);
                  }
                }}
              >
                <SignupFormComponents.GeneralError />
                <SignupFormComponents.FirstName />
                <SignupFormComponents.LastName />
                <SignupFormComponents.MiddleName />
                <SignupFormComponents.Bio />
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
  );
};

export default SignIn;
