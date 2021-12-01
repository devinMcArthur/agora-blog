/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { RiFullscreenLine, RiFullscreenExitLine } from "react-icons/ri";
import React, { useState } from "react";
import { ImageSnippetFragment } from "../../../generated/graphql";
import TextLink from "../../Common/TextLink";

interface IImageDisplay {
  image: ImageSnippetFragment;
  showCaption?: boolean;
  canExpand?: boolean;
}

const ImageDisplay: React.FC<IImageDisplay> = ({
  image,
  canExpand = true,
  showCaption = true,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const src = React.useMemo(() => {
    if (
      image.file.buffer.charAt(0) === "d" &&
      image.file.buffer.charAt(1) === "a" &&
      image.file.buffer.charAt(2) === "t" &&
      image.file.buffer.charAt(3) === "a"
    ) {
      return image.file.buffer;
    }
    return `data:${image.file.mimetype};base64,${image.file.buffer}`;
  }, [image]);

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
        <img
          src={src}
          alt={image.file._id}
          onClick={() => {
            if (canExpand) onOpen();
          }}
          style={{
            cursor: "pointer",
          }}
        />
        {showCaption && (
          <Text
            align="center"
            fontSize="xs"
            noOfLines={canExpand ? 2 : undefined}
          >
            {image.caption}
          </Text>
        )}
        {children}
      </Flex>

      {canExpand && (
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
              <Box cursor="pointer">
                <img
                  src={src}
                  alt={image.file._id}
                  onClick={() => {
                    if (image.sourceUrl) window.open(image.sourceUrl);
                    return null;
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </Box>
              <Divider m={3} />
              <Text align="center">{image.caption}</Text>
              <Divider m={3} />
              {image.sourceUrl ? (
                <TextLink link={image.sourceUrl} isExternal>
                  {image.sourceUrl}
                </TextLink>
              ) : null}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ImageDisplay;
