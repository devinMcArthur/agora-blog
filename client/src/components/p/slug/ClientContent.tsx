import React from "react";

import { Box } from "@chakra-ui/react";
import { Divider, Flex } from "@chakra-ui/layout";
import { usePageQuery } from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import PageCard from "../../Common/PageCard";
import ParagraphEditProposal from "../../Common/ParagraphEditProposal";
import Paragraphs from "../../Common/Paragraphs";
import EditParagraph from "../../EditParagraph";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useDrawer } from "../../../contexts/Drawer";

interface IPageSlugClientContent {
  slug: string;
  previewParagraphEditProposalId?: string;
  setPreviewParagraphEditProposalId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  editting: boolean;
  setEditting: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageSlugClientContent = ({
  slug,
  previewParagraphEditProposalId,
  setPreviewParagraphEditProposalId,
  editting,
  setEditting,
}: IPageSlugClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = usePageQuery({
    variables: { slug },
  });

  const { setCurrentPage, clearState } = useDrawer();

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (data?.page) {
      setCurrentPage(data.page._id);
    }

    return () => {
      clearState();
    };
  }, [clearState, data?.page, setCurrentPage]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    const components: {
      relatedPageList: React.ReactNode;
      editProposals: React.ReactNode;
      paragraphContent: React.ReactNode;
    } = {
      relatedPageList: <Loading />,
      editProposals: <Loading />,
      paragraphContent: <Loading />,
    };

    if (data?.page && !loading) {
      const { page } = data;

      components.relatedPageList = page.relatedPages.map(
        (relatedPage, index) => (
          <PageCard
            key={index}
            page={relatedPage}
            referenceObject={{ type: "page", pageID: page._id }}
          />
        )
      );

      components.editProposals = page.currentParagraph.editProposals.map(
        (editProposal, index) => (
          <ParagraphEditProposal
            key={index}
            editProposalSelected={
              editProposal._id === previewParagraphEditProposalId
            }
            editProposalPreviewSelection={(proposal) => {
              setPreviewParagraphEditProposalId(proposal);
            }}
            paragraphEditProposalId={editProposal._id}
            allowApproval
          />
        )
      );

      components.paragraphContent = (
        <Paragraphs
          paragraphIds={page.paragraphs.map((paragraph) => paragraph._id)}
          mostRecentParagraph={page.currentParagraph}
          previewEditProposal={previewParagraphEditProposalId}
          onClearPreviewedProposal={() =>
            setPreviewParagraphEditProposalId(undefined)
          }
        />
      );
      if (editting)
        components.paragraphContent = (
          <EditParagraph
            pageId={page._id}
            paragraphId={page.currentParagraph._id}
            onCancel={() => setEditting(false)}
          />
        );
    }

    return components;
  }, [
    data,
    loading,
    previewParagraphEditProposalId,
    setPreviewParagraphEditProposalId,
    editting,
    setEditting,
  ]);

  return (
    <Box>
      <Divider mb={2} />
      <Box my={3}>{content.paragraphContent}</Box>

      <Tabs variant="line">
        <TabList>
          <Tab>Related</Tab>
          <Tab>Edit Proposals</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDirection="column" mr="1.5em" pt={4} width="100%">
              {content.relatedPageList}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" mr="1.5em" pt={4}>
              {content.editProposals}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PageSlugClientContent;
