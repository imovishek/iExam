import { faAdjust, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Tooltip } from "antd";
import React, { Component, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AwesomeIcon, Row, Text } from "../../../utitlities/styles";
import uniqid from "uniqid";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const DraggableColumn = ({
  values,
  matchingIndexes,
  setValues,
  minHeight,
  isEditing,
}) => {
  const [items, setItemsOnly] = useState([]);
  const setItems = (items) => {
    setValues(items);
    setItemsOnly(items);
  };
  useEffect(() => {
    if (items !== values) setItemsOnly(values);
  }, [values]);

  const getListStyle = (isDraggingOver) => ({
    boxShadow: "0px 0px 5px #bbbbbb",
    padding: grid,
    width: "100%",
    minHeight: minHeight || "200px",
  });

  const getItemStyle = (isDragging, draggableStyle, index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    height: "60px",
    display: "flex",
    alignItems: "center",
    cursor: isEditing ? "pointer" : "auto",
    // change background colour if dragging
    background: "rgb(255 255 255)",
    border: matchingIndexes[index]
      ? "2px solid #14c719"
      : "2px solid lightgrey",
    // styles we need to apply on draggables
    ...draggableStyle,
    zIndex: 1000,
  });

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.values !== this.props.values) {
  //     this.setState({
  //       items: this.props.values,
  //     });
  //   }
  //   if (prevProps.matchingIndexes !== this.props.matchingIndexes) {
  //     this.setState({
  //       matchingIndexes: this.props.matchingIndexes,
  //     });
  //   }
  // }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  isDragDisabled={!isEditing}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        index
                      )}
                    >
                      <Row columns="1fr">
                        <Tooltip
                          title={item.value}
                          mouseEnterDelay={0.5}
                          mouseLeaveDelay={0}
                        >
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.value}
                          </div>
                        </Tooltip>
                      </Row>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableColumn;
