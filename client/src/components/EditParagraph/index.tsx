import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";
import { IParagraphFormState } from "../../contexts/ParagraphForm";
import { useCreateParagraphEditProposalMutation } from "../../generated/graphql";
import convertToParagraphEditProposal from "../../utils/convertToParagraphEditProposal";
import createLink from "../../utils/createLink";
import ErrorMessage from "../Common/ErrorMessage";
import ParagraphForm from "../Common/ParagraphForm";
import TextArea from "../Common/TextArea";

interface IEditParagraph {
  pageId: string;
  paragraphId: string;
  onCancel?: () => void;
}

const EditParagraph = ({ pageId, paragraphId, onCancel }: IEditParagraph) => {
  const [description, setDescription] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState<string>();
  const [generalError, setGeneralError] = React.useState<string>();

  const router = useRouter();
  const [createProposal, { loading }] =
    useCreateParagraphEditProposalMutation();

  const handleSubmit = (state: IParagraphFormState) => {
    if (!description)
      setDescriptionError("must provide a description for your edit");
    else if (!loading)
      createProposal({
        variables: {
          data: {
            statementItems: convertToParagraphEditProposal(state),
            paragraph: paragraphId,
            description,
          },
        },
      })
        .then((res) => {
          if (res.data?.createParagraphEditProposal) {
            if (onCancel) onCancel();
            router.push(
              createLink.pageLink(
                res.data?.createParagraphEditProposal.paragraph.page.slug,
                {
                  type: "edit-proposal",
                  proposalId: res.data.createParagraphEditProposal._id,
                }
              )
            );
          }
        })
        .catch((err) => {
          setGeneralError(err.message);
          // eslint-disable-next-line no-console
          console.error(err);
        });
  };

  React.useEffect(() => {
    if (description) setDescriptionError(undefined);
  }, [description]);

  return (
    <Box display="flex" flexDir="column">
      {generalError && <ErrorMessage description={generalError} />}
      <Box display="flex" flexDir="row">
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          errorMessage={descriptionError}
          label="Description for Edit Proposal"
        />
      </Box>
      <ParagraphForm
        pageId={pageId}
        onCancel={onCancel}
        onSubmit={handleSubmit}
        submitLoading={loading}
      />
    </Box>
  );
};

export default EditParagraph;
