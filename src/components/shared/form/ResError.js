import React from 'react';

export function ResError(props) {
  const errors = props.errors;
  console.log('props', props)

  return (
    errors && errors.length > 0 ?
      <div className='alert alert-danger rtv-res-errors'>
        {errors.map((error, index) => <p key={index}> {error.detail} </p>)}
      </div>
      : <div></div>
  )
}
