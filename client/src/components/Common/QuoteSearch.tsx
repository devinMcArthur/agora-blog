import { Button } from "@chakra-ui/button";
import { InputProps } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { PageSnippetFragment, usePageLazyQuery } from "../../generated/graphql";
import Statement from "../Statement";
import PageSearch from "./PageSearch";

interface IQuoteSearch extends InputProps {
  statementSelect: (statementId: string) => void;
}

const QuoteSearch: React.FC<IQuoteSearch> = ({ statementSelect, ...props }) => {
  const [pageId, setPageId] = React.useState<string>();
  const [fetchedPage, setFetchedPage] = React.useState<PageSnippetFragment>();

  const [getPage, { data, loading }] = usePageLazyQuery();

  /**
   * ----- Variables ------
   */

  const statementOptions = React.useMemo(() => {
    return fetchedPage?.currentParagraph.statements.map((statement) => (
      <Box
        border="1px solid lightgray"
        padding={1}
        margin={1}
        cursor="pointer"
        _hover={{ boxShadow: "0 0 3px gray" }}
        onClick={() => {
          setFetchedPage(undefined);
          statementSelect(statement._id);
        }}
      >
        <Statement statement={statement} />
      </Box>
    ));
  }, [fetchedPage, statementSelect]);

  /**
   * ----- Use-effects and other logic -----
   */

  // Fetch page
  React.useEffect(() => {
    getPage({ variables: { id: pageId } });
  }, [pageId, getPage]);

  React.useEffect(() => {
    if (!loading && data) {
      setFetchedPage(data.page || undefined);
    }
  }, [loading, data]);

  return (
    <Box>
      <PageSearch pageSelected={(page) => setPageId(page.id)} {...props} />
      {fetchedPage && (
        <Box margin={1} padding={1}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="link" onClick={() => setFetchedPage(undefined)}>
              clear
            </Button>
          </Box>
          {statementOptions}
        </Box>
      )}
    </Box>
  );
};

export default QuoteSearch;
