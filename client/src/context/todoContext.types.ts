import { Dispatch, SetStateAction } from "react"
import { Todo } from "../types/Todo"

interface IContextState {
  todos: Todo[]
  filtered: Todo[]
  currentTodo: Todo | undefined
  currentFilter: string
}

interface IContextActions {
  setTodos: Dispatch<SetStateAction<Todo[] | []>>
  setCurrentTodo: Dispatch<SetStateAction<Todo | undefined>>
  toggleTodo: (id: string) => void
  markImportant: (id: string) => void
  markDone: (id: string) => void
  markAllImportant: () => void
  markAllDone: () => void
  addTodo: () => void
  saveTodo: () => void
  removeTodo: (id: string) => void
  setFiltered: Dispatch<SetStateAction<Todo[] | []>>
  applyFilter: () => void
  toggleFilter: (filterValue: string) => void
}

export interface IContext {
  state: IContextState
  actions: IContextActions
}

export type ContextChildren = {
  children?: React.ReactNode
}
