import React from "react";

import { useParams } from "react-router";
import { UserMatchParams } from "../../models/pageParams";
import { UserQuery, useUserQuery } from "../../generated/graphql";
import Loading from "../Common/Loading";
import { Box, Heading } from "@chakra-ui/layout";

const User = () => {
  const { userId } = useParams<UserMatchParams>();

  const [user, setUser] = React.useState<UserQuery["user"]>();

  const { data, loading } = useUserQuery({
    variables: {
      id: userId,
    },
  });

  React.useEffect(() => {
    if (!loading && data?.user) setUser(data.user);
  }, [data, loading]);

  return React.useMemo(() => {
    if (user) {
      return (
        <Box>
          <Heading>
            {user.firstName} {user.middleName} {user.lastName}
          </Heading>
        </Box>
      );
    } else return <Loading />;
  }, [user]);
};

export default User;
