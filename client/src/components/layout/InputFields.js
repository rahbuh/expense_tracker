import React, { Fragment } from "react";

const Input = props => {
  return (
    <Fragment>
      <label htmlFor={props.name}>{props.title}</label>
      <input
        defaultValue={props.defaultValue}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        step={props.step}
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
        defaultValue={props.defaultValue}
        name={props.name}
        id={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        <option defaultValue>Select an Option</option>
        {optionList}
      </select>
    </Fragment>
  );
};

export { Input, Select };
