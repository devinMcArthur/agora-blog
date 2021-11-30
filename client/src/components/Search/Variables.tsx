import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { useSearchVariablesQuery } from "../../generated/graphql";
import Loading from "../Common/Loading";
import VariableCard from "../Common/VariableCard";

interface IVariablesSearch {
  searchString: string;
}

const VariablesSearch = ({ searchString }: IVariablesSearch) => {
  const { data, loading } = useSearchVariablesQuery({
    variables: { searchString },
  });

  const content = React.useMemo(() => {
    if (data?.searchVariables && data.searchVariables.length > 0 && !loading) {
      return (
        <Box>
          {data.searchVariables.map((variable) => (
            <VariableCard variable={variable} />
          ))}
        </Box>
      );
    } else if (!loading) {
      return <Heading>No Results</Heading>;
    } else return <Loading />;
  }, [data, loading]);

  return <Box>{content}</Box>;
};

export default VariablesSearch;
