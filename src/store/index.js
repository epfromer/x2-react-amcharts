/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
export {
  clearSearch,
  setReduxState,
  saveAppSettings,
  fetchEmailSentIfNeeded,
  fetchWordCloudIfNeeded,
  fetchContactsIfNeeded,
} from './actions'
export {
  getEmailById,
  getNextEmail,
  getPreviousEmail,
  getEmailIndex,
} from './selectors'

const initialState = {
  // search results
  emails: [],
  totalEmails: 0,

  // email list
  emailListPage: 0,
  emailListItemsPerPage: 5,

  // query
  querySort: 'sent',
  queryOrder: 1,
  sent: '',
  timeSpan: 0,
  from: '',
  to: '',
  subject: '',
  allText: '',
  body: '',

  // stats
  emailSentLoading: false,
  emailSent: null,
  wordCloudLoading: false,
  wordCloud: null,
  contactsLoading: false,
  contacts: null,

  // app settings
  densePadding: localStorage.getItem('densePadding') === 'false' ? false : true,
  darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
  themePrimaryColor: localStorage.getItem('themePrimaryColor')
    ? localStorage.getItem('themePrimaryColor')
    : '#2196f3',
  themeSecondaryColor: localStorage.getItem('themeSecondaryColor')
    ? localStorage.getItem('themeSecondaryColor')
    : '#f50057',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'setReduxState': {
      const s = _.cloneDeep(state)
      if (action.key === 'emails') {
        s.emails = _.cloneDeep(action.value)
      } else if (action.key === 'contacts') {
        s.contacts = _.cloneDeep(action.value)
        s.contacts.sort((a, b) => {
          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()
          if (aName < bName) return -1
          else if (aName < bName) return 1
          else return 0
        })
      } else {
        s[action.key] = action.value
      }
      return s
    }
    case 'saveAppSettings': {
      const s = _.cloneDeep(state)
      localStorage.setItem('densePadding', state.densePadding)
      localStorage.setItem('darkMode', state.darkMode)
      localStorage.setItem('themePrimaryColor', state.themePrimaryColor)
      localStorage.setItem('themeSecondaryColor', state.themeSecondaryColor)
      return s
    }
    case 'clearSearch': {
      const s = _.cloneDeep(state)
      s.sent = ''
      s.timeSpan = 0
      s.from = ''
      s.to = ''
      s.subject = ''
      s.allText = ''
      s.body = ''
      return s
    }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware))
