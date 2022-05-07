import { WEEKDAY, MONTH } from "./constants"

export const formatDate = {
  getDate: (dateString: string) => {
    let date = new Date(dateString)
    return `${WEEKDAY[date.getUTCDay()]}, ${date.getUTCDate()} ${MONTH[date.getUTCMonth()]}`
  },

  getUKTime: (dateString: string) => {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const timeUK =
      hours > 12
        ? `${hours - 12}:${minutes}pm`
        : `${hours}:${minutes > 9 ? minutes : `0${minutes}`}am`

    return timeUK
  }
}
