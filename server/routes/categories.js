// @ts-check

const express = require("express")
const Category = require("../models/Category")
const router = express.Router()

router.get("/category", async (req, res) => {
  try {
    const data = await Category.find().populate("count")
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(404).json({ type: "Error", message: "Could not retrieve data of server" })
  }
})

router.post("/category", async (req, res) => {
  if (!req.body) return res.status(204).end()

  const { label, color } = req.body
  const newCategory = new Category({
    label,
    color
  })

  try {
    const data = await newCategory.save()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.statusMessage = "Invalid data"
    res.status(500).end()
  }
})

router.patch("/category/:id", async (req, res) => {
  const { id } = req.params
  const { body } = req
  let category
  try {
    category = await Category.findOne({ _id: id })
  } catch (err) {
    console.error(err)
    res.status(404).json({ type: "Error", message: "Could not retrieve document with given id" })
  }

  if (body.label) category.label = body.label.toLowerCase()
  if (body.color) category.color = body.color

  try {
    let saved = await category.save()
    res.json(saved)
  } catch (err) {
    console.error(err)
    res.status(500).json({ type: "Error", message: "Updating this document failed." })
  }
})

router.delete("/category/:id", async (req, res) => {
  const { id } = req.params
  try {
    const category = await Category.deleteOne({ _id: id })
    res.json(category)
  } catch (err) {
    console.error(err)
    res.status(404).json({ type: "Error", message: "Category with given id does not exists" })
  }
})

module.exports = router
