import React, { useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Undo2, Redo2, Trash2, X } from "lucide-react"
import useStore from "../store"
import DraggableComponent from "../components/DraggableComponent"
import Calculator from "../components/Calculator"
import Footer from "../components/Footer"

const CalculatorPage = () => {
  const components = useStore((state) => state.components)
  const usedComponents = useStore((state) => state.usedComponents)
  const addComponent = useStore((state) => state.addComponent)
  const removeComponent = useStore((state) => state.removeComponent)
  const updateComponents = useStore((state) => state.updateComponents)
  const undo = useStore((state) => state.undo)
  const redo = useStore((state) => state.redo)
  const clearComponents = useStore((state) => state.clearComponents)

  const [selectedComponent, setSelectedComponent] = React.useState(null)

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
        const newComponents = [...components]
        newComponents.splice(result.destination.index, 0, newComponent)
        updateComponents(newComponents)
        useStore.setState((state) => ({
          usedComponents: new Set(state.usedComponents).add(result.draggableId),
        }))
      }
    } else if (result.source.droppableId === "calculator" && result.destination.droppableId === "calculator") {
      const items = Array.from(components)
      const [reorderedItem] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderedItem)
      updateComponents(items)
    }
  }


  const handleDelete = () => {
    if (selectedComponent) {
      const componentToRemove = components.find((c) => c.id === selectedComponent)
      removeComponent(selectedComponent)
      useStore.setState((state) => ({
        usedComponents: new Set([...state.usedComponents].filter((c) => c !== componentToRemove.value)),
      }))
      setSelectedComponent(null)
    }
  }

  const handleClear = () => {
    clearComponents()
    useStore.setState({ usedComponents: new Set() })
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
    <div className={`min-h-[calc(100vh-64px)] flex flex-col`}>
      <div className="flex-grow flex items-center justify-center">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4 sm:mb-0">
              Build Your Dream Calculator
            </h1>
            <div className="flex space-x-2">
              
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
              <button
                onClick={handleClear}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
              >
                <X size={24} />
              </button>
              {selectedComponent && (
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-md bg-red-500 text-white transition-colors duration-200"
                >
                  <Trash2 size={24} />
                </button>
              )}
            </div>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-4 justify-between mt-14">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-2xl font-bold mb-2">Toolbox</h2>
                <Droppable droppableId="toolbox" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg gap-2"
                    >
                      {toolboxComponents.map((component, index) => (
                        <DraggableComponent key={component} id={component} index={index}>
                          <div
                            className={`w-full h-12 ${
                              usedComponents.has(component)
                                ? "bg-gray-400 dark:bg-gray-600"
                                : "bg-blue-500 dark:bg-blue-600"
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
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">Calculator</h2>
                <Calculator />
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
      <footer className="mt-3">
            <Footer/>
        </footer>
    </div>
  )
}

export default CalculatorPage

