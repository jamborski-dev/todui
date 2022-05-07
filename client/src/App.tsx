import { AppGrid, TopBar } from "./components/AppGrid"
import { Aside } from "./components/Aside"
import { TodoList } from "./components/TodoList"
import { TodoDetails } from "./components/TodoDetails"

const App = () => {
  return (
    <AppGrid>
      <Aside />
      <TopBar>topbar</TopBar>
      <TodoList />
      <TodoDetails />
    </AppGrid>
  )
}

export default App
