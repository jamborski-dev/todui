import { AppGrid } from "./components/AppGrid"
import { Topbar } from "./components/Topbar"
import { Aside } from "./components/Aside"
import { TodoList } from "./components/TodoList"
import { TodoDetailsContainer } from "./components/TodoDetailsContainer"

const App = () => {
  return (
    <AppGrid>
      <Aside />
      <Topbar />
      <TodoList />
      <TodoDetailsContainer />
    </AppGrid>
  )
}

export default App
