import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { ModalHeader } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";
import NewVariable from "../../../NewVariable";
import VariableSearch from "../../VariableSearch";

interface IVariableForm {
  variableSelect: (variable: {
    id: string;
    title: string;
    finalValue: number;
  }) => void;
  defaultValue?: string;
}

const VariableForm: React.FC<IVariableForm> = ({ variableSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display="flex" flexDir="row">
      <VariableSearch
        variableSelected={variableSelect}
        placeholder="search for variable"
        backgroundColor="white"
        _focus={{
          outline: "none",
        }}
      />
      <Button mx={2} leftIcon={<FiPlus />} onClick={onOpen}>
        New Variable
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Variable</ModalHeader>
          <ModalBody>
            <NewVariable
              onSuccess={(variable) => {
                onClose();
                variableSelect({
                  id: variable._id,
                  title: variable.title,
                  finalValue:
                    variable.versions[variable.versions.length - 1].finalValue,
                });
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default VariableForm;
