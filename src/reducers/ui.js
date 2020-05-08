import { NAVCURRENT, SETTINGDIALOG, CREATEMODAL, UPDATEMODAL, REPDIALOG, CAMDIALOG, SURDIALOG } from '../actions/ui'

const initialState = {
    current: 'home',
    dialog: false,
    cModal: false,
    upModal: false,
    repdialog: false,
    camdialog: false,
    surdialog: false
}

export function uiTodo(state = initialState, action) {
    switch (action.type) {
        case NAVCURRENT:
            return { ...state, current: action.current }
        case SETTINGDIALOG:
            return { ...state, dialog: action.dialog }
        case CREATEMODAL:
            return { ...state, cModal: action.cModal }
        case UPDATEMODAL:
            return { ...state, upModal: action.upModal }
        case REPDIALOG:
            return { ...state, repdialog: action.repdialog }
        case CAMDIALOG:
            return { ...state, camdialog: action.camdialog }
        case SURDIALOG:
            return { ...state, surdialog: action.surdialog }
        default:
            return state
    }
}