import React from "react";
import { Center, Container, Heading } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useHistory } from "react-router";

import PagesSearch from "./views/Pages";
import QuestionsSearch from "./views/Questions";
import VariablesSearch from "./views/Variables";

const Search = () => {
  const history = useHistory();

  const searchString = React.useMemo(() => {
    const queryString = new URLSearchParams(history.location.search);

    return queryString.get("search_string");
  }, [history.location.search]);

  return (
    <Container maxW="80%" p={4}>
      {searchString ? (
        <Tabs>
          <TabList>
            <Tab>Pages</Tab>
            <Tab>Questions</Tab>
            <Tab>Variables</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PagesSearch searchString={searchString} />
            </TabPanel>
            <TabPanel>
              <QuestionsSearch searchString={searchString} />
            </TabPanel>
            <TabPanel>
              <VariablesSearch searchString={searchString} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Center pt="10%">
          <Heading>No Results</Heading>
        </Center>
      )}
    </Container>
  );
};

export default Search;
