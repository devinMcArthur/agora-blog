import { Box } from "@chakra-ui/layout";
import React from "react";

import { FullStringArraySnippetFragment } from "../../generated/graphql";
import ExternalMention from "../Statement/views/ExternalMention";
import ImageDisplay from "../Statement/views/ImageDisplay";
import InternalMention from "../Statement/views/InternalMention";
import QuotedStatement from "../Statement/views/QuotedStatement";
import Variable from "../Statement/views/Variable";

interface IStringArray {
  stringArray: FullStringArraySnippetFragment[];
}

const StringArray = ({ stringArray }: IStringArray) => {
  const stringArrayJSX = stringArray.map((object, index) => {
    let newJSX = <span key={index}>{object.string}</span>;
    let placedMention = false;
    if (object.styles) {
      object.styles.forEach((style) => {
        if (style.type === "mention" && style.value && !placedMention) {
          if (style.variant === "external") {
            newJSX = (
              <ExternalMention key={index} style={style}>
                {newJSX}
              </ExternalMention>
            );
          } else if (style.variant === "internal") {
            newJSX = (
              <InternalMention key={index} style={style}>
                {newJSX}
              </InternalMention>
            );
          }
        } else if (style.type === "quote") {
          newJSX = (
            <QuotedStatement
              statementID={style.value.statement!._id}
              key={index}
            />
          );
        } else if (style.type === "variable") {
          newJSX = <Variable style={style} />;
        } else if (style.type === "image") {
          newJSX = (
            <Box
              display="block"
              ml="auto"
              mr="auto"
              w={{ base: "50%", lg: "30%" }}
            >
              <ImageDisplay image={style.value.image!} />
            </Box>
          );
        }

        // Bold
        if (style.type === "bold") {
          newJSX = <strong>{newJSX}</strong>;
        }

        // Italic
        if (style.type === "italic") {
          newJSX = <i>{newJSX}</i>;
        }
      });
    }
    return (
      <span key={index} id={index.toString()} className="parent-input">
        {newJSX}
      </span>
    );
  });

  return <span>{stringArrayJSX}</span>;
};

export default StringArray;
