import React from 'react';

const MenkaInput = ({ type, name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {type === 'text' && (
        <input
          {...rest}
          type={type}
          name={name}
          id={name}
          className="form-control"
        />
      )}
      {type === 'file' && (
        <input
          {...rest}
          type={type}
          name={name}
          id={name}
          className="form-control-file"
        />
      )}
      {type === 'radio' && (
        <input
          {...rest}
          type={type}
          name={name}
          id={name}
          className="form-check-input"
        />
      )}
      {type === 'checkbox' && (
        <input
          {...rest}
          type={type}
          name={name}
          id={name}
          className="form-check-input"
        />
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default MenkaInput;
