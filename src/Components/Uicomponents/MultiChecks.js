import PropTypes from 'prop-types'
import React from 'react'
import ErrorMessage from './ErrorMessage'
export default function Input(props) {
   console.log("props.errors",props.errors)
  const { name, type, id, label, labelFor, mainDivClass, labelClass, register, inputClass, errors, checkArray,wrapperDiv } = props
  return (
    <>
      <div class={wrapperDiv}>

        {checkArray.map((item, index) => {
          return (
            <div className={mainDivClass}>
              <label for={labelFor} className={labelClass}>{item.name}</label>
              <input value={item.value}   {...register(name)} type={type} className={inputClass} id={id} />
              {errors && errors[name] && <ErrorMessage message={errors[name].message}/>}
            </div>
          )
        })
        }
      </div>
    </>
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
  type: 'checkbox',
  id: '',
  mainDivClass: 'form-check float-start',
  wrapperDiv:'multi-checks',
  labelClass: 'form-check-label',
  // inputDivClass:'col-sm-9',
  inputClass: 'form-check-input',
  label: '',

}