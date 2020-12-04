import * as React from "react";

import Container from "../Common/Container";
import PageCard from "../Common/PageCard";

import { withProvider } from "../Providers";
import PageListService from "../../services/pageListService";

import { PagePopulated } from "../../typescript/interfaces/documents/Page";
import Flex from "../Common/Flex";

type HomePageProps = {};

type HomePageState = {
  pages: PagePopulated[];
};

class HomePage extends React.Component<HomePageProps, HomePageState> {
  state: HomePageState = {
    pages: [],
  };

  componentDidMount() {
    PageListService()
      .getHomePages()
      .then((pages) => {
        this.setState((state) => ({
          ...state,
          pages,
        }));
      });
  }

  render() {
    console.log(this.state.pages);
    const pagesJSX = this.state.pages.map((page) => <PageCard page={page} />);

    return (
      <Container layout="maxi" flexDirection="column">
        <Flex flexDirection="column">{pagesJSX}</Flex>
      </Container>
    );
  }
}

export default withProvider(HomePage);
