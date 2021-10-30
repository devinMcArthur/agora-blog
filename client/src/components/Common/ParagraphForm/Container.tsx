import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";
import Loading from "../Loading";
import Paragraph from "../Paragraph";
import ParagraphRichText from "../ParagraphRichText";

const Container = () => {
  const {
    state: { slateParagraph, paragraph },
  } = useParagraphForm();

  if (slateParagraph === null) return <div>Unable to find page</div>;
  else if (slateParagraph && paragraph)
    return (
      <Tabs>
        <TabList>
          <Tab>Edit</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ParagraphRichText />
          </TabPanel>
          <TabPanel>
            <Paragraph paragraph={paragraph} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  else if (slateParagraph) return <ParagraphRichText />;

  return <Loading />;
};

export default Container;
