export interface Todo {
  _id: string
  title: string
  notes: string
  is_done: boolean
  is_important: boolean
  reminder: string
  category: string
  attachments: string[]
  step_list: string[]
}

// TODO: use step_list as object with ID so this can be updated as state
// atm this causes ts issues when trying to display in EditableTextField
