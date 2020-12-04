import React from "react";
import { PagePopulatedFull } from "../typescript/interfaces/documents/Page";
import { SentencePopulated } from "../typescript/interfaces/documents/Sentence";
import APIService from "./apiService";

export default function PageService() {
  // Get page by slug
  const getPageBySlug = (pageSlug: string) => {
    return new Promise<PagePopulatedFull>((resolve, reject) => {
      APIService()
        .apiCall({
          endpoint: "/pageBySlug",
          options: { params: { pageSlug } },
        })
        .then((res) => resolve(res.data.page))
        .catch((err) => reject(err));
    });
  };

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
              newHTML = `<span data-variable_id=${style.value.variableID} class="variable-block" contenteditable="false">${style.value.variable.finalValue}</span>`;
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

  const translateSentenceToJSX = (
    sentence: SentencePopulated,
    showSources = true
  ) => {
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

    let jsx, questions, sourcePages, sourceURLs;
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
                  <a
                    key={index}
                    href={style.value.url}
                    data-type={style.variant}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {newJSX}
                  </a>
                );
              } else if (style.variant === "internal") {
                newJSX = (
                  <a
                    key={index}
                    href={style.value.page.slug}
                    data-type={style.variant}
                  >
                    {newJSX}
                  </a>
                );
              }
            } else if (style.type === "bold") {
              newJSX = <strong>{newJSX}</strong>;
            } else if (style.type === "quote") {
              newJSX = (
                <span key={index}>
                  <q>{translateSentenceToJSX(style.value.sentence, false)}</q>
                  <sup>
                    [<a href={style.value.page.slug}>src</a>]
                  </sup>
                </span>
              );
            } else if (style.type === "variable") {
              newJSX = (
                <span key={index}>
                  {style.value.variable.finalValue}
                  <sup>
                    [<a href={`/v/${style.value.variable._id}`}>src</a>]
                  </sup>
                </span>
              );
            }
          });
        }
        return newJSX;
      });
      if (sentence.sources && showSources) {
        if (sentence.sources.pages) {
          sourcePages = sentence.sources.pages.map((page, index) => {
            return (
              <sup>
                [<a href={`/p/${page.page.slug}`}>p-{index}</a>]
              </sup>
            );
          });
        }
        if (sentence.sources.urls) {
          sourceURLs = sentence.sources.urls.map((url, index) => {
            return (
              <sup>
                [
                <a href={url.url} target="_blank" rel="noreferrer">
                  u-{index}
                </a>
                ]
              </sup>
            );
          });
        }
      }
      if (sentence.questions && sentence.questions.length > 0 && showSources) {
        questions = sentence.questions.map((question, index) => {
          if (question)
            return (
              <sup key={index} title={question.question}>
                [<a href={`/q/${question._id}`}>q-{index}</a>]
              </sup>
            );
          else return null;
        });
      }
    }
    return (
      <span>
        {jsx}
        {sourcePages}
        {sourceURLs}
        {questions}{" "}
      </span>
    );
  };

  return {
    getPageBySlug,
    translateSentenceToHTML,
    translateSentenceToJSX,
  };
}
