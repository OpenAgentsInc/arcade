import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function formatCreatedAt(time: number) {
  let formatedTime

  const now = dayjs()
  const inputTime = dayjs.unix(time)
  const diff = now.diff(inputTime, "hour")

  if (diff < 12) {
    formatedTime = inputTime.format("HH:mm A")
  } else {
    formatedTime = inputTime.format("MMM DD")
  }

  return formatedTime
}
