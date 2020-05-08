import fly from 'flyio'
import { notification } from 'antd'

export const ADD_HOMEDIR = 'ADD_HOMEDIR'

export const addHomeDir = homeDir => ({
    type: ADD_HOMEDIR, homeDir: homeDir
})

export const getHomeDir = token => (dispatch, getState) => {
    fly
        .get('/api/homeDir', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addHomeDir(res.data.homeDir))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_USER = 'ADD_USER'

export const addUser = user => ({
    type: ADD_USER, user: user
})

export const getUser = token => (dispatch, getState) => {
    fly
        .get('/api/user', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addUser(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_CODES = 'ADD_CODES'

export const addCodes = codes => ({
    type: ADD_CODES, codes: codes
})

export const getCodes = token => (dispatch, getState) => {
    fly
        .get('/api/codes', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addCodes(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_USERS = 'ADD_USERS'

export const addUsers = users => ({
    type: ADD_USERS, users: users
})

export const getUsers = token => (dispatch, getState) => {
    fly
        .get('/api/users', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addUsers(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_ACCOUNTS = 'ADD_ACCOUNTS'

export const addAccounts = accounts => ({
    type: ADD_ACCOUNTS, accounts: accounts
})

export const getAccounts = token => (dispatch, getState) => {
    fly
        .get('/api/accounts', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addAccounts(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_ALLCODES = 'ADD_ALLCODES'

export const addAllCodes = allCodes => ({
    type: ADD_ALLCODES, allCodes: allCodes
})

export const getAllCodes = token => (dispatch, getState) => {
    fly
        .get('/api/allCodes', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addAllCodes(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const UNUSECODES = 'UNUSECODES'

export const addUnUseCodes = unUseCodes => ({
    type: UNUSECODES, unUseCodes: unUseCodes
})

export const getUnUseCodes = token => (dispatch, getState) => {
    fly
        .get('/api/unUseCodes', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addUnUseCodes(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_STREAMS = 'ADD_STREAMS'

export const addStreams = streams => ({
    type: ADD_STREAMS, streams: streams
})

export const getStreams = token => (dispatch, getState) => {
    fly
        .get('/api/streams', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addStreams(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_FILELIST = 'ADD_FILELIST'

export const addFileList = fileList => ({
    type: ADD_FILELIST, fileList: fileList
})

export const getFileList = token => (dispatch, getState) => {
    fly
        .get('/api/fileList', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addFileList(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}

export const ADD_UPLOADFILES = 'ADD_UPLOADFILES'

export const addUploadFiles = uploadFiles => ({
    type: ADD_UPLOADFILES, uploadFiles: uploadFiles
})

export const getUploadFiles = token => (dispatch, getState) => {
    fly
        .get('/api/uploadFiles', {}, { headers: { 'authorization': `Bearer ${token}` } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addUploadFiles(res.data.cb))
            } else {
                notification.error({
                    message: '账号不存在',
                    description: '',
                    duration: 2
                })
                localStorage.removeItem('token')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        })
        .catch(() => {
            notification.error({
                message: 'Error',
                description: 'Server Error',
                duration: 2
            })
        })
}