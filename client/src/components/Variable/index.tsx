import * as React from "react";
import { RouterProps } from "react-router";

import PageCard from "../Common/PageCard";
import Container from "../Common/Container";
import Flex from "../Common/Flex";
import Loading from "../Common/Loading";
import { VariablePopulatedFull } from "../../typescript/interfaces/documents/Variable";
import VariableService from "../../services/variableService";
import FinalValue from "./views/FinalValue";

type Props = {
  match: any;
};

type State = {
  variable: VariablePopulatedFull | undefined;
};

class Variable extends React.Component<Props & RouterProps, State> {
  state: State = {
    variable: undefined,
  };

  componentDidMount() {
    VariableService()
      .getVariableByID(this.props.match.params.variableID)
      .then((variable) => {
        this.setState((state) => ({
          ...state,
          variable,
        }));
      });
  }

  componentDidUpdate(prevProps: Props & RouterProps) {
    if (
      prevProps.match.params.variableID !== this.props.match.params.variableID
    ) {
      VariableService()
        .getVariableByID(this.props.match.params.variableID)
        .then((variable) => {
          this.setState((state) => ({
            ...state,
            variable,
          }));
        });
    }
  }

  render() {
    const { variable } = this.state;
    let content = <Loading />;

    if (variable) {
      const relatedPageList = variable.relatedPages.map((relatedPage) => (
        <PageCard
          page={relatedPage}
          referenceObject={{ type: "variable", variableID: variable._id }}
        />
      ));

      const currentVersion = variable.versions[variable.versions.length - 1];

      content = (
        <Flex flexDirection="column">
          <h2>{variable.title}</h2>
          <h3>
            Current: <FinalValue finalValue={currentVersion.finalValue} />
          </h3>
          <i>updated: {currentVersion.createdAt}</i>
          <i>
            <a href={currentVersion.sourceURL} target="_blank" rel="noreferrer">
              source
            </a>
          </i>
          <Flex>{relatedPageList}</Flex>
        </Flex>
      );
    }

    return <Container>{content}</Container>;
  }
}

export default Variable;
