import { Container, Heading } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import ClientOnly from "../../components/Common/ClientOnly";
import QuestionIdClientContent from "../../components/q/slug/ClientContent";
import { PageSsrQuestionComp, ssrSsrQuestion } from "../../generated/page";
import Head from "next/head";

const Question: PageSsrQuestionComp = ({ data: propsData }) => {
  const { question: questionTitle, _id } = propsData!.question!;

  const description = `All answers to the question: ${questionTitle}`;

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>{questionTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content="https://agora.voto" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={questionTitle} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:description" content={description} />
      </Head>
      <Heading size="sm" color="gray.400">
        Question
      </Heading>
      <Heading as="h5">{questionTitle}</Heading>
      <ClientOnly>
        <QuestionIdClientContent id={_id} />
      </ClientOnly>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrSsrQuestion.getServerPage(
    { variables: { slug: encodeURIComponent(params?.slug as string) } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.question) notFound = true;

  return { ...res, notFound };
};

export default Question;
