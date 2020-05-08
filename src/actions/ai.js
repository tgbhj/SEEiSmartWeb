import fly from 'flyio'
import { notification } from 'antd'

export const REPOSITORY = 'REPOSITORY'

export function addRepository(repository) {
    return { type: REPOSITORY, repository }
}

export const getRepository = data => (dispatch, getState) => {
    fly
        .get('/api/repository', {}, { headers: { 'authorization': `Bearer ${data.token}`, 'session_id': data.session_id } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addRepository(res.data.cb))
            } else {
                notification.error({
                    message: res.data.err,
                    description: '',
                    duration: 2
                })
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

export const CAMERA = 'CAMERA'

export function addCamera(camera) {
    return { type: CAMERA, camera }
}

export const getCamera = data => (dispatch, getState) => {
    fly
        .get('/api/camera', {}, { headers: { 'authorization': `Bearer ${data.token}`, 'session_id': data.session_id } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addCamera(res.data.cb))
            } else {
                notification.error({
                    message: res.data.err,
                    description: '',
                    duration: 2
                })
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

export const SURVEILLANCE = 'SURVEILLANCE'

export function addSurve(surveillance) {
    return { type: SURVEILLANCE, surveillance }
}

export const getSurve = data => (dispatch, getState) => {
    fly
        .get('/api/task', {}, { headers: { 'authorization': `Bearer ${data.token}`, 'session_id': data.session_id } })
        .then(res => {
            if (res.data.code === 20000) {
                dispatch(addSurve(res.data.cb))
            } else {
                notification.error({
                    message: res.data.err,
                    description: '',
                    duration: 2
                })
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

export const REALTIME = 'REALTIME'

export function addRealtime(realtime) {
    return { type: REALTIME, realtime }
}

export const getRealtime = data => (dispatch, getState) => {
    fly
        .get('/api/task', {}, { headers: { 'authorization': `Bearer ${data.token}`, 'session_id': data.session_id } })
        .then(res => {
            if (res.data.code === 20000) {
                let ids = []
                for (let i = 0; i < res.data.cb.length; i++) {
                    ids.push(res.data.cb[i].id)
                }
                fly
                    .post('/api/realtime', { surveillance_ids: ids, hit_condition: {}, limit: 100 }, { headers: { 'authorization': `Bearer ${data.token}`, 'session_id': data.session_id } })
                    .then(res => {
                        if (res.data.code === 20000) {
                            dispatch(addRealtime(res.data.cb))
                        } else {
                            notification.error({
                                message: res.data.err,
                                description: '',
                                duration: 2
                            })
                        }
                    })
                    .catch(() => {
                        notification.error({
                            message: 'Error',
                            description: 'Server Error',
                            duration: 2
                        })
                    })
            } else {
                notification.error({
                    message: res.data.err,
                    description: '',
                    duration: 2
                })
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

export const ALERT = 'ALERT'

export function addAlert(alert) {
    return { type: ALERT, alert }
}

export const getAlert = data => (dispatch, getState) => {
    fly
        .get('/api/task', {}, { headers: { 'authorization': `Bearer ${data.token}`, 'session_id': data.session_id } })
        .then(res => {
            if (res.data.code === 20000) {
                let ids = []
                for (let i = 0; i < res.data.cb.length; i++) {
                    ids.push(res.data.cb[i].id)
                }
                fly
                    .post('/api/alert', { surveillance_ids: ids, hit_condition: {}, order: { timestamp: -1 }, start: 0, limit: 100 }, { headers: { 'authorization': 'Bearer ' + data.token, 'session_id': data.session_id } })
                    .then(res => {
                        if (res.data.code === 20000) {
                            dispatch(addAlert(res.data.cb))
                        } else {
                            notification.error({
                                message: res.data.err,
                                description: '',
                                duration: 2
                            })
                        }
                    })
                    .catch(() => {
                        notification.error({
                            message: 'Error',
                            description: 'Server Error',
                            duration: 2
                        })
                    })
            } else {
                notification.error({
                    message: res.data.err,
                    description: '',
                    duration: 2
                })
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

export const SESSION_ID = 'SESSION_ID'

export function sessionId(session_id) {
    return { type: SESSION_ID, session_id }
}