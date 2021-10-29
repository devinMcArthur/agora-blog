import * as React from "react";

import PageCard from "../Common/PageCard";
import Paragraph from "../Common/Paragraph";
import { usePageQuery } from "../../generated/graphql";
import { Container, Divider, Heading, Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import Loading from "../Common/Loading";
import { useParams } from "react-router";
import { PageMatchParams } from "../../models/pageParams";
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/tabs";
import ParagraphEditProposal from "../Common/ParagraphEditProposal";
import EditProposalPreview from "../Common/EditProposalPreview";
import { useDrawer } from "../../contexts/Drawer";

const Page = () => {
  const { pageSlug } = useParams<PageMatchParams>();

  const { data, loading } = usePageQuery({
    variables: { slug: pageSlug },
  });

  const {
    paragraphEditProposalPreviewId,
    setCurrentPage,
    clearState,
    setPreviewedParagraphEditProposal,
  } = useDrawer();

  React.useEffect(() => {
    if (data?.page) setCurrentPage(data.page._id);

    return () => {
      clearState();
    };
  }, [clearState, data?.page, setCurrentPage]);

  const content = React.useMemo(() => {
    if (data?.page && !loading) {
      const { page } = data;
      const relatedPageList = page.relatedPages.map((relatedPage) => (
        <PageCard
          page={relatedPage}
          referenceObject={{ type: "page", pageID: page._id }}
        />
      ));

      const editProposals = page.currentParagraph.editProposals.map(
        (editProposal) => (
          <ParagraphEditProposal
            editProposalSelected={
              editProposal._id === paragraphEditProposalPreviewId
            }
            editProposalPreviewSelection={(proposal) =>
              setPreviewedParagraphEditProposal(proposal)
            }
            paragraphEditProposalId={editProposal._id}
          />
        )
      );

      return (
        <Flex flexDirection="column">
          <Heading size="lg">{page.title}</Heading>
          <Divider mb={2} />
          <Box my={3}>
            {paragraphEditProposalPreviewId ? (
              <EditProposalPreview
                editProposalId={paragraphEditProposalPreviewId}
              />
            ) : (
              <Paragraph paragraph={page.currentParagraph} />
            )}
          </Box>

          <Tabs variant="line">
            <TabList>
              <Tab>Related</Tab>
              <Tab>Edit Proposals</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex flexDirection="column" mr="1.5em" pt={4} width="100%">
                  {relatedPageList}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex flexDir="column" mr="1.5em" pt={4}>
                  {editProposals}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      );
    } else {
      return <Loading />;
    }
  }, [
    data,
    loading,
    paragraphEditProposalPreviewId,
    setPreviewedParagraphEditProposal,
  ]);

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Page;
