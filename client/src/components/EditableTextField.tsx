import React from "react"
import { useAppContext } from "../hooks/useAppContext"
import { useTodoContext } from "../hooks/useTodoContext"
import { Todo } from "../types/Todo"

interface Props {
  keyName: string
  inputType?: string
}

export const EditableTextField = ({ keyName, inputType = "text" }: Props) => {
  const {
    state: { currentTodo },
    actions: { setCurrentTodo }
  } = useTodoContext()

  const {
    state: { editMode }
  } = useAppContext()

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setCurrentTodo(prev => {
      if (prev) return { ...prev, [name]: value }
    })
  }

  return (
    <>
      {!editMode ? (
        <div
          className="todo-details--editable-content"
          dangerouslySetInnerHTML={{
            __html: `${currentTodo && currentTodo[keyName as keyof Todo]}`
          }}
        />
      ) : (
        <CustomField
          inputType={inputType}
          className="todo-details--editable-content__input"
          value={currentTodo && currentTodo[keyName as keyof Todo]}
          name={keyName}
          onChange={handleInputChange}
        />
      )}
    </>
  )
}

const CustomField = ({ inputType = "", ...props }): React.ReactElement => {
  if (inputType === "textarea") {
    return <textarea {...props} />
  }

  return <input type={inputType} {...props} />
}
