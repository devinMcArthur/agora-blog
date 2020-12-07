import React from "react";
import Sentence from "../components/Sentence";

import ExternalMention from "../components/Sentence/views/ExternalMention";
import InternalMention from "../components/Sentence/views/InternalMention";
import Quote from "../components/Sentence/views/Quote";
import Variable from "../components/Sentence/views/Variable";

import { SentencePopulated } from "../typescript/interfaces/documents/Sentence";

export default function SentenceService() {
  // Translate Sentence object to HTML
  const translateSentenceToHTML = (
    sentence: SentencePopulated,
    showSources = true
  ) => {
    let html = "";
    let currentStringArray =
      sentence?.versions[sentence.versions.length - 1].stringArray;
    if (currentStringArray) {
      currentStringArray.forEach((object) => {
        let newHTML = object.string;
        let placedMention = false;
        if (object.styles) {
          object.styles.forEach((style) => {
            if (style.type === "mention" && style.value && !placedMention) {
              if (style.variant === "external") {
                newHTML = `<a href="${style.value.url}" data-type="${style.variant}" target="_blank">${newHTML}</a>`;
              } else if (style.variant === "internal") {
                let slug;
                if (style.value.page && style.value.page.slug)
                  slug = style.value.page.slug;
                else if (style.value) slug = style.value;
                newHTML = `<a href="/p/${slug}" data-type="${style.variant}">${newHTML}</a>`;
              }
            } else if (style.type === "bold") {
              newHTML = `<strong>${newHTML}</strong>`;
            } else if (style.type === "quote") {
              newHTML = `<q class="quote-block">${translateSentenceToHTML(
                style.value.sentence,
                false
              )}</q><sup>[<a target="_blank" href="${
                style.value.page.slug
              }">src</a>]</sup>`;
            } else if (style.type === "variable") {
              newHTML = `<span data-variable_id=${
                style.value.variableID
              } class="variable-block" contenteditable="false">${
                style.value.variable.versions[
                  style.value.variable.versions.length - 1
                ].finalValue
              }</span>`;
            }
          });
        }
        html += newHTML;
      });
      if (sentence.sources && showSources) {
        if (sentence.sources.pages) {
          sentence.sources.pages.forEach((page, index) => {
            html += `<sup>[<a href="/p/${page.page.slug}" target="_blank">p-${index}</a>]</sup>`;
          });
        }
        if (sentence.sources.urls) {
          sentence.sources.urls.forEach((url, index) => {
            html += `<sup>[<a href="${url.url}" target="_blank">u-${index}</a>]</sup>`;
          });
        }
      }
      if (sentence.questions && showSources) {
        sentence.questions.forEach((question, index) => {
          if (question)
            html += `<sup>[<a target="_blank" href="/q/${question._id}">q-${index}</a>]</sup>`;
        });
      }
    }
    return html;
  };

  const translateSentenceToJSX = (sentence: SentencePopulated) => {
    // const InternalMention = ({ newJSX, pageID }) => {
    //   const [isLoading, results] = useGetPageByID(pageID);

    //   let content = <Loading size="sm" display="inline" />;
    //   if (!isLoading && results && results.page) {
    //     const page = results.page;
    //     content = (
    //       <a href={page.slug} data-type="internal" target="_blank">
    //         {newJSX}
    //       </a>
    //     );
    //   }

    //   return content;
    // };

    let jsx;
    let currentStringArray =
      sentence.versions[sentence.versions.length - 1].stringArray;
    if (currentStringArray) {
      jsx = currentStringArray.map((object, index) => {
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
                <Quote style={style} key={index}>
                  <Sentence sentence={style.value.sentence} />
                </Quote>
              );
            } else if (style.type === "variable") {
              newJSX = <Variable style={style} key={index} />;
            }

            // Bold
            if (style.type === "bold") {
              newJSX = <strong>{newJSX}</strong>;
            }
          });
        }
        return newJSX;
      });
    }
    return <span>{jsx}</span>;
  };

  return {
    translateSentenceToHTML,
    translateSentenceToJSX,
  };
}
