import * as React from "react";

import * as qs from "qs";
import PageCard from "../Common/PageCard";
import { usePageQuery } from "../../generated/graphql";
import {
  Container,
  Divider,
  Heading,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import Loading from "../Common/Loading";
import { useHistory, useLocation, useParams } from "react-router";
import { PageMatchParams } from "../../models/pageParams";
import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/tabs";
import ParagraphEditProposal from "../Common/ParagraphEditProposal";
import EditProposalPreview from "../Common/EditProposalPreview";
import { useDrawer } from "../../contexts/Drawer";
import { FiEdit } from "react-icons/fi";
import EditParagraph from "../EditParagraph";
import { useAuth } from "../../contexts/Auth";
import Paragraphs from "./views/Paragraphs";
import paragraphs from "../../mock/data/paragraphs";

const Page = () => {
  const { pageSlug } = useParams<PageMatchParams>();

  const history = useHistory();
  const location = useLocation();

  const { requiresVerification } = useAuth();

  const { data, loading } = usePageQuery({
    variables: { slug: pageSlug },
  });

  const [editting, setEditting] = React.useState(false);

  const {
    paragraphEditProposalPreviewId,
    setCurrentPage,
    clearState,
    setPreviewedParagraphEditProposal,
  } = useDrawer();

  /**
   * ----- Variables -----
   */

  const proposalParams = React.useMemo(() => {
    if (location.search) {
      const proposalParam = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      }).proposal;
      if (proposalParam) return proposalParam.toString();
      else return undefined;
    }
  }, [location]);

  React.useEffect(() => {
    if (data?.page) {
      setCurrentPage(data.page._id);
    }

    return () => {
      clearState();
    };
  }, [clearState, data?.page, setCurrentPage]);

  // If proposal param is set, set preview
  React.useEffect(() => {
    if (proposalParams && !paragraphEditProposalPreviewId) {
      setPreviewedParagraphEditProposal(proposalParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // If proposal preview is removed, remove proposal param
  React.useEffect(() => {
    if (!paragraphEditProposalPreviewId && proposalParams) {
      history.push(`/p/${pageSlug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paragraphEditProposalPreviewId]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.page && !loading) {
      const { page } = data;

      console.log(page);

      const relatedPageList = page.relatedPages.map((relatedPage, index) => (
        <PageCard
          key={index}
          page={relatedPage}
          referenceObject={{ type: "page", pageID: page._id }}
        />
      ));

      const editProposals = page.currentParagraph.editProposals.map(
        (editProposal, index) => (
          <ParagraphEditProposal
            key={index}
            editProposalSelected={
              editProposal._id === paragraphEditProposalPreviewId
            }
            editProposalPreviewSelection={(proposal) =>
              setPreviewedParagraphEditProposal(proposal)
            }
            paragraphEditProposalId={editProposal._id}
            allowApproval
          />
        )
      );

      let paragraphContent = (
        <Paragraphs
          paragraphIds={page.paragraphs.map((paragraph) => paragraph._id)}
          mostRecentParagraph={page.currentParagraph}
        />
      );
      if (paragraphEditProposalPreviewId)
        paragraphContent = (
          <EditProposalPreview
            editProposalId={paragraphEditProposalPreviewId}
          />
        );
      if (editting)
        paragraphContent = (
          <EditParagraph
            pageId={page._id}
            paragraphId={page.currentParagraph._id}
            onCancel={() => setEditting(false)}
          />
        );

      return (
        <Flex flexDirection="column">
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            my={2}
          >
            <Heading size="lg">{page.title}</Heading>
            <IconButton
              aria-label="edit"
              icon={<FiEdit />}
              onClick={() => requiresVerification(() => setEditting(true))}
            />
          </Box>
          <Divider mb={2} />
          <Box my={3}>{paragraphContent}</Box>

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
    editting,
    setPreviewedParagraphEditProposal,
    requiresVerification,
  ]);

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Page;
