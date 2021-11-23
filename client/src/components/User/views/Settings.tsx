import React from "react";

import { Box, Divider, Heading, Text } from "@chakra-ui/layout";
import { useAuth } from "../../../contexts/Auth";
import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/alert";
import ErrorMessage from "../../Common/ErrorMessage";
import { Button } from "@chakra-ui/button";
import { useRequestVerificationMutation } from "../../../generated/graphql";
import dayjs from "dayjs";

const UserSettings = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user },
  } = useAuth();

  const [requestVerification, { loading }] = useRequestVerificationMutation();

  /**
   * ----- Rendering -----
   */

  const verificationContent = React.useMemo(() => {
    const disclaimer = (
      <Alert status="info" my={1}>
        <AlertIcon />
        <AlertDescription>
          This verification requirement is temporary. We are working on creating
          democratic systems for the creation and editing of content.
        </AlertDescription>
      </Alert>
    );

    if (!user) {
      return <ErrorMessage />;
    }

    if (user.verified) {
      return (
        <Text>
          Your account is verified! You are now able to contribute to Agora
        </Text>
      );
    }

    if (!user.verificationRequested) {
      return (
        <Box>
          {disclaimer}
          <Text>
            Once you request verification, we will be contacting you as soon as
            possible to schedule a verification call.
          </Text>
          <Button
            w="100%"
            my={3}
            isLoading={loading}
            onClick={() => requestVerification()}
          >
            Request Verification
          </Button>
        </Box>
      );
    }

    if (user.verificationRequested) {
      return (
        <Box textAlign="center">
          {disclaimer}
          <Text>
            You have already requested verification on{" "}
            <b>
              {dayjs(user.verificationRequested.createdAt).format(
                "MMM D, YYYY"
              )}
            </b>
            , we will contact you as soon as possible!
          </Text>
          <Text>
            Be sure to keep an eye out for an email from us.{" "}
            <i>(check your spam folder)</i>
          </Text>
        </Box>
      );
    }

    return <ErrorMessage />;
  }, [loading, requestVerification, user]);

  return (
    <Box>
      <Heading size="sm">Verification</Heading>
      <Divider />
      {verificationContent}
    </Box>
  );
};

export default UserSettings;
