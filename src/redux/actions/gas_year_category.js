import * as actionTYPE from '../actions'
import service from "../../axios/axios-repository";

export const setAnalysis = (analysis) => {
    return {
        type: actionTYPE.SET_ANALYSIS,
        analysis: analysis
    }
};

export const setSelected = (analysis) => {
    return {
        type: actionTYPE.INIT_SELECTED,
        selected: analysis
    }
};



//async
export const loadAnalysis = () => {
    return (dispatch) => {
        service.getAnalysis().then(response => {
            dispatch(setAnalysis(response.data));
        })
    }

};

export const loadSelected = (gasses, categories, analysis) => {
    return (dispatch) => {
        service.getAllByIds(gasses, categories, analysis).then(response => {
            dispatch(setSelected(response.data));
        })
    }

};

