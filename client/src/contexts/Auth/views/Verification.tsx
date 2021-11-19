import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import dayjs from "dayjs";
import React from "react";
import { useAuth } from "..";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import { useRequestVerificationMutation } from "../../../generated/graphql";

interface IVerificationModal {
  isOpen: boolean;
  close: () => void;
}

const VerificationModal = ({ isOpen, close }: IVerificationModal) => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user },
  } = useAuth();

  const [requestVerification, { loading }] = useRequestVerificationMutation();

  const content = React.useMemo(() => {
    if (!user) {
      close();
      return <ErrorMessage />;
    }

    if (user.verified) {
      return <Text>You account is already verified!</Text>;
    }

    if (!user.verificationRequested) {
      return (
        <Box>
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
  }, [close, loading, requestVerification, user]);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verification Check</ModalHeader>
        <ModalBody>
          <ErrorMessage
            my={1}
            title="You must be verified to do this"
            description={null}
          />
          <Alert status="info" my={1}>
            <AlertIcon />
            <AlertDescription>
              This verification requirement is temporary. We are working on
              creating democratic systems for the creation and editing of
              content.
            </AlertDescription>
          </Alert>

          {content}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VerificationModal;
