import React, { FC, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const InputField: FC<InputFieldProps> = ({ id, label, ...props }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} className="border p-3 rounded-md" />
    </div>
  );
};

export default InputField;
