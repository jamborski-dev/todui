export const getConfig = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

export const handleResponse = (response: Response) => {
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

export const handleFetchError = (error: Error) => {
  console.error(error)
}
