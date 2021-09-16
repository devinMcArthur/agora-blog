import { Box } from "@chakra-ui/react";
import React from "react";

import ImageDisplay from "../components/Statement/views/ImageDisplay";
import ExternalMention from "../components/Statement/views/ExternalMention";
import InternalMention from "../components/Statement/views/InternalMention";
import QuotedStatement from "../components/Statement/views/QuotedStatement";
import Variable from "../components/Statement/views/Variable";

import { DisplayStatementSnippetFragment } from "../generated/graphql";

export default function StatementService() {
  // Translate Statement object to HTML
  // const translateStatementToHTML = (
  //   statement: DisplayStatementSnippetFragment,
  //   showSources = true
  // ) => {
  //   let html = "";
  //   let currentVersion = statement?.versions[statement.versions.length - 1]
  //   let currentStringArray =
  //     currentVersion.stringArray;
  //   if (currentStringArray) {
  //     currentStringArray.forEach((object) => {
  //       let newHTML = object.string;
  //       let placedMention = false;
  //       if (object.styles) {
  //         object.styles.forEach((style) => {
  //           if (style.type === "mention" && style.value && !placedMention) {
  //             if (style.variant === "external") {
  //               newHTML = `<a href="${style.value.url}" data-type="${style.variant}" target="_blank">${newHTML}</a>`;
  //             } else if (style.variant === "internal") {
  //               let slug;
  //               if (style.value.page && style.value.page.slug)
  //                 slug = style.value.page.slug;
  //               else if (style.value) slug = style.value;
  //               newHTML = `<a href="/p/${slug}" data-type="${style.variant}">${newHTML}</a>`;
  //             }
  //           } else if (style.type === "bold") {
  //             newHTML = `<strong>${newHTML}</strong>`;
  //           } else if (style.type === "quote") {
  //             newHTML = `<q class="quote-block">${translateSentenceToHTML(
  //               undefined,
  //               style.value.statement._id,
  //               false
  //             )}</q><sup>[<a target="_blank" href="${
  //               style.value.page!.slug
  //             }">src</a>]</sup>`;
  //           } else if (style.type === "variable") {
  //             newHTML = `<span data-variable_id=${
  //               style.value.variable!._id
  //             } class="variable-block" contenteditable="false">${
  //               style.value.variable!.finalValue
  //             }</span>`;
  //           }
  //         });
  //       }
  //       html += newHTML;
  //     });
  //     if (currentVersion.sources && showSources) {
  //       if (currentVersion.sources.pages) {
  //         currentVersion.sources.pages.forEach((page, index) => {
  //           html += `<sup>[<a href="/p/${page.slug}" target="_blank">p-${index}</a>]</sup>`;
  //         });
  //       }
  //       if (currentVersion.sources.urls) {
  //         currentVersion.sources.urls.forEach((url, index) => {
  //           html += `<sup>[<a href="${url}" target="_blank">u-${index}</a>]</sup>`;
  //         });
  //       }
  //     }
  //     if (currentVersion.questions && showSources) {
  //       currentVersion.questions.forEach((question, index) => {
  //         if (question)
  //           html += `<sup>[<a target="_blank" href="/q/${question._id}">q-${index}</a>]</sup>`;
  //       });
  //     }
  //   }
  //   return html;
  // };

  const translateStatementToJSX = (
    statement: DisplayStatementSnippetFragment
  ) => {
    let jsx;
    let currentStringArray =
      statement.versions[statement.versions.length - 1].stringArray;
    if (currentStringArray) {
      jsx = currentStringArray.map((object, index) => {
        const contentString = object.string;
        let newJSX = <span key={index}>{object.string}</span>;
        let placedMention = false;
        if (object.styles) {
          object.styles.forEach((style) => {
            if (style.type === "mention" && style.value && !placedMention) {
              if (style.variant === "external") {
                newJSX = (
                  <ExternalMention key={index} style={style}>
                    {contentString}
                  </ExternalMention>
                );
              } else if (style.variant === "internal") {
                newJSX = (
                  <InternalMention key={index} style={style}>
                    {contentString}
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
              newJSX = <Variable style={style} key={index} />;
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
              newJSX = <strong>{contentString}</strong>;
            }
          });
        }
        return (
          <span id={index.toString()} className="parent-input">
            {newJSX}
          </span>
        );
      });
    }
    return <span>{jsx}</span>;
  };

  return {
    // translateSentenceToHTML,
    translateStatementToJSX,
  };
}
