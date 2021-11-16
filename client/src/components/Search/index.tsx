import { Box, Center, Heading } from "@chakra-ui/layout";
import React from "react";
import { useHistory, useParams } from "react-router";
import PagesSearch from "./views/pages";

const Search = () => {
  const history = useHistory();
  const params = useParams();

  const searchString = React.useMemo(() => {
    const queryString = new URLSearchParams(history.location.search);

    return queryString.get("search_string");
  }, [history.location.search]);

  console.log("history", history);
  console.log("params", params);

  console.log("searchString", searchString);

  return (
    <Box w="100%" p={2}>
      {searchString ? (
        <PagesSearch searchString={searchString} />
      ) : (
        <Center pt="10%">
          <Heading>No Results</Heading>
        </Center>
      )}
    </Box>
  );
};

export default Search;
