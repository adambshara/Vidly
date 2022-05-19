import React from "react";

interface InputProps{
  type:string;
  name:string;
  label:string;
  value:string;
  error:string | null;
  onChange: ()=>void;
}

const Input:React.FC<InputProps> = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        value={props.value}
        onChange={props.onChange}
        id={props.name}
        name={props.name}
        type={props.type}
        // type="text" the type is to hide the writting
        className="form-control"
      />
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

export default Input;
