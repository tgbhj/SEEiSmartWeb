import { ADD_USER, ADD_CODES, ADD_USERS, ADD_ACCOUNTS, ADD_ALLCODES, UNUSECODES, ADD_STREAMS, ADD_FILELIST, ADD_HOMEDIR, ADD_UPLOADFILES } from '../actions/user'

const initialState = {
    token: localStorage.getItem('token'),
    user: {},
    codes: [],
    users: [],
    accounts: [],
    allCodes: [],
    unUseCodes: [],
    streams: [],
    fileList: [],
    homeDir: '',
    uploadFiles: []
}

export function userTodo(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return { ...state, user: action.user }
        case ADD_CODES:
            return { ...state, codes: action.codes }
        case ADD_STREAMS:
            return { ...state, streams: action.streams }
        case ADD_USERS:
            return { ...state, users: action.users }
        case ADD_ACCOUNTS:
            return { ...state, accounts: action.accounts }
        case ADD_ALLCODES:
            return { ...state, allCodes: action.allCodes }
        case UNUSECODES:
            return { ...state, unUseCodes: action.unUseCodes }
        case ADD_FILELIST:
            return { ...state, fileList: action.fileList }
        case ADD_HOMEDIR:
            return { ...state, homeDir: action.homeDir }
        case ADD_UPLOADFILES:
            return { ...state, uploadFiles: action.uploadFiles }
        default:
            return state
    }
}