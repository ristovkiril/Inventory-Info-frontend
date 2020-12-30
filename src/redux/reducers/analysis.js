import * as actionTYPE from '../actions'

const initialState ={
    analysis: []
};

export default (state = initialState, action) => {
    if (action.type === actionTYPE.SET_ANALYSIS) {
        return {
            analysis: action.analysis,
        }
    }
    return state
};