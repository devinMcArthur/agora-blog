import React from "react";
import { Container, Flex, Heading } from "@chakra-ui/react";

import Loading from "../Common/Loading";
import { useUserQuery } from "../../generated/graphql";

type Props = {
  match: any;
};

const User = (props: Props) => {
  const { data, loading } = useUserQuery({
    variables: { username: props.match.params.username },
  });

  let content = <Loading />;

  if (data?.user && !loading) {
    const { user } = data;

    content = (
      <Flex flexDir="column">
        <Heading as="h6">@{user.username}</Heading>
      </Flex>
    );
  }

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default User;
