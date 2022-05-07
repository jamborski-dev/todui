const express = require("express")
const Todo = require("../models/Todo") // new
const router = express.Router()

router.get("/todos", async (req, res) => {
  try {
    const data = await Todo.find()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(404).json({ type: "Error", message: "Could not retrieve data of server" })
  }
})

router.post("/todos", async (req, res) => {
  if (!req.body) return res.status(204).end()

  const { title, isDone, isImportant, notes, reminder, stepList } = req.body
  const newTodo = new Todo({
    title: title,
    is_done: isDone,
    is_important: isImportant,
    notes: notes,
    reminder: reminder,
    step_list: stepList
  })

  try {
    const data = await newTodo.save()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.statusMessage = "Invalid data"
    res.status(500).end()
  }
})

router.patch("/todos/:id", async (req, res) => {
  const { id } = req.params
  const { body } = req
  let todo
  try {
    todo = await Todo.findOne({ _id: id })
  } catch (err) {
    console.error(err)
    res.status(404).json({ type: "Error", message: "Could not retrieve document with given id" })
  }

  if (body.title) todo.title = body.title
  if (body.isDone) todo.is_done = body.isDone
  if (body.isImportant) todo.is_important = body.isImportant
  if (body.notes) todo.notes = body.notes
  if (body.reminder) todo.reminder = body.reminder
  if (body.stepList) todo.step_list = body.stepList

  try {
    let saved = await todo.save()
    res.json(saved)
  } catch (err) {
    console.error(err)
    res.status(500).json({ type: "Error", message: "Could not retrieve document with given id" })
  }
})

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params
  try {
    const todo = await Todo.deleteOne({ _id: id })
    res.json(todo)
  } catch (err) {
    console.error(err)
    res.status(404).json({ type: "Error", message: "Todo with given id does not exists" })
  }
})

module.exports = router
