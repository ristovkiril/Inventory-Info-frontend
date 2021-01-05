import * as actionTYPE from '../actions'

const initialState ={
    analysis: [], // site mozni trojki okolu 20000
    selected: []  // selektiranite so trebat za u tabelata
};

export default (state = initialState, action) => {
    if (action.type === actionTYPE.SET_ANALYSIS) {
        return {
            analysis: action.analysis,
        }
    }

    if (action.type === actionTYPE.INIT_SELECTED){
        return {
            selected: action.selected
        }
    }
    return state
};