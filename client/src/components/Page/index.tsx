import * as React from "react";

import PageCard from "../Common/PageCard";
import Paragraph from "../Common/Paragraph";
import { usePageQuery } from "../../generated/graphql";
import { Container, Divider, Heading, Flex } from "@chakra-ui/react";
import Loading from "../Common/Loading";

const Page = (props: { match: any }) => {
  const { data, loading } = usePageQuery({
    variables: { slug: props.match.params.pageSlug },
  });

  let content = <Loading />;
  if (data?.page && !loading) {
    const { page } = data;
    const relatedPageList = page.relatedPages.map((relatedPage) => (
      <PageCard
        page={relatedPage}
        referenceObject={{ type: "page", pageID: page._id }}
      />
    ));

    content = (
      <Flex flexDirection="column">
        <Heading size="lg">{page.title}</Heading>
        <Divider mb={2} />
        <Paragraph paragraph={page.currentParagraph} />
        <Divider pb={2} />
        <Flex flexDirection="column" mr="1.5em" pt={4}>
          {relatedPageList}
        </Flex>
      </Flex>
    );
  }

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Page;
