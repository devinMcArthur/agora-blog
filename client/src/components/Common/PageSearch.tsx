import { InputProps } from "@chakra-ui/input";
import { Box, Stack } from "@chakra-ui/layout";
import React from "react";
import { FiSearch } from "react-icons/fi";
import {
  LinkFormPageSnippetFragment,
  useLinkFormPageSearchLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "./TextDropdown";

interface IPageSearch extends InputProps {
  pageSelected: (selected: { value: string; label: string }) => void;
  handleSubmit?: (string: string) => void;
  dropdownId?: string;
}

const PageSearch: React.FC<IPageSearch> = ({
  handleSubmit,
  pageSelected,
  dropdownId,
  ...props
}) => {
  const [foundPages, setFoundPages] = React.useState<
    LinkFormPageSnippetFragment[]
  >([]);
  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );
  const [searchTimeout, setSearchTimeout] = React.useState<number>();

  const [search, { loading, data }] = useLinkFormPageSearchLazyQuery();

  /**
   * ----- Functions
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
    } else setFoundPages([]);
  };

  /**
   * ----- Variables -----
   */

  const pageOptions = React.useMemo(() => {
    return foundPages.map((page) => {
      return {
        label: page.title,
        value: page._id,
      };
    });
  }, [foundPages]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      console.log(data.searchPages);
      setFoundPages(data.searchPages);
    }
  }, [loading, data]);

  let dropdownBox;
  if (foundPages && foundPages.length > 0) {
    dropdownBox = (
      <datalist>
        <Stack>
          {foundPages.map((page) => (
            <Box>{page.title}</Box>
          ))}
        </Stack>
      </datalist>
    );
  }

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
        options={pageOptions}
        onOptionSelection={(value) => {
          setSearchString(value.label);
          pageSelected(value);
          setFoundPages([]);
        }}
        containerId={dropdownId}
        {...props}
      />
      {dropdownBox}
    </form>
  );
};

export default PageSearch;
