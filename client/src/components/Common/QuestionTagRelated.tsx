import { Box, Divider } from "@chakra-ui/layout";
import { Tag, TagLabel } from "@chakra-ui/tag";
import React from "react";
import RecommendedStatements, {
  IRecommendedStatements,
} from "./RecommendedStatements";

interface IQuestionTagRelated {
  questions?: {
    question: string;
    _id: string;
  }[];
  avoidPageId?: string;
  onStatementSelect?: IRecommendedStatements["selectedStatement"];
}

const QuestionTagRelated = ({
  questions,
  avoidPageId,
  onStatementSelect,
}: IQuestionTagRelated) => {
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<string>();

  console.log("avoidPageId", avoidPageId);

  return React.useMemo(() => {
    if (questions && questions.length > 0)
      return (
        <Box>
          <Box py={2}>
            {questions.map((question) => {
              const selected = selectedQuestionId === question._id;
              return (
                <Tag
                  backgroundColor={selected ? "gray.300" : "gray.200"}
                  width={selected ? "100%" : "auto"}
                >
                  <Box display="flex" flexDir="column" width="100%">
                    <TagLabel
                      cursor="pointer"
                      onClick={() =>
                        selected
                          ? setSelectedQuestionId(undefined)
                          : setSelectedQuestionId(question._id)
                      }
                      fontWeight="bold"
                      my={2}
                    >
                      {question.question}
                    </TagLabel>
                    {selectedQuestionId && (
                      <Box mb={2}>
                        <Divider my={1} />
                        <RecommendedStatements
                          avoidedPage={avoidPageId}
                          questionId={selectedQuestionId}
                          selectedStatement={(statementId, pageSlug) => {
                            if (onStatementSelect)
                              onStatementSelect(statementId, pageSlug);
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Tag>
              );
            })}
          </Box>
        </Box>
      );
    else return <></>;
  }, [questions, selectedQuestionId, avoidPageId, onStatementSelect]);
};

export default QuestionTagRelated;
