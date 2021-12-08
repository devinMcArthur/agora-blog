import { Box, Divider, Text } from "@chakra-ui/layout";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { Tooltip } from "@chakra-ui/tooltip";
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

  React.useEffect(() => {
    setSelectedQuestionId(undefined);
  }, [questions]);

  return React.useMemo(() => {
    if (questions && questions.length > 0) {
      return (
        <Box>
          <Box py={2}>
            {questions.map((question) => {
              const selected = selectedQuestionId === question._id;
              return (
                <Tooltip label={question.question} key={question._id}>
                  <Tag
                    m={1}
                    backgroundColor={selected ? "gray.400" : "gray.300"}
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
                      {selectedQuestionId === question._id && (
                        <Box mb={2} maxW="inherit">
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
                </Tooltip>
              );
            })}
          </Box>
        </Box>
      );
    } else return <Text textAlign="center">- no questions -</Text>;
  }, [questions, selectedQuestionId, avoidPageId, onStatementSelect]);
};

export default QuestionTagRelated;
