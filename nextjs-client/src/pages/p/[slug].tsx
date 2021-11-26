import Layout from "../../components/layout";
import { GetServerSideProps } from "next";

import { ssr, PageComp } from "../../generated/page";
import { withApollo } from "../../withApollo";

const Page: PageComp = ({ data }) => {
  return (
    <Layout>
      <h1>{data.page.title}</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssr.getServerPage(
    { variables: { slug: params.slug as string } },
    ctx
  );
  return res;
};

export default withApollo(
  ssr.withPage((arg) => ({
    variables: { slug: arg?.query?.slug?.toString() || "" },
  }))(Page)
);
