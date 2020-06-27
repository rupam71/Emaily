// its contains logic to render a single
// label and text input
import React, { Component } from 'react';

class SurveyField extends Component {
    state = {  }
    render() { 
        const {input,label,meta} = this.props
       // console.log(this.props)

        return ( 
            <div>
                <label>{label}</label>
                <input {...input} style={{ marginBottom: '5px' }}/>
                <div className='red-text' style={{ marginBottom: '20px' }}>
                    {meta.touched && meta.error}
                </div>
            </div>
         );
    }
}
 
export default SurveyField;