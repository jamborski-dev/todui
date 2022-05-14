import React from "react"
import ReactDOM from "react-dom/client"
import "./assets/scss/app.scss"
import App from "./App"
import { TodoProvider } from "./context/todoContext"
import { AppProvider } from "./context/appContext"
import { ModalProvider } from "./context/modalContext"
import { CategoryProvider } from "./context/categoryContext"

const root = ReactDOM.createRoot(document.getElementById("app-root"))
root.render(
  <React.StrictMode>
    <AppProvider>
      <ModalProvider>
        <CategoryProvider>
          <TodoProvider>
            <App />
          </TodoProvider>
        </CategoryProvider>
      </ModalProvider>
    </AppProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
