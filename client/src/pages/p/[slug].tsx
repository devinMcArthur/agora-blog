import React from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/Auth";
import Head from "next/head";

import { PageSsrComp, ssrSsr } from "../../generated/page";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { FiEdit } from "react-icons/fi";
import ClientOnly from "../../components/Common/ClientOnly";
import PageSlugClientContent from "../../components/p/slug/ClientContent";
import useMounted from "../../hooks/useMounted";

const Page: PageSsrComp = ({ data: propsData }) => {
  const { title, slug, description } = propsData!.page!;
  /**
   * ----- Hook Initialization -----
   */

  const router = useRouter();
  const { hasMounted } = useMounted();

  const { requiresVerification } = useAuth();

  const [editting, setEditting] = React.useState(false);
  const [previewParagraphEditProposalId, setPreviewParagraphEditProposalId] =
    React.useState<string>();

  /**
   * ----- Variables -----
   */

  const proposalParams = React.useMemo(() => {
    if (router.query?.proposal) return router.query.proposal.toString();
    else return undefined;
  }, [router.query]);

  /**
   * ----- Use-effects and other logic -----
   */

  // If proposal param is set, set preview
  React.useEffect(() => {
    if (proposalParams && !previewParagraphEditProposalId && hasMounted) {
      setPreviewParagraphEditProposalId(proposalParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalParams, hasMounted]);

  // If proposal preview is removed, remove proposal param
  React.useEffect(() => {
    if (!previewParagraphEditProposalId && proposalParams && hasMounted) {
      router.push(`/p/${slug}`, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewParagraphEditProposalId, proposalParams]);

  /**
   * ----- Rendering -----
   */

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Flex flexDirection="column">
        <Box display="flex" flexDir="row" justifyContent="space-between" my={2}>
          <Heading size="lg">{title}</Heading>
          <IconButton
            aria-label="edit"
            backgroundColor="transparent"
            _hover={{
              backgroundColor: "gray.100",
            }}
            icon={<FiEdit />}
            onClick={() => requiresVerification(() => setEditting(true))}
          />
        </Box>

        <ClientOnly>
          <PageSlugClientContent
            slug={slug}
            previewParagraphEditProposalId={previewParagraphEditProposalId}
            setPreviewParagraphEditProposalId={(value) => {
              setPreviewParagraphEditProposalId(value);
            }}
            editting={editting}
            setEditting={setEditting}
          />
        </ClientOnly>
      </Flex>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrSsr.getServerPage(
    { variables: { slug: encodeURIComponent(params?.slug as string) } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.page) notFound = true;

  return { ...res, notFound };
};

export default Page;
