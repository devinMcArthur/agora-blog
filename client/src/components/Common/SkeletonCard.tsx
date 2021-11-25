import * as React from "react";
import { Box, Divider, Skeleton, Spinner, Tag } from "@chakra-ui/react";
import Card, { ICard } from "./Card";

interface ISkeletonCard extends Omit<ICard, "variant"> {
  variant: "page" | "question";
}

const SkeletonCard = ({ variant, ...props }: ISkeletonCard) => {
  // Page default
  let content = (
    <Card {...props}>
      <Skeleton height={5} width="70%" m={2} />
      <Divider />
      <Skeleton height={4} m={2} />
      <Skeleton height={4} m={2} />
      <Skeleton height={4} width="70%" m={2} />
    </Card>
  );
  if (variant === "question") {
    content = (
      <Card {...props}>
        <Skeleton height={5} width="70%" m={2} />
        <Divider />
        <Box pt={2}>
          <Tag>
            <b>
              Answers: <Spinner size="xs" />
            </b>
          </Tag>
        </Box>
      </Card>
    );
  }

  return content;
};

export default SkeletonCard;
