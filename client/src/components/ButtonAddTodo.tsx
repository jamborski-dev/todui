import { Plus } from "react-bootstrap-icons"
import { useTodoContext } from "../hooks/useTodoContext"

export const ButtonAddTodo = ({ ...props }) => {
  const {
    actions: { addTodo }
  } = useTodoContext()

  return (
    <button className="btn--add-todo" onClick={() => addTodo()} {...props}>
      <Plus />
    </button>
  )
}
