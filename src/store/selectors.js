// selectors, aka getters
export const getEmailById = (state, id) =>
  state.emails.find((e) => e._id === id)
export const getNextEmail = (state, id) => {
  if (!state.emails || !state.emails.length) return undefined
  const i = state.emails.findIndex((e) => e._id === id)
  return i < state.emails.length - 1 ? state.emails[i + 1] : undefined
}
export const getPreviousEmail = (state, id) => {
  if (!state.emails || !state.emails.length) return undefined
  const i = state.emails.findIndex((e) => e._id === id)
  return i > 0 ? state.emails[i - 1] : undefined
}
export const getEmailIndex = (state, id) =>
  state.emails.findIndex((e) => e._id === id) + 1
