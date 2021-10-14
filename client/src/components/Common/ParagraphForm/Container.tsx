import { Heading } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";
import Loading from "../Loading";
import Paragraph from "../Paragraph";
import RichText from "../RichText";

interface IContainer {
  pageId: string;
}

const Container = ({ pageId }: IContainer) => {
  const {
    state: { slateParagraph, paragraph },
    updateSlateParagraph,
  } = useParagraphForm();

  if (slateParagraph === null)
    return <Heading>Unable to find this page</Heading>;
  if (slateParagraph && paragraph)
    return (
      <Tabs>
        <TabList>
          <Tab>Edit</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RichText
              value={slateParagraph}
              onChange={updateSlateParagraph}
              pageId={pageId}
            />
          </TabPanel>
          <TabPanel>
            <Paragraph paragraph={paragraph} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );

  return <Loading />;
};

export default Container;
