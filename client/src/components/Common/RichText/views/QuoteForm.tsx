import { Box } from "@chakra-ui/layout";
import React from "react";
import QuoteSearch from "../../QuoteSearch";

interface IQuoteForm {
  quoteSubmit: (statementId: string) => void;
}

const QuoteForm: React.FC<IQuoteForm> = ({ quoteSubmit }) => {
  return (
    <Box backgroundColor="white" borderRadius={2} padding={2} w="inherit">
      <QuoteSearch statementSelect={(id) => quoteSubmit(id)} />
    </Box>
  );
};

export default QuoteForm;
