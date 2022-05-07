import React, { createContext, useState, useEffect } from "react"
import { formatDate } from "../utils/helpers"
import { useAppContext } from "../hooks/useAppContext"

// types
import { Todo } from "../types/Todo"
import { IContext, ContextChildren } from "./appContext.types"

export const TodoContext = createContext<IContext>({
  state: {
    todos: [],
    filtered: [],
    currentTodo: undefined,
    currentFilter: ""
  },
  actions: {
    setTodos: () => {},
    setCurrentTodo: () => {},
    toggleTodo: () => {},
    markImportant: () => {},
    markDone: () => {},
    markAllImportant: () => {},
    markAllDone: () => {},
    addTodo: () => {},
    saveTodo: () => {},
    removeTodo: () => {},
    setFiltered: () => {},
    applyFilter: () => {},
    toggleFilter: () => {}
  }
})

export const TodoProvider = ({ children }: ContextChildren): React.ReactNode => {
  const {
    actions: { setEditMode }
  } = useAppContext()

  const [todos, setTodos] = useState<Todo[] | []>([])
  const [filtered, setFiltered] = useState<Todo[] | []>([])

  const [currentTodo, setCurrentTodo] = useState<Todo>()
  const [currentFilter, setFilter] = useState("")
  // const [edited, setEdited] = useState(undefined)

  const fetchTodos = async () => {
    fetch("/api/todos", { method: "GET" })
      .then(res => {
        if (!res.ok) throw new Error("There was an error")

        return res.json()
      })
      .then(data => {
        setTodos(data)
      })
      .catch(err => console.error(err))
  }

  const toggleTodo = (id: string) => setCurrentTodo(todos.find(todo => todo._id === id))

  const addTodo = () => {
    const newTodo = {
      title: `Untitled todo`,
      isDone: false,
      isImportant: false,
      notes: "",
      reminder: null,
      stepList: []
    }

    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => {
        if (!res.ok) throw new Error(`There was en error: ${res.status} / ${res.statusText}`)
        return res.json()
      })
      .then(data => {
        const newList = [...todos, { ...data }]
        setTodos(newList)
        setCurrentTodo(data)
      })
      .then(() => {
        setEditMode(true)
      })
      .catch(err => console.error(err))
  }

  const saveTodo = () => {
    if (typeof currentTodo === "object") {
      const { _id } = currentTodo
      setTodos(todos => todos.map(item => (item._id === _id ? { ...currentTodo } : item)))
      fetch(`/api/todos/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(currentTodo)
      })
        .then(res => {
          if (!res.ok) throw new Error(`There was en error: ${res.status} / ${res.statusText}`)
          return res.json()
        })
        .then(json => {
          setTodos(todos =>
            todos.map(item =>
              item._id === json._id ? { ...item, updatedAt: json.updatedAt } : item
            )
          )
          setEditMode(false)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  const removeTodo = (id: string) => {
    fetch(`/api/todos/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
      })
      .then(res => {
        console.log(res)
        setCurrentTodo(undefined)
        fetchTodos()
        setEditMode(false)
      })
      .catch(err => {
        console.error(`There was deletion error`, err)
      })
  }

  const toggleFilter = (filterValue: string) => setFilter(filterValue)

  const applyFilter = (allTodos = todos) => {
    if (currentFilter === "") {
      setFiltered(allTodos)
      return
    }

    if (currentFilter === "done") {
      setFiltered(allTodos.filter(todo => todo.is_done === true))
      return
    }

    if (currentFilter === "today") {
      setFiltered(
        allTodos.filter(
          todo => formatDate.getDate(todo.reminder) === formatDate.getDate(`${Date.now()}`)
        )
      )
      return
    }

    if (currentFilter === "important") {
      setFiltered(allTodos.filter(todo => todo.is_important === true))
      return
    }

    if (currentFilter === "scheduled") {
      setFiltered(allTodos.filter(todo => todo.reminder !== null))
      return
    }

    if (
      currentFilter === "design" ||
      currentFilter === "marketing" ||
      currentFilter === "development"
    ) {
      setFiltered(allTodos.filter(todo => todo.category === currentFilter))
      return
    }
  }

  const markDone = (id: string) => {
    setTodos(todos =>
      todos.map(todo => (todo._id === id ? { ...todo, is_done: !todo.is_done } : todo))
    )
    if (currentTodo && id === currentTodo._id) {
      setCurrentTodo(prev => {
        if (prev) return { ...prev, is_done: !prev.is_done }
      })
    }
  }

  const markImportant = (id: string) => {
    setTodos(todos =>
      todos.map(todo => (todo._id === id ? { ...todo, is_important: !todo.is_important } : todo))
    )

    if (currentTodo && id === currentTodo._id) {
      setCurrentTodo(prev => {
        if (prev) return { ...prev, is_important: !prev.is_important }
      })
    }

    setFiltered(todos =>
      todos.map(todo => (todo._id === id ? { ...todo, is_important: !todo.is_important } : todo))
    )
  }

  const markAllDone = () => {
    const ids: string[] = []
    setFiltered(todos =>
      todos.map(todo => {
        let updatedTodo
        if (!todo.is_done) {
          updatedTodo = { ...todo, is_done: true }
          ids.push(todo._id)
          return updatedTodo
        }
        return todo
      })
    )

    ids.forEach(id => {
      setTodos(todos => todos.map(todo => (todo._id === id ? { ...todo, is_done: true } : todo)))
    })
  }

  const markAllImportant = () => {
    const ids: string[] = []
    setFiltered(todos =>
      todos.map(todo => {
        let updatedTodo
        if (!todo.is_important) {
          updatedTodo = { ...todo, is_important: true }
          ids.push(todo._id)
          return updatedTodo
        }
        return todo
      })
    )

    ids.forEach(id => {
      setTodos(todos =>
        todos.map(todo => (todo._id === id ? { ...todo, is_important: true } : todo))
      )
    })
  }

  useEffect(() => {
    applyFilter()
  }, [currentFilter])

  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    if (!filtered.length) setFiltered(todos)

    // re-apply current filter after deletion
    applyFilter()
  }, [todos.length])

  const contextObject: IContext = {
    state: {
      todos,
      currentTodo,
      filtered,
      currentFilter
    },
    actions: {
      setTodos,
      setCurrentTodo,
      toggleTodo,
      markImportant,
      markDone,
      addTodo,
      removeTodo,
      setFiltered,
      applyFilter,
      toggleFilter,
      markAllDone,
      markAllImportant,
      saveTodo
    }
  }

  return <TodoContext.Provider value={contextObject}>{children}</TodoContext.Provider>
}
