import React, { Fragment } from "react";

const Input = props => {
  return (
    <Fragment>
      <label htmlFor={props.name}>{props.title}</label>
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        step={props.step}
        value={props.value}
        onChange={props.onChange}
      />
    </Fragment>
  );
};

const Select = props => {
  const optionList = props.options.map((option, index) => {
    return (
      <option key={index} value={option}>
        {option}
      </option>
    );
  });

  return (
    <Fragment>
      <label htmlFor={props.name}>{props.title}</label>
      <select
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option defaultValue>Select an Option</option>
        {optionList}
      </select>
    </Fragment>
  );
};

export { Input, Select };
