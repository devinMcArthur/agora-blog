import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import {
  RestSsrVariableSnippetFragment,
  useRestSsrVariableQuery,
} from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import PageCard from "../../Common/PageCard";
import VariableEditProposal from "../../Common/VariableEditProposal";

interface IVariablePageTabs {
  id: string;
  onFetch: (variable: RestSsrVariableSnippetFragment) => void;
}

const VariablePageTabs = ({ id, onFetch }: IVariablePageTabs) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = useRestSsrVariableQuery({ variables: { id: id } });

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (data?.variable) onFetch(data.variable);
  }, [data, loading, onFetch]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    const components: {
      relatedPageList: React.ReactNode;
      editProposals: React.ReactNode;
    } = {
      relatedPageList: <Loading />,
      editProposals: <Loading />,
    };

    if (data?.variable && !loading) {
      const { variable } = data;

      components.relatedPageList = variable.relatedPages.map((relatedPage) => (
        <PageCard
          page={relatedPage}
          referenceObject={{ type: "variable", variableID: id }}
          key={relatedPage._id}
        />
      ));

      components.editProposals = variable.editProposals.map((proposal) => (
        <VariableEditProposal
          variableEditProposal={proposal}
          key={proposal._id}
        />
      ));
    }

    return components;
  }, [data, id, loading]);

  return (
    <Tabs variant="line">
      <TabList>
        <Tab>References</Tab>
        <Tab>Edit Proposals</Tab>
      </TabList>
      <TabPanels>
        <TabPanel display="flex" flexDir="column">
          {content.relatedPageList}
        </TabPanel>
        <TabPanel display="flex" flexDir="column">
          {content.editProposals}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default VariablePageTabs;
