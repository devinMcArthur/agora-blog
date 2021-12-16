import React from "react";
import { Button, IconButton } from "@chakra-ui/button";
import { useClipboard, useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FiFacebook, FiShare2, FiTwitter } from "react-icons/fi";
import { IoLogoReddit } from "react-icons/io";
import TextField from "./TextField";
import { Tooltip } from "@chakra-ui/tooltip";

interface IShare {
  link: string;
  shareText: string;
}

const Share = ({ link, shareText }: IShare) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { hasCopied, onCopy } = useClipboard(link);

  const twitterLink = React.useMemo(() => {
    return `https://twitter.com/intent/tweet?url=${link}&text=${encodeURIComponent(
      shareText
    )}`;
  }, [link, shareText]);

  const facebookLink = React.useMemo(() => {
    return `https://www.facebook.com/sharer/sharer.php?u=${link}`;
  }, [link]);

  const redditLink = React.useMemo(() => {
    return `https://reddit.com/submit?url=${link}&title=${encodeURIComponent(
      shareText
    )}`;
  }, [link, shareText]);

  return (
    <>
      <Tooltip label="Share">
        <IconButton
          icon={<FiShare2 />}
          aria-label="share"
          backgroundColor="transparent"
          _hover={{
            backgroundColor: "gray.100",
          }}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display="flex"
              flexDir="row"
              justifyContent="space-evenly"
              mb={6}
            >
              <IconButton
                isRound
                size="lg"
                variant="outline"
                borderColor="black"
                icon={<FiTwitter />}
                aria-label="twitter"
                onClick={() => window.open(twitterLink)}
              />
              <IconButton
                isRound
                size="lg"
                variant="outline"
                borderColor="black"
                icon={<FiFacebook />}
                aria-label="facebook"
                onClick={() => window.open(facebookLink)}
              />
              <IconButton
                isRound
                size="lg"
                variant="outline"
                borderColor="black"
                icon={<IoLogoReddit />}
                aria-label="reddit"
                onClick={() => window.open(redditLink)}
              />
            </Box>
            <Box display="flex" flexDir="row" my={2}>
              <TextField value={link} isReadOnly />
              <Button mx={2} variant="" onClick={onCopy}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Share;
