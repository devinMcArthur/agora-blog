import React from "react";
import styled from "styled-components";
import { DisplayStyleSnippetFragment } from "../../../generated/graphql";
import FinalValue from "../../Variable/views/FinalValue";

type Props = {
  style: DisplayStyleSnippetFragment;
  key: string | number;
};

const VariableTag = styled.span`
  ${(props) => `background-color: ${props.theme.colors.greyLighter}`}
`;

const SourceLink = styled.a`
  text-decoration-line: none;
  color: black;

  &:visited {
    color: black;
  }
`;

const Variable = (props: Props) => {
  const { finalValue } = props.style.value.variable!;

  return (
    <SourceLink
      title={props.style.value.variable!.title}
      href={`/v/${props.style.value.variable!._id}`}
    >
      <VariableTag key={props.key}>
        <i>
          <FinalValue finalValue={finalValue} />
        </i>
      </VariableTag>
    </SourceLink>
  );
};

export default Variable;
