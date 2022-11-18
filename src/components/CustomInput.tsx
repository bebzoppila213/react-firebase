import React from "react";
/**
 * @typedef Props
 * @prop {React.ReactNode} label
 * @prop {React.ReactNode} [type]
 * @prop {(file: File) => void} [updateFileField]
 * @prop {(text: string) => void} [updateTextField]
 */

/**
 * @param {Props} props
 */

type CustomInputProps = {
  label: string;
  type: "text" | "file" | 'date';
  updateTextField?: (text: string) => void;
  updateFileField?: (file: File) => void;
};

export default function CustomInput({
  label,
  type,
  updateTextField,
  updateFileField,
}: CustomInputProps) {


  const onInputEvent = (event: React.FormEvent<HTMLInputElement>) => {
    if (updateTextField) {
      updateTextField(event.currentTarget.value);
    }
  };

  const onChangeEvent = (event: React.FormEvent<HTMLInputElement>) => {
    if (updateFileField && event.currentTarget.files) {
      updateFileField(event.currentTarget.files[0]);
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        onInput={onInputEvent}
        type={type}
        onChange={onChangeEvent}
        className="form-control"
      />
    </div>
  );
}
