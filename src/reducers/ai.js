import { REPOSITORY, CAMERA, SURVEILLANCE, REALTIME, ALERT, SESSION_ID } from '../actions/ai'

const initialState = {
    repository: [],
    camera: [],
    surveillance: [],
    realtime: [],
    alert: [],
    session_id: ''
}

export function aiTodo(state = initialState, action) {
    switch (action.type) {
        case REPOSITORY:
            return { ...state, repository: action.repository }
        case CAMERA:
            return { ...state, camera: action.camera }
        case SURVEILLANCE:
            return { ...state, surveillance: action.surveillance }
        case REALTIME:
            return { ...state, realtime: action.realtime }
        case ALERT:
            return { ...state, alert: action.alert }
        case SESSION_ID:
            return { ...state, session_id: action.session_id }
        default:
            return state
    }
}