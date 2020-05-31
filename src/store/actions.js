// actions, aka mutations

// set any redux state element
export const setReduxState = (k, v) => ({
  type: 'setReduxState',
  key: k,
  value: v,
})

// clear search
export const clearSearch = () => ({ type: 'clearSearch' })

// save app settings
export const saveAppSettings = () => ({ type: 'saveAppSettings' })

// fetch a collection
function doFetch(loadingIndicator, statType, stateVal) {
  return (dispatch) => {
    dispatch(setReduxState(loadingIndicator, true))
    const url = `${process.env.REACT_APP_EMAIL_SERVER}/${statType}`
    console.log(url)
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => dispatch(setReduxState(stateVal, json)))
      .then(() => dispatch(setReduxState(loadingIndicator, false)))
      .catch(() => {}) // TODO: handle errors
    // .then(() => console.log('fetch complete'))
  }
}
function fetchIfNeeded(fCheckIfNeeded, loadingIndicator, statType, stateVal) {
  return (dispatch, getState) => {
    if (fCheckIfNeeded(getState())) {
      // dispatch a thunk from thunk
      return dispatch(doFetch(loadingIndicator, statType, stateVal))
    } else {
      // let calling code know nothing to wait for
      return Promise.resolve()
    }
  }
}

// email sent
export function fetchEmailSentIfNeeded(invalidateCache) {
  return fetchIfNeeded(
    invalidateCache
      ? () => true
      : (state) => !state.emailSent && !state.emailSentLoading,
    'emailSentLoading',
    'emailsent',
    'emailSent'
  )
}

// word cloud
export function fetchWordCloudIfNeeded(invalidateCache) {
  return fetchIfNeeded(
    invalidateCache
      ? () => true
      : (state) => !state.wordCloud && !state.wordCloudLoading,
    'wordCloudLoading',
    'wordcloud',
    'wordCloud'
  )
}

// contacts
export function fetchContactsIfNeeded(invalidateCache) {
  return fetchIfNeeded(
    invalidateCache
      ? () => true
      : (state) => !state.contacts && !state.contactsLoading,
    'contactsLoading',
    'contacts',
    'contacts'
  )
}
