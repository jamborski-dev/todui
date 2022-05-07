import React from "react"
import { Grid3x3Gap, CalendarDate, Alarm, ListCheck, Star } from "react-bootstrap-icons"

export const menuItemsPrimary = [
  { name: "Overview", icon: <Grid3x3Gap />, filter: "", howMany: 0, color: "" },
  { name: "Today", icon: <CalendarDate />, filter: "today", howMany: 0, color: "" },
  { name: "Done", icon: <ListCheck />, filter: "done", howMany: 0, color: "" },
  { name: "Important", icon: <Star />, filter: "important", howMany: 3, color: "" },
  { name: "Scheduled", icon: <Alarm />, filter: "scheduled", howMany: 9, color: "" }
]

export const menuItemsSecondary = [
  { name: "Design", icon: null, filter: "design", howMany: 21, color: "blue" },
  { name: "Marketing", icon: null, filter: "marketing", howMany: 8, color: "orange" },
  { name: "Development", icon: null, filter: "development", howMany: 37, color: "salmon" }
]

export const todos = [
  {
    id: 1,
    title: "Calendar component iteration",
    is_important: true,
    is_done: false,
    notes: `<p>
      Few would argue that, despite the advancement of feminism over the
      past three decades, women still face a double standard when it
      comes to their behaviour.
    </p>
    <p>
      While men's bodreline-inappropriate behaviour is often laught off
      as "boys will be boys", women face higher conduct standards -
      especially in the workplace. That's why it's crucial that, as
      women, our behaviour on the job is beyond reproach.
      is_done: false,
    </p>
    <p>Small Towns and Big States</p>`,
    step_list: [],
    attachments: [],
    reminder: "2020-09-28T12:30:00Z",
    created_at: "2020-09-02T16:34:00Z",
    updated_at: "2020-09-02T16:34:00Z",
    category: "marketing"
  },
  {
    id: 2,
    title: "Test heading for new note",
    is_important: false,
    is_done: true,
    notes:
      "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    step_list: [
      {
        id: 1,
        step_content: "some step",
        is_done: false
      },
      {
        id: 2,
        step_content: "some step",
        is_done: false
      },
      {
        id: 3,
        step_content: "some step",
        is_done: false
      }
    ],
    attachments: ["file", "picture"],
    reminder: "2020-12-23T12:30:00Z",
    created_at: "2020-09-02T16:34:00Z",
    updated_at: "2020-09-02T16:34:00Z",
    category: "design"
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    is_important: false,
    is_done: false,
    notes:
      "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    step_list: [
      {
        id: 1,
        step_content: "some step",
        is_done: false
      },
      {
        id: 2,
        step_content: "some step",
        is_done: false
      },
      {
        id: 3,
        step_content: "some step",
        is_done: false
      }
    ],
    attachments: [],
    reminder: null,
    created_at: "2020-09-02T16:34:00Z",
    updated_at: "2020-09-02T16:34:00Z",
    category: "design"
  },
  {
    id: 4,
    title: "Something new",
    is_important: false,
    is_done: false,
    notes:
      "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.",
    step_list: [
      {
        id: 1,
        step_content: "some step",
        is_done: false
      },
      {
        id: 2,
        step_content: "some step",
        is_done: false
      }
    ],
    attachme3ts: ["file", "picture"],
    reminder: "2020-12-23T12:30:00Z",
    created_at: "2020-09-02T16:34:00Z",
    updated_at: "2020-09-02T16:34:00Z",
    category: null
  }
]
