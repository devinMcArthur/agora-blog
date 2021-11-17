import React from "react";

import { Link as RouterLink } from "react-router-dom";
import { Box, Divider, Link } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";

import { VariableSearchSnippetFragment } from "../../generated/graphql";
import Card from "./Card";

interface IVariableCard {
  variable: VariableSearchSnippetFragment;
}

const VariableCard = ({ variable }: IVariableCard) => {
  return (
    <Card key={variable._id}>
      <Link as={RouterLink} to={`/v/${variable._id}`} fontWeight="bold">
        {variable.title}
      </Link>
      <Divider />
      <Box pt={2}>
        <Tag>
          <b>Value: {variable.finalValue}</b>
        </Tag>
      </Box>
    </Card>
  );
};

export default VariableCard;
