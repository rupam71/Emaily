import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails'
import FIELDS from './formField';



class SurveyForm extends Component {
    state = {  }

    renderFields() {
        return _.map(FIELDS, field => {
            return (
            <Field 
            key={field.name} 
            component={SurveyField} 
            type='text' 
            label={field.label} 
            name={field.name} 
            />
            )
        })
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to='/surveys' className='btn-flat red white-text'>
                        Cancel
                    </Link>
                    <button type='submit' className='teal btn-flat right white-text'>
                        Next
                        <i className='material-icons right'>done</i>
                    </button>
                </form>
            </div>
         );
    }
}

function validate(values){
    const errors = {}

    // if(! values.title){
    //     errors.title = 'You must provide a title';
    // }
    // if(! values.subject){
    //     errors.subject = 'You must provide a subject';
    // }
    // if(! values.body){
    //     errors.body = 'You must provide a body';
    // }
    // if(! values.emails){
    //     errors.emails = 'You must provide emails';
    // }

    errors.recipients = validateEmails(values.recipients || '')
    
    _.each(FIELDS, ({name,errorMsg})=>{
        if(!values[name]){
            errors[name] = errorMsg
        }
    })

    

    return errors;
}
 
export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount : false    // dont destroy previos data
})(SurveyForm);