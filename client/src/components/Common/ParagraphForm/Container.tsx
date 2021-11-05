import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import {
  IParagraphFormState,
  useParagraphForm,
} from "../../../contexts/ParagraphForm";
import Loading from "../Loading";
import Paragraph from "../Paragraph";
import RichText from "../RichText";

export interface IParagraphFormContainer {
  submitLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: (state: IParagraphFormState) => void;
}

const Container = ({
  onCancel,
  onSubmit,
  submitLoading,
}: IParagraphFormContainer) => {
  const { state, updateSlateParagraph } = useParagraphForm();

  const { slateParagraph, paragraph } = state;

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
            <RichText
              value={slateParagraph}
              onChange={updateSlateParagraph}
              onCancel={onCancel}
              onSubmit={() => {
                if (onSubmit) onSubmit(state);
              }}
              submitLoading={submitLoading}
            />
          </TabPanel>
          <TabPanel>
            <Paragraph paragraph={paragraph} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  else if (slateParagraph)
    return (
      <RichText
        value={slateParagraph}
        onChange={updateSlateParagraph}
        onCancel={onCancel}
      />
    );

  return <Loading />;
};

export default Container;
