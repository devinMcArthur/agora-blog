import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { usePreviewPageSearchQuery } from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import PageCard from "../../Common/PageCard";

interface IPagesSearch {
  searchString: string;
}

const PagesSearch = ({ searchString }: IPagesSearch) => {
  const { data, loading } = usePreviewPageSearchQuery({
    variables: {
      searchString,
    },
  });

  const content = React.useMemo(() => {
    if (data && !loading) {
      return (
        <Box>
          {data.searchPages.map((page) => (
            <PageCard page={page} />
          ))}
        </Box>
      );
    } else if (!loading && !data?.searchPages) {
      return <Heading>No Results</Heading>;
    } else return <Loading />;
  }, [data, loading]);

  return <Box>{content}</Box>;
};

export default PagesSearch;
