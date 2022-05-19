import Input from "./input";

 interface RenderInputProps{
    name:string;
    label:string;
    value:any;
    onChange:any;
    error:string | undefined;
    type?:string | undefined;
}

export const RenderInput = ({
  name,
  label,
  value,
  onChange,
  error = "",
  type = "text",
}:RenderInputProps) => {
  return (
    <Input
      type={type}
      name={name}
      value={value} //{data[name]}
      label={label}
      onChange={onChange}
      error={error} //{errors[name]}
    />
  );
};
