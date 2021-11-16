import Icon from "@chakra-ui/icon";
import { InputProps } from "@chakra-ui/input";
import { StackProps } from "@chakra-ui/layout";
import React from "react";
import { FiSearch } from "react-icons/fi";
import {
  LinkFormPageSnippetFragment,
  useLinkFormPageSearchLazyQuery,
} from "../../generated/graphql";
import TextDropdown, { IOptions } from "./TextDropdown";

interface IPageSearch extends Omit<InputProps, "onChange"> {
  pageSelected: (page: { id: string; title: string; slug: string }) => void;
  onChange?: (value: string) => void;
  handleSubmit?: (string: string) => void;
  dropdownId?: string;
  dropdownProps?: StackProps;
  errorMessage?: string;
}

const PageSearch: React.FC<IPageSearch> = ({
  handleSubmit,
  pageSelected,
  onChange,
  dropdownId,
  dropdownProps,
  ...props
}) => {
  const [foundPages, setFoundPages] = React.useState<
    LinkFormPageSnippetFragment[]
  >([]);
  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || props.value?.toString() || ""
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
    if (onChange) onChange(value);
  };

  /**
   * ----- Variables -----
   */

  const pageOptions: IOptions<{ slug: string }>[] = React.useMemo(() => {
    return foundPages.map((page) => {
      return {
        label: page.title,
        value: page._id,
        extraData: { slug: page.slug },
      };
    });
  }, [foundPages]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundPages(data.searchPages);
    }
  }, [loading, data]);

  return (
    <TextDropdown
      onChange={(e) => handleChange(e.target.value)}
      value={searchString}
      inputRightElementProps={{ pt: "0.4rem" }}
      inputRightElement={<Icon as={FiSearch} w={4} height={4} mt={2} />}
      options={pageOptions}
      onOptionSelection={(value, extraData) => {
        setSearchString(value.label);
        pageSelected({
          id: value.value,
          title: value.label,
          slug: extraData!.slug,
        });
        setFoundPages([]);
      }}
      handleSubmit={() => {
        if (handleSubmit) handleSubmit(searchString);
      }}
      containerId={dropdownId}
      dropdownProps={dropdownProps}
      selectOptionsWithEnter
      {...props}
    />
  );
};

export default PageSearch;
