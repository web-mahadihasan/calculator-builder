import { create } from "zustand"

const useStore = create((set) => ({
  components: [],
  usedComponents: new Set(),
  history: [],
  historyIndex: -1,
  addComponent: (component, index) => {
    set((state) => {
      const newComponents = [...state.components]
      if (index !== undefined) {
        newComponents.splice(index, 0, component)
      } else {
        newComponents.push(component)
      }
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(newComponents)
      return {
        components: newComponents,
        usedComponents: new Set(state.usedComponents).add(component.value),
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  },
  removeComponent: (id) => {
    set((state) => {
      const componentToRemove = state.components.find((c) => c.id === id)
      const newComponents = state.components.filter((c) => c.id !== id)
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(newComponents)
      return {
        components: newComponents,
        usedComponents: new Set([...state.usedComponents].filter((c) => c !== componentToRemove.value)),
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  },
  updateComponents: (newComponents) => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(newComponents)
      return {
        components: newComponents,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  },
  clearComponents: () => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push([])
      return {
        components: [],
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  },
  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1
        return {
          components: state.history[newIndex],
          historyIndex: newIndex,
          usedComponents: new Set(state.history[newIndex].map((c) => c.value)),
        }
      }
      return state
    })
  },
  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1
        return {
          components: state.history[newIndex],
          historyIndex: newIndex,
          usedComponents: new Set(state.history[newIndex].map((c) => c.value)),
        }
      }
      return state
    })
  },
}))

export default useStore

