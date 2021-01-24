export const DAY_CATEGORIES = [
  'когда-нибудь',
  'просрочено',
  'сегодня',
  'завтра',
  'на этой неделе',
  'на следующей неделе',
  'потом'
]

export const SETUP_CATEGORIES = [
  'когда-нибудь',
  'сегодня',
  'завтра',
  'на этой неделе',
  'на следующей неделе',
  'установить дату'
]

function getDates() {
  let d = new Date()

  let today = new Date()

  let tomorow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)

  let dayAfterTomorrow = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + 2
  ).getTime()

  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)) // эта хуерга устанавливает понедельник этой недели. Не рефлексируй, сам в шоке
  let nextMonday = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + 7
  ).getTime()

  let afterNextMonday = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate() + 14
  ).getTime()

  return {
    today: formatDate(today),
    tomorow: formatDate(tomorow),
    dayAfterTomorrow: formatDate(dayAfterTomorrow),
    nextMonday: formatDate(nextMonday),
    afterNextMonday: formatDate(afterNextMonday)
  }
}

function formatDate(date) {
  return new Date(date).toISOString().substring(0, 10)
}

export function dateToDayCategory(date) {
  if (date === null) return DAY_CATEGORIES[0]

  let dates = getDates()
  if (date <= dates.today) return DAY_CATEGORIES[1]
  if (date <= dates.tomorow && date > dates.today) return DAY_CATEGORIES[2]
  if (date <= dates.dayAfterTomorrow && date > dates.tomorow)
    return DAY_CATEGORIES[3]
  if (date <= dates.nextMonday && date > dates.dayAfterTomorrow)
    return DAY_CATEGORIES[4]
  if (date <= dates.afterNextMonday && date > dates.nextMonday)
    return DAY_CATEGORIES[5]
  if (date >= dates.afterNextMonday) return DAY_CATEGORIES[6]
}

export function dayCategoryToDate(dayCategory) {
  let dates = getDates()
  switch (dayCategory) {
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
