import React from "react";
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
  return (
    <VariableSearch
      variableSelected={variableSelect}
      placeholder="search for variable"
      backgroundColor="white"
      _focus={{
        outline: "none",
      }}
    />
  );
};

export default VariableForm;
