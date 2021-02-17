import React from "react";

import { Box, Flex, Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import { TopicSnippetFragment } from "../../generated/graphql";
import Card from "../Common/Card";
import Paragraph from "../Common/Paragraph";
import TextLink from "../Common/TextLink";
import Statement from "../Statement";
import HeaderLink from "../Common/HeaderLink";
import FinalValue from "../Variable/views/FinalValue";

type Props = { topic: TopicSnippetFragment };

const Topic = (props: Props) => {
  const { topic } = props;
  let content;

  if (topic) {
    content = [];

    for (const i in topic.rows) {
      const row = topic.rows[i],
        rowJSX: any = [];
      for (const c in row.columns) {
        const column = row.columns[c];
        let columnJSX;

        switch (column.type) {
          case "PAGE_HIGHLIGHT": {
            const page = column.page;
            columnJSX = (
              <Card>
                <HeaderLink link={`/p/${page!.slug}`}>{page!.title}</HeaderLink>
                <Paragraph paragraph={page!.currentParagraph} />
              </Card>
            );
            break;
          }
          case "PAGE_LIST": {
            const pages = column.pages;
            columnJSX = (
              <Card>
                <Heading size="md">{column.title}</Heading>
                <UnorderedList>
                  {pages.map((page) => {
                    return (
                      <ListItem>
                        <TextLink link={`/p/${page!.slug}`}>
                          {page!.title}
                        </TextLink>
                      </ListItem>
                    );
                  })}
                </UnorderedList>
              </Card>
            );
            break;
          }
          case "QUOTE": {
            const statement = column.statement;
            columnJSX = (
              <Card>
                <HeaderLink link={`/p/${statement!.page.slug}`}>
                  {statement!.page.title}
                </HeaderLink>
                <Statement statement={statement!} />
              </Card>
            );
            break;
          }
          case "VARIABLES": {
            columnJSX = (
              <Card>
                <Flex
                  flexDir={{ base: "column", md: "row" }}
                  justifyContent="space-around"
                  align="center"
                >
                  {column.variables.map((variable) => (
                    <Box
                      textAlign="center"
                      w={{ base: "100%", md: "75%" }}
                      m={{ base: 2, md: 2 }}
                    >
                      <Flex flexDir="column">
                        <FinalValue
                          fontSize="xl"
                          fontWeight="bold"
                          finalValue={variable.finalValue}
                          flexShrink={0}
                        />
                        <HeaderLink
                          link={`/v/${variable._id}`}
                          fontSize="sm"
                          fontWeight="normal"
                        >
                          {variable.title}
                        </HeaderLink>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Card>
            );
            break;
          }
          default:
            break;
        }

        rowJSX.push(columnJSX);
      }

      content.push(
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignContent="center"
        >
          {rowJSX}
        </Flex>
      );
    }
  }

  return (
    <Box>
      <Heading ml={2}>{topic.title} Topic</Heading>
      {content}
    </Box>
  );
};

export default Topic;
