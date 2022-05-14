import { FC } from "react"
import { useTodoContext } from "../hooks/useTodoContext"
import { TodoDetails } from "./TodoDetails"
import { TodoDetailsDefault } from "./TodoDetailsDefault"

export const TodoDetailsContainer: FC = () => {
  const {
    state: { currentTodo }
  } = useTodoContext()

  if (currentTodo) return <TodoDetails todo={currentTodo} />

  return <TodoDetailsDefault />
}
