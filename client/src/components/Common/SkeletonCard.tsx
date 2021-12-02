import * as React from "react";
import { Box, Divider, Skeleton, Spinner, Tag } from "@chakra-ui/react";
import Card, { ICard } from "./Card";

interface ISkeletonCard extends Omit<ICard, "variant"> {
  variant: "page" | "question";
}

const SkeletonCard = ({ variant, ...props }: ISkeletonCard) => {
  let content = (
    <Box>
      <Skeleton height={3} m={2} />
      <Skeleton height={3} m={2} />
      <Skeleton height={3} width="70%" m={2} />
    </Box>
  );

  if (variant === "question") {
    content = (
      <Box pt={2}>
        <Tag>
          <b>
            Answers: <Spinner size="xs" />
          </b>
        </Tag>
      </Box>
    );
  }

  return (
    <Card heading={<Skeleton height={4} width="70%" m={2} />} {...props}>
      {content}
    </Card>
  );
};

export default SkeletonCard;
