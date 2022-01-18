import React from "react";
import { Container } from "@chakra-ui/react";
import TestDrag, { ITestDragItem } from "../components/TestDrag";

const Playground = () => {
  const [data, setData] = React.useState<ITestDragItem[]>([
    { id: 1, title: "One", description: "One two three" },
    { id: 2, title: "Two", description: "Lorum ipsum" },
    { id: 3, title: "Three", description: "This is the third one" },
    { id: 4, title: "Four", description: "May the fourth be with you" },
  ]);

  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = data[dragIndex];
      const dataCopy = [...data];
      dataCopy.splice(dragIndex, 1);
      dataCopy.splice(hoverIndex, 0, dragCard);
      console.log("newData", dataCopy);
      setData(dataCopy);
    },
    [data]
  );

  return (
    <Container>
      <h1>Playground</h1>
      <div>
        {data.map((item, i) => (
          <TestDrag moveCard={moveCard} index={i} item={item} key={item.id} />
        ))}
      </div>
    </Container>
  );
};

export default Playground;
