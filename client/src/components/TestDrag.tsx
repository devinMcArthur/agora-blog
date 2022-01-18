import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { MdDragHandle } from "react-icons/md";

import { DragItemTypes } from "../constants/dragItemTypes";

export interface ITestDragItem {
  title: string;
  description: string;
  id: number;
}

interface IDragItem {
  index: number;
  id: number;
  type: string;
}

export interface ITestDrag {
  item: ITestDragItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const TestDrag: React.FC<ITestDrag> = ({ item, moveCard, index }) => {
  /**
   * ----- Hook Initialization -----
   */

  const dragHandleRef = React.useRef<HTMLButtonElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: DragItemTypes.STATEMENT,
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDragItem, monitor: DropTargetMonitor) {
      if (!dragHandleRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dragHandleRef.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: DragItemTypes.STATEMENT,
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  /**
   * ----- Rendering -----
   */

  const opacity = isDragging ? 0.5 : 1;
  drag(dragHandleRef);
  drop(preview(containerRef));
  return (
    <Box
      m={2}
      w="100%"
      key={item.id}
      border="1px solid black"
      display="flex"
      flexDir="row"
      justifyContent="space-between"
      opacity={opacity}
      ref={containerRef}
      data-handler-id={handlerId}
    >
      <Box>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
      </Box>
      <IconButton
        _focus={{ outline: "none" }}
        aria-label="drag"
        ref={dragHandleRef}
        icon={<MdDragHandle />}
      />
    </Box>
  );
};

export default TestDrag;
