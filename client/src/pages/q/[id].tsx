import { Container, Heading } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import ClientOnly from "../../components/Common/ClientOnly";
import QuestionIdClientContent from "../../components/q/id/ClientContent";
import { PageSsrQuestionComp, ssrSsrQuestion } from "../../generated/page";
import Head from "next/head";

const Question: PageSsrQuestionComp = ({ data: propsData }) => {
  const { question: questionTitle, _id } = propsData!.question!;

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>{questionTitle}</title>
        <meta
          name="description"
          content={`All answers to the question: ${questionTitle}`}
        />
      </Head>
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
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.question) notFound = true;

  return { ...res, notFound };
};

export default Question;
