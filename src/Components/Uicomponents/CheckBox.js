import PropTypes from 'prop-types'
import React from 'react'
import ErrorMessage from './ErrorMessageCustom'
export default function Input(props) {
    const { name, type, id, label, labelFor,mainDivClass,labelClass,register,inputClass,errors,value,handleShowRC } = props
    return (
        <div className={mainDivClass}>
             {name === "delivers" ? 
             <div>
                 <label for={labelFor} className={labelClass}>{label}</label>
                <input value={value}   {...register(name)} type={type} className={inputClass} onClick={()=>{handleShowRC(value)}} id={id} />
                {errors && errors[name] && <ErrorMessage message={errors[name].message}/>}
             </div> :  <div>
                 <label for={labelFor} className={labelClass}>{label}</label>
                <input value={value}   {...register(name)} type={type} className={inputClass}  id={id} />
                {errors && errors[name] && <ErrorMessage message={errors[name].message}/>}
             </div>}
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
    inputClass:PropTypes.string,
    inputDivClass:PropTypes.string,
    errors:PropTypes.any
}
Input.defaultProps = {
    name:'',
    type:'checkbox',
    id:'',
    mainDivClass:'form-check float-start',
    labelClass:'form-check-label',
    // inputDivClass:'col-sm-9',
    inputClass:'form-check-input',
    label:'',
  
}