"use client"

import React, { useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Undo2, Redo2, Moon, Sun } from "lucide-react"
import DraggableComponent from "./components/DraggableComponent"
import Calculator from "./components/Calculator"
import useStore from "./store"

const App = () => {
  const components = useStore((state) => state.components)
  const usedComponents = useStore((state) => state.usedComponents)
  const addComponent = useStore((state) => state.addComponent)
  const removeComponent = useStore((state) => state.removeComponent)
  const updateComponents = useStore((state) => state.updateComponents)
  const undo = useStore((state) => state.undo)
  const redo = useStore((state) => state.redo)

  const [darkMode, setDarkMode] = React.useState(false)

  useEffect(() => {
    const savedComponents = localStorage.getItem("calculatorComponents")
    if (savedComponents) {
      const parsedComponents = JSON.parse(savedComponents)
      updateComponents(parsedComponents)
      const usedSet = new Set(parsedComponents.map((c) => c.value))
      useStore.setState({ usedComponents: usedSet })
    }
  }, [updateComponents])

  useEffect(() => {
    localStorage.setItem("calculatorComponents", JSON.stringify(components))
  }, [components])

  const handleDragEnd = (result) => {
    if (!result.destination) return
    if (result.source.droppableId === "toolbox" && result.destination.droppableId === "calculator") {
      if (!usedComponents.has(result.draggableId)) {
        const newComponent = {
          id: `component-${Date.now()}`,
          value: result.draggableId,
        }
        addComponent(newComponent, result.destination.index)
      }
    } else if (result.source.droppableId === "calculator" && result.destination.droppableId === "toolbox") {
      removeComponent(result.draggableId)
    } else if (result.source.droppableId === "calculator" && result.destination.droppableId === "calculator") {
      const items = Array.from(components)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      updateComponents(items)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const toolboxComponents = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "=",
    "C",
    "(",
    ")",
    ".",
    "%",
  ]

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="container max-w-5xl mx-auto p-4 dark:bg-gray-900 dark:text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4 sm:mb-0">
            Build Your Dream Calculator
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={undo}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
            >
              <Undo2 size={24} />
            </button>
            <button
              onClick={redo}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
            >
              <Redo2 size={24} />
            </button>
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl font-bold mb-2">Toolbox</h2>
              <Droppable droppableId="toolbox" isDropDisabled={false}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-wrap bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[100px]"
                  >
                    {toolboxComponents.map((component, index) => (
                      <DraggableComponent key={component} id={component} index={index}>
                        <div
                          className={`w-12 h-12 ${
                            usedComponents.has(component) ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-500 dark:bg-blue-600"
                          } text-white font-bold flex items-center justify-center rounded-md m-1 ${
                            usedComponents.has(component) ? "cursor-not-allowed" : "cursor-move"
                          } transition-colors duration-200`}
                        >
                          {component}
                        </div>
                      </DraggableComponent>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">Your Custom Calculator</h2>
              <Calculator />
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}

export default App

