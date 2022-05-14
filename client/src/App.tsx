import { AppGrid, TopBar } from "./components/AppGrid"
import { Aside } from "./components/Aside"
import { TodoList } from "./components/TodoList"
import { TodoDetailsContainer } from "./components/TodoDetailsContainer"

const App = () => {
  return (
    <AppGrid>
      <Aside />
      <TopBar>topbar</TopBar>
      <TodoList />
      <TodoDetailsContainer />
    </AppGrid>
  )
}

export default App
