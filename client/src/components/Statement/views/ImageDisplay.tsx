import {
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import React, { useState } from "react";
import { ImageSnippetFragment } from "../../../generated/graphql";
import TextLink from "../../Common/TextLink";

type Props = {
  image: ImageSnippetFragment;
};

const ImageDisplay = (props: Props) => {
  const { image } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const src = `data:${image.contentType};base64,${image.buffer}`;

  const [modalSize, setModalSize] = useState<"xl" | "full">("xl");
  const toggleFullScreen = () => {
    if (modalSize === "xl") {
      setModalSize("full");
    } else if (modalSize === "full") {
      setModalSize("xl");
    }
  };

  let fullScreenIconJSX;
  if (modalSize === "xl") {
    fullScreenIconJSX = <Icon as={RiFullscreenLine} w="1em" h="1em" />;
  } else {
    fullScreenIconJSX = <Icon as={RiFullscreenExitLine} w="1em" h="1em" />;
  }

  return (
    <>
      <Flex flexDir="column" align="center" backgroundColor="gray.200" p={2}>
        <Image
          src={src}
          alt={image.name}
          onClick={onOpen}
          _hover={{ cursor: "pointer" }}
        />
        <Text align="center" fontSize="xs" noOfLines={2}>
          {image.caption}
        </Text>
      </Flex>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={modalSize}
        autoFocus={false}
      >
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            position="absolute"
            top="0.5rem"
            right="2.75rem"
            w="32px"
            h="32px"
            justifyContent="center"
            alignItems="center"
            onClick={() => toggleFullScreen()}
            _hover={{ cursor: "pointer" }}
          >
            {fullScreenIconJSX}
          </Box>
          <ModalCloseButton />
          <ModalBody padding={3} mt={8}>
            <Image
              src={src}
              alt={image.name}
              onClick={() => {
                if (image.sourceURL) window.open(image.sourceURL);
                return null;
              }}
              _hover={{ cursor: "pointer" }}
            />
            <Divider m={3} />
            <Text align="center">{image.caption}</Text>
            <Divider m={3} />
            {image.sourceURL ? (
              <TextLink link={image.sourceURL} isExternal>
                {image.sourceURL}
              </TextLink>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageDisplay;
