import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { Center, Container, Heading } from "@chakra-ui/layout";
import ClientOnly from "../components/Common/ClientOnly";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import PagesSearch from "../components/Search/Pages";
import QuestionsSearch from "../components/Search/Questions";
import VariablesSearch from "../components/Search/Variables";

const Search = () => {
  const router = useRouter();

  /**
   * ----- Variables -----
   */

  const searchString = React.useMemo(() => {
    return router.query.search_string as string;
  }, [router.query]);

  /**
   * ----- Rendering -----
   */

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>Search - {searchString}</title>
      </Head>
      {searchString ? (
        <ClientOnly>
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
        </ClientOnly>
      ) : (
        <Center pt="10%">
          <Heading>No Results</Heading>
        </Center>
      )}
    </Container>
  );
};

export default Search;
