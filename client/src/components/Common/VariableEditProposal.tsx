import React from "react";

import { Box, Heading, Text } from "@chakra-ui/layout";
import {
  useApproveVariableEditProposalMutation,
  VariableEditProposalSnippetFragment,
} from "../../generated/graphql";
import Card from "./Card";
import UserLink from "./UserLink";
import FinalValue from "../Variable/views/FinalValue";
import TextLink from "./TextLink";
import { useAuth } from "../../contexts/Auth";
import { Button } from "@chakra-ui/button";

interface IVariableEditProposal {
  variableEditProposal: VariableEditProposalSnippetFragment;
}

const VariableEditProposal = ({
  variableEditProposal,
}: IVariableEditProposal) => {
  const {
    state: { user },
  } = useAuth();

  const [approveProposal, { loading }] =
    useApproveVariableEditProposalMutation();

  const approve = () => {
    approveProposal({
      variables: {
        id: variableEditProposal._id,
      },
    }).catch((err) => console.error(err));
  };

  return (
    <Card>
      <Box>
        <Box
          display="flex"
          flexDir="row"
          justifyContent="center"
          w="100%"
          borderRadius={3}
          backgroundColor="gray.200"
          p={3}
        >
          <Heading size="lg" m={2}>
            <FinalValue finalValue={variableEditProposal.finalValue} />
          </Heading>
        </Box>
        <Text>
          <Text fontWeight="bold" as="span">
            Description:{" "}
          </Text>
          {variableEditProposal.description}
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Source:{" "}
          </Text>
          {variableEditProposal.value.sourceUrl ? (
            <TextLink isExternal link={variableEditProposal.value.sourceUrl}>
              {variableEditProposal.value.sourceUrl}
            </TextLink>
          ) : (
            "No Source"
          )}
        </Text>
        <Text>
          <Text as="span" fontWeight="bold">
            Author:{" "}
          </Text>
          <UserLink user={variableEditProposal.author} />
        </Text>
        {user && user.verified && (
          <Button isLoading={loading} my={2} onClick={approve}>
            Approve
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default VariableEditProposal;
