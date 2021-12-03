import { Box } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";

import { useUserContributionsQuery } from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import PageCard from "../../Common/PageCard";
import ParagraphEditProposal from "../../Common/ParagraphEditProposal";
import VariableCard from "../../Common/VariableCard";
import VariableEditProposal from "../../Common/VariableEditProposal";

interface IUserContributions {
  id: string;
}

const UserContributions = ({ id }: IUserContributions) => {
  const { data } = useUserContributionsQuery({
    variables: {
      id,
    },
  });

  const content = React.useMemo(() => {
    if (data?.user) {
      return (
        <Tabs>
          <TabList>
            {data.user.authoredPages.length > 0 && <Tab>Pages</Tab>}
            {data.user.authoredParagraphEditProposals.length > 0 && (
              <Tab>Page Edits</Tab>
            )}
            {data.user.authoredVariables.length > 0 && <Tab>Variables</Tab>}
            {data.user.authoredVariableEditProposals.length > 0 && (
              <Tab>Variable Edits</Tab>
            )}
          </TabList>
          <TabPanels>
            <TabPanel>
              {data.user.authoredPages.map((page) => (
                <PageCard page={page} key={page._id} />
              ))}
            </TabPanel>
            <TabPanel>
              {data.user.authoredParagraphEditProposals.map(
                (paragraphEditProposal) => (
                  <ParagraphEditProposal
                    paragraphEditProposalId={paragraphEditProposal._id}
                    key={paragraphEditProposal._id}
                  />
                )
              )}
            </TabPanel>
            <TabPanel>
              {data.user.authoredVariables.map((variable) => (
                <VariableCard variable={variable} key={variable._id} />
              ))}
            </TabPanel>
            <TabPanel>
              {data.user.authoredVariableEditProposals.map(
                (variableEditProposal) => (
                  <VariableEditProposal
                    variableEditProposal={variableEditProposal}
                    key={variableEditProposal._id}
                  />
                )
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      );
    } else {
      return <Loading />;
    }
  }, [data?.user]);

  return <Box mt={2}>{content}</Box>;
};

export default UserContributions;
