import React, { useState } from "react";

import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useLoginMutation } from "../../generated/graphql";

const Login = () => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [loginMutation, { data, loading, error }] = useLoginMutation();

  console.log(data);
  console.log(loading);
  console.log(error);

  return (
    <Container minW="80%" p={4}>
      <Flex justifyContent="center">
        <Box
          w="50%"
          h="50%"
          backgroundColor="gray.100"
          p={4}
          borderRadius={4}
          mt="20%"
        >
          <Heading alignSelf="center">Login</Heading>
          <Divider mt={1} mb={1} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation({
                variables: formData,
              });
            }}
          >
            <FormControl>
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <Input
                  placeholder="username"
                  pl={2}
                  backgroundColor="white"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="password"
                  type="password"
                  backgroundColor="white"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
            <Button mt={4} isFullWidth variant="outline" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
