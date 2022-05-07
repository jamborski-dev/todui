require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const todoRoutes = require("./routes/todos")

mongoose
  .connect(process.env.MONGO_CONN_URI)
  .then(() => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(morgan("dev"))
    app.use("/api", todoRoutes)

    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch(err => {
    console.error(err)
  })
