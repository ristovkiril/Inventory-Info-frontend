import * as actionTYPE from '../actions'
import service from "../../axios/axios-repository";

export const setAnalysis = (analysis) => {
    return {
        type: actionTYPE.SET_ANALYSIS,
        analysis: analysis
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

