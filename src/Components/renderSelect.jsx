import Select from "./select";

export const RenderSelect = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
}) => {
  console.log("name", name, "label", label, "options", options);
  return (
    options && (
      <Select
        name={name}
        value={value} //{data[name]}
        label={label}
        options={options}
        onChange={onChange}
        error={error} //{errors[name]}
      />
    )
  );
};
