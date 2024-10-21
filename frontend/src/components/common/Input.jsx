// src/components/common/Input.jsx
import React from 'react';

const Input = ({ type, name, value, onChange, placeholder, label }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default Input;