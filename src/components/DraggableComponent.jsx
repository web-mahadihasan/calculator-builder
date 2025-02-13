import { Draggable } from "react-beautiful-dnd"

const DraggableComponent = ({ id, index, children }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`m-1 ${
            snapshot.isDragging ? "bg-green-300" : ""
          }`}
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableComponent
