import PropTypes from 'prop-types'
import React from 'react'
import ErrorMessage from './ErrorMessageCustom'
export default function CustomInput(props) {

    const { name, type, id,register,inputClass,errors,value,placeholder } = props
    return (
                
                <><input value={value} placeholder={placeholder} {...register(name)} type={type} className={inputClass} id={id} />
                <span>{errors && errors[name] && <ErrorMessage message={errors[name].message} />}</span></>
    )
}

CustomInput.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    className: PropTypes.string,
    errors:PropTypes.any
}
CustomInput.defaultProps = {
    name:'',
    type:'text',
    id:'',
    inputClass:'form-control',
    
  
}