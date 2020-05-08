export const NAVCURRENT = 'NAVCURRENT'

export function navCurrent(current) {
    return { type: NAVCURRENT, current }
}

export const SETTINGDIALOG = 'SETTINGDIALOG'

export function settingDialog(dialog) {
    return { type: SETTINGDIALOG, dialog }
}

export const CREATEMODAL = 'CREATEMODAL'

export function createModal(cModal) {
    return { type: CREATEMODAL, cModal: cModal }
}

export const UPDATEMODAL = 'UPDATEMODAL'

export function updateModal(upModal) {
    return { type: UPDATEMODAL, upModal: upModal }
}

export const REPDIALOG = 'REPDIALOG'

export function repDialog(repdialog) {
    return { type: REPDIALOG, repdialog }
}

export const CAMDIALOG = 'CAMDIALOG'

export function camDialog(camdialog) {
    return { type: CAMDIALOG, camdialog }
}

export const SURDIALOG = 'SURDIALOG'

export function surDialog(surdialog) {
    return { type: SURDIALOG, surdialog }
}