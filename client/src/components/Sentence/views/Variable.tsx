import React from "react";
import styled from "styled-components";
import { PopulatedVariableStyleType } from "../../../typescript/interfaces/documents/Sentence";
import FinalValue from "../../Variable/views/FinalValue";

type Props = {
  style: PopulatedVariableStyleType;
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
  const { finalValue } = props.style.value.variable.versions[
    props.style.value.variable.versions.length - 1
  ];

  return (
    <SourceLink
      title={props.style.value.variable.title}
      href={`/v/${props.style.value.variable._id}`}
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
