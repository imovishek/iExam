import { faAdjust, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import React, { Component, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AwesomeIcon, Row } from "../../../../utitlities/styles";
import uniqid from "uniqid";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  boxShadow: "0px 0px 5px #bbbbbb",
  padding: grid,
  width: "100%",
  minHeight: "500px",
});

const DraggableColumn = ({ values, matchingIndexes, setValues }) => {
  const [items, setItemsOnly] = useState([]);
  const setItems = (items) => {
    setValues(items);
    setItemsOnly(items);
  };
  useEffect(() => {
    if (items !== values) setItemsOnly(values);
  }, [values]);

  const getItemStyle = (isDragging, draggableStyle, index) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#f3f3f3" : "#f3f3f3",
    border: matchingIndexes[index]
      ? "2px solid #14c719"
      : "2px solid lightgrey",
    // styles we need to apply on draggables
    ...draggableStyle,
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
      <Button
        onClick={() => {
          const newItems = [...items];
          newItems.unshift({
            id: uniqid("match"),
            value: "",
          });
          setItems(newItems);
        }}
        style={{
          marginBottom: "10px",
        }}
      >
        {" "}
        + Add{" "}
      </Button>

      <Button
        onClick={() => {
          const newItems = [...items];
          const n = newItems.length;
          for (let i = 0; i < 1000; i++) {
            const j = Math.floor(Math.random() * 1000) % n;
            const k = Math.floor(Math.random() * 1000) % n;
            const tmp = newItems[j];
            newItems[j] = newItems[k];
            newItems[k] = tmp;
          }
          setItems(newItems);
        }}
        style={{
          marginBottom: "10px",
          marginLeft: "10px",
        }}
      >
        {" "}
        Shuffle{" "}
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                      <Row columns="1fr 30px">
                        <Input
                          value={item.value}
                          onChange={(e) => {
                            const newItems = [...items];
                            const thisItem = newItems.filter(
                              (it) => it.id === item.id
                            );
                            thisItem[0].value = e.target.value;
                            setItems(newItems);
                          }}
                        />
                        <AwesomeIcon
                          type="delete"
                          onClick={() => {
                            const newItems = [...items];
                            setItems(
                              newItems.filter((it) => it.id !== item.id)
                            );
                          }}
                        />
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
