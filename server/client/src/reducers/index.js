import {combineReducers} from 'redux'
import authReducers from './authReducer'
import {reducer as reduxForm} from 'redux-form'
import surveyReducers from './surveyReducers'

export default combineReducers({
    auth : authReducers,
    surveys: surveyReducers,
    form : reduxForm 
})