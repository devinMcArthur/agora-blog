import { GetServerSideProps } from "next";
import {
  AllPagesQueryResult,
  AllQuestionsQueryResult,
} from "../generated/graphql";
import { ssrAllQuestions, ssrAlls } from "../generated/page";

const SiteMap = () => {};

const generateSiteMap = (
  pagesData: AllPagesQueryResult["data"],
  questionsData: AllQuestionsQueryResult["data"]
) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://agora.voto/</loc>
      </url>
      ${pagesData?.allPages
        .map(
          (page) => `
        <url>
          <loc>https://agora.voto/p/${page.slug}</loc>
        </url>
      `
        )
        .join("")}
      ${questionsData?.allQuestions
        .map(
          (question) => `
      <url>
        <loc>https://agora.voto/q/${question.slug}</loc>
      </url>
    `
        )
        .join("")}
    </urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  ...ctx
}) => {
  const pageResult = await ssrAlls.getServerPage({}, ctx);
  const questionResult = await ssrAllQuestions.getServerPage({}, ctx);

  const sitemap = generateSiteMap(
    pageResult.props.data,
    questionResult.props.data
  );

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
