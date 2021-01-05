import * as React from "react";
import { Divider, Skeleton } from "@chakra-ui/react";
import Card from "./Card";

const SkeletonCard = () => {
  return (
    <Card>
      <Skeleton height={5} width="70%" m={2} />
      <Divider />
      <Skeleton height={4} m={2} />
      <Skeleton height={4} m={2} />
      <Skeleton height={4} width="70%" m={2} />
    </Card>
  );
};

export default SkeletonCard;
