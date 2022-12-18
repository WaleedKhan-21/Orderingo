import PropTypes from 'prop-types'
import React from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
export default function Input(props) {

    const { control, name, type, id, className, label, labelFor, mainDivClass, labelClass, inputDivClass, register, inputClass, errors, value, placeholder, options,req } = props
     
    return (
        <div class={mainDivClass}>
            <label for={labelFor ? labelFor : id} class={labelClass}>{label}{req?<span>*</span>:""}</label>

            <Controller
                control={control}
                defaultValue={options.map(c => c.value)}
                name={name}
                render={({ field: { onChange, value, ref } }) => (
<>
 

                 { options &&     <Select 
                    className={inputDivClass} isMulti options={options} onChange={e => { onChange(e.map(_ => _.value)) }} inputRef={ref} name={name} class={inputClass} />}
                  
                    </>
                    
                    )}
                    />
               {errors && errors[name] && <ErrorMessage message={errors[name].message}/>}
        </div>
    )
}

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    labelFor: PropTypes.string,
    inputClass: PropTypes.string,
    inputDivClass: PropTypes.string,
    errors: PropTypes.any
}
Input.defaultProps = {
    name: '',
    type: 'text',
    id: '',
    mainDivClass: 'mb-3 row',
    labelClass: 'col-sm-3 col-form-label',
    inputDivClass: 'col-sm-9',
    inputClass: 'form-control',
    label: '',


}