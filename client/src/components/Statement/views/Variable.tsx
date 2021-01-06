import { Box } from "@chakra-ui/react";
import React from "react";
import { DisplayStyleSnippetFragment } from "../../../generated/graphql";
import TextLink from "../../Common/TextLink";
import FinalValue from "../../Variable/views/FinalValue";

type Props = {
  style: DisplayStyleSnippetFragment;
  key: string | number;
};

const Variable = (props: Props) => {
  const { finalValue } = props.style.value.variable!;

  return (
    <TextLink
      title={props.style.value.variable!.title}
      link={`/v/${props.style.value.variable!._id}`}
      key={props.key}
    >
      <Box as="span" backgroundColor="grey">
        <i>
          <FinalValue finalValue={finalValue} />
        </i>
      </Box>
    </TextLink>
  );
};

export default Variable;
