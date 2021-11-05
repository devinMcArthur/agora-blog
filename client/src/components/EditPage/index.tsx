import { Box } from "@chakra-ui/layout";
import React from "react";
import { IParagraphFormState } from "../../contexts/ParagraphForm";
// import { useCreateParagraphEditProposalMutation } from "../../generated/graphql";
import convertToParagraphEditProposal from "../../utils/convertToParagraphEditProposal";
import ParagraphForm from "../Common/ParagraphForm";

interface IEditPage {
  pageId: string;
  onCancel?: () => void;
}

const EditPage = ({ pageId, onCancel }: IEditPage) => {
  // const [createProposal] = useCreateParagraphEditProposalMutation()

  const handleSubmit = (state: IParagraphFormState) => {
    // createProposal({
    //   variables: {
    //     data:
    //   }
    // })
    convertToParagraphEditProposal(state);
  };

  return (
    <Box display="flex" flexDir="column">
      <Box display="flex" flexDir="row"></Box>
      <ParagraphForm
        pageId={pageId}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default EditPage;
