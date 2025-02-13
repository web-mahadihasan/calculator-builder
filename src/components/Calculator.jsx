"use client"

import { useState, useCallback } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import useStore from "../store"

const Calculator = () => {
  const [display, setDisplay] = useState("")
  const [result, setResult] = useState("")
  const components = useStore((state) => state.components)
  const removeComponent = useStore((state) => state.removeComponent)
  const updateComponents = useStore((state) => state.updateComponents)
  const [movingMode, setMovingMode] = useState(false)
  const [movingComponentId, setMovingComponentId] = useState(null)

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(display).toString())
      } catch (error) {
        setResult("Error")
      }
    } else if (value === "C") {
      setDisplay("")
      setResult("")
    } else if (value === "%") {
      try {
        const percentResult = eval(display.replace(/%/g, "/100*"))
        setResult(percentResult.toString())
      } catch (error) {
        setResult("Error")
      }
    } else {
      setDisplay((prev) => prev + value)
    }
  }

  const handleContextMenu = useCallback(
    (e, id) => {
      e.preventDefault()
      const contextMenu = document.createElement("div")
      contextMenu.className =
        "absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50"
      contextMenu.style.left = `${e.clientX}px`
      contextMenu.style.top = `${e.clientY}px`

      const deleteOption = document.createElement("div")
      deleteOption.className = "px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      deleteOption.textContent = "Delete"
      deleteOption.onclick = () => {
        removeComponent(id)
        document.body.removeChild(contextMenu)
      }

      const moveOption = document.createElement("div")
      moveOption.className = "px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      moveOption.textContent = "Move"
      moveOption.onclick = () => {
        setMovingMode(true)
        setMovingComponentId(id)
        document.body.removeChild(contextMenu)
      }

      contextMenu.appendChild(deleteOption)
      contextMenu.appendChild(moveOption)
      document.body.appendChild(contextMenu)

      const handleClickOutside = (event) => {
        if (!contextMenu.contains(event.target)) {
          if (document.body.contains(contextMenu)) {
            document.body.removeChild(contextMenu)
          }
          document.removeEventListener("click", handleClickOutside)
        }
      }

      document.addEventListener("click", handleClickOutside)
    },
    [removeComponent],
  )

  const handleMove = (targetIndex) => {
    if (movingMode && movingComponentId) {
      const sourceIndex = components.findIndex((c) => c.id === movingComponentId)
      if (sourceIndex !== -1) {
        const newComponents = Array.from(components)
        const [reorderedItem] = newComponents.splice(sourceIndex, 1)
        newComponents.splice(targetIndex, 0, reorderedItem)
        updateComponents(newComponents)
      }
      setMovingMode(false)
      setMovingComponentId(null)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="bg-gray-100 dark:bg-gray-700 p-4 mb-4 rounded-md">
        <div className="text-right text-2xl mb-2 overflow-x-auto whitespace-nowrap">{display || "0"}</div>
        <div className="text-right text-3xl font-bold overflow-x-auto whitespace-nowrap">{result || "0"}</div>
      </div>
      <Droppable droppableId="calculator" direction="vertical">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`grid grid-cols-4 gap-2 min-h-[200px] pb-8 ${
              snapshot.isDraggingOver ? "bg-blue-100 dark:bg-blue-900" : ""
            }`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.5rem",
            }}
          >
            {components.length === 0 && !snapshot.isDraggingOver && (
              <div className="col-span-4 flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Drag components here to build your calculator
              </div>
            )}
            {components.map((component, index) => (
              <Draggable key={component.id} draggableId={component.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative"
                    style={{
                      ...provided.draggableProps.style,
                      gridColumn: `span 1`,
                    }}
                  >
                    <button
                      onClick={() => (movingMode ? handleMove(index) : handleClick(component.value))}
                      onContextMenu={(e) => handleContextMenu(e, component.id)}
                      className={`w-full h-16 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-md transition-colors duration-200 ${
                        movingMode ? "cursor-move" : "cursor-pointer"
                      }`}
                    >
                      {component.value}
                    </button>
                    {movingMode && !snapshot.isDragging && (
                      <div className="absolute inset-0 bg-blue-200 opacity-50 pointer-events-none" />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Calculator

