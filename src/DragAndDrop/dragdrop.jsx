import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./dragdrop.css"; 

const initialPlayers = {
  allrounders: [
    { id: "1", name: "Player 1" },
    { id: "2", name: "Player 2" },
    { id: "3", name: "Player 3" },
  ],
};

const DragDrop = () => {
  const [players, setPlayers] = useState(initialPlayers);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newAllrounders = Array.from(players.allrounders);
    const [movedPlayer] = newAllrounders.splice(result.source.index, 1);
    newAllrounders.splice(result.destination.index, 0, movedPlayer);

    setPlayers({ ...players, allrounders: newAllrounders });
  };

  return (
    <div className="drag-drop-container">
      <h2 className="drag-drop-title">Drag and Drop Players</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="allrounders">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="allrounders-list"
            >
              <h3>Allrounders</h3>
              {players.allrounders.map((player, index) => (
                <Draggable key={player.id} draggableId={player.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`player ${snapshot.isDragging ? "dragging" : ""}`}
                    >
                      {player.name}
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

export default DragDrop;