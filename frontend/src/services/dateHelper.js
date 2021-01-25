export const DAY_CATEGORIES = [
  'когда-нибудь',
  'просрочено',
  'сегодня',
  'завтра',
  'на этой неделе',
  'на следующей неделе',
  'потом'
]

function getDates() {
  let d = new Date()

  let today = new Date(d.getFullYear(), d.getMonth(), d.getDate())

  let tomorow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)

  let dayAfterTomorrow = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + 2
  )

  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)) // эта хуерга устанавливает понедельник этой недели. Не рефлексируй, сам в шоке
  let nextMonday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)

  let afterNextMonday = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + 14
  )

  return {
    today: today.getTime(),
    tomorow: tomorow.getTime(),
    dayAfterTomorrow: dayAfterTomorrow.getTime(),
    nextMonday: nextMonday.getTime(),
    afterNextMonday: afterNextMonday.getTime()
  }
}

export function dateToDayCategory(date) {
  if (date === null || date === undefined) return DAY_CATEGORIES[0]

  let dates = getDates()
  if (date === dates.today) return DAY_CATEGORIES[1]
  if (date === dates.tomorow) return DAY_CATEGORIES[2]
  if (date === dates.dayAfterTomorrow) return DAY_CATEGORIES[3]
  if (date === dates.nextMonday) return DAY_CATEGORIES[4]
  if (date === dates.afterNextMonday) return DAY_CATEGORIES[5]
  if (date > dates.afterNextMonday) return DAY_CATEGORIES[6]
}

export function filterByCategory(dayCategory, date) {
  let dates = getDates()

  switch (dayCategory) {
    case DAY_CATEGORIES[0]:
      return date === null || date === undefined
    case DAY_CATEGORIES[1]:
      return date < dates.today
    case DAY_CATEGORIES[2]:
      return date === dates.today
    case DAY_CATEGORIES[3]:
      return date === dates.tomorow
    case DAY_CATEGORIES[4]:
      return date < dates.nextMonday
    case DAY_CATEGORIES[5]:
      return date < dates.afterNextMonday && date >= dates.nextMonday
    case DAY_CATEGORIES[6]:
      return date >= dates.afterNextMonday
    default:
      return true
  }
}

export const SETUP_CATEGORIES = [
  'когда-нибудь',
  'сегодня',
  'завтра',
  'на этой неделе',
  'на следующей неделе',
  'установить дату'
]

export function dayCategoryToDate(dateCategory) {
  let dates = getDates()
  switch (dateCategory) {
    case DAY_CATEGORIES[0]:
      return null
    case DAY_CATEGORIES[1]:
      return dates.today
    case DAY_CATEGORIES[2]:
      return dates.tomorow
    case DAY_CATEGORIES[3]:
      return dates.dayAfterTomorrow
    case DAY_CATEGORIES[4]:
      return dates.nextMonday
    case DAY_CATEGORIES[5]:
      return dates.afterNextMonday
    default:
      return null
  }
}
