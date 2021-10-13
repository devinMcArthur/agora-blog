import React from "react";
import { InputProps } from "@chakra-ui/input";
import {
  useSearchVariablesLazyQuery,
  VariableSearchSnippetFragment,
} from "../../generated/graphql";
import TextDropdown from "./TextDropdown";
import { FiSearch } from "react-icons/fi";

interface IVariableSearch extends InputProps {
  handleSubmit?: (value: string) => void;
  variableSelected: (variable: {
    id: string;
    title: string;
    finalValue: number;
  }) => void;
  dropdownId?: string;
}

const VariableSearch: React.FC<IVariableSearch> = ({
  variableSelected,
  dropdownId,
  handleSubmit,
  ...props
}) => {
  const [foundVariables, setFoundVariables] = React.useState<
    VariableSearchSnippetFragment[]
  >([]);
  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );
  const [searchTimeout, setSearchTimeout] = React.useState<number>();

  const [search, { loading, data }] = useSearchVariablesLazyQuery();

  /**
   * ----- Functions -----
   */

  const handleChange = (value: string) => {
    setSearchString(value);
    clearTimeout(searchTimeout);
    if (value !== "") {
      setSearchTimeout(
        setTimeout(() => {
          search({ variables: { searchString: value } });
        }, 500)
      );
    } else setFoundVariables([]);
  };

  /**
   * ----- Variables -----
   */

  const variableOptions = React.useMemo(() => {
    return foundVariables.map((variable) => {
      return {
        label: variable.title,
        value: variable._id,
        extraData: {
          finalValue: variable.finalValue,
        },
      };
    });
  }, [foundVariables]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundVariables(data.searchVariables);
    }
  }, [loading, data]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleSubmit) handleSubmit(searchString);
      }}
    >
      <TextDropdown
        onChange={(e) => handleChange(e.target.value)}
        value={searchString}
        inputRightElement={<FiSearch />}
        options={variableOptions}
        onOptionSelection={(value, extraData) => {
          setSearchString(value.label);
          variableSelected({
            id: value.value,
            title: value.label,
            finalValue: extraData.finalValue,
          });
          setFoundVariables([]);
        }}
        containerId={dropdownId}
        {...props}
      />
    </form>
  );
};

export default VariableSearch;
