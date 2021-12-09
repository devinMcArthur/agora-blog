import { Button } from "@chakra-ui/button";
import { Box, Center, Container, Heading, Text } from "@chakra-ui/layout";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../contexts/Auth";

const AccessDeniedPage = () => {
  const { openSignInModal } = useAuth();

  return (
    <Container minW="80%" p={4}>
      <Center>
        <Box display="flex" flexDir="column" textAlign="center">
          <Heading>Access Denied</Heading>
          <Text>Must sign in to access this page</Text>
          <Button
            fontWeight="bold"
            backgroundColor="transparent"
            border="1px solid black"
            size="sm"
            borderRadius={0}
            _hover={{ backgroundColor: "gray.400" }}
            leftIcon={<FiUser />}
            onClick={openSignInModal}
          >
            Sign In
          </Button>
        </Box>
      </Center>
    </Container>
  );
};

export default AccessDeniedPage;
