import * as React from "react";
// import { RouterProps } from "react-router";

// import PageService from "../../services/pageService";

// import { PagePopulatedFull } from "../../typescript/interfaces/documents/Page";
import PageCard from "../Common/PageCard";
import Container from "../Common/Container";
import Flex from "../Common/Flex";
import Paragraph from "../Common/Paragraph";
import { usePageQuery } from "../../generated/graphql";
import { Spinner } from "@chakra-ui/react";

// type PageProps = {
//   match: any;
// };

// type PageState = {
//   page: PagePopulatedFull | undefined;
// };

// class Page extends React.Component<PageProps & RouterProps, PageState> {
//   state: PageState = {
//     page: undefined,
//   };

//   componentDidMount() {
//     PageService()
//       .getPageBySlug(this.props.match.params.pageSlug)
//       .then((page) => {
//         this.setState((state) => ({
//           ...state,
//           page,
//         }));
//       });
//   }

//   componentDidUpdate(prevProps: PageProps & RouterProps) {
//     if (prevProps.match.params.pageSlug !== this.props.match.params.pageSlug) {
//       PageService()
//         .getPageBySlug(this.props.match.params.pageSlug)
//         .then((page) => {
//           this.setState((state) => ({
//             ...state,
//             page,
//           }));
//         });
//     }
//   }

//   render() {
//     const { page } = this.state;
//     let content = <Loading />;

//     console.log(usePageQuery({}))

//     if (page) {
//       const relatedPageList = page.relatedPages.map((relatedPage) => (
//         <PageCard
//           page={relatedPage}
//           referenceObject={{ type: "page", pageID: page._id }}
//         />
//       ));

//       content = (
//         <Flex flexDirection="column">
//           <h2>{page.title}</h2>
//           <Paragraph paragraph={page.currentParagraph} />
//           <Flex flexDirection="column" marginRight="1.5em">
//             {relatedPageList}
//           </Flex>
//         </Flex>
//       );
//     }

//     return <Container layout="maxi">{content}</Container>;
//   }
// }

const Page = (props: { match: any }) => {
  const { data, loading } = usePageQuery({
    variables: { slug: props.match.params.pageSlug },
  });

  let content = <Spinner />;
  if (data && data.page) {
    const { page } = data;
    console.log(page);
    const relatedPageList = page.relatedPages.map((relatedPage) => (
      <PageCard
        page={relatedPage}
        referenceObject={{ type: "page", pageID: page._id }}
      />
    ));

    content = (
      <Flex flexDirection="column">
        <h2>{page.title}</h2>
        <Paragraph paragraph={page.currentParagraph} />
        <Flex flexDirection="column" marginRight="1.5em">
          {relatedPageList}
        </Flex>
      </Flex>
    );
  }

  return <Container layout="maxi">{content}</Container>;
};

export default Page;
