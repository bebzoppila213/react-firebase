import React, { useMemo, useState } from "react";
import CustomInput from "../CustomInput";
import CustomTextArea from "../CustomTextArea";

type TodoFormTextType = {
  title: string;
  description: string;
  completionDate: string;
};

type TodoFormFileType = {
  img: File | null;
};

export type TodoFormType = TodoFormTextType & TodoFormFileType;

type ValidateFormDataType = {
  key: keyof TodoFormType;
  pattern: RegExp;
};

type TodoFormProps = {
  submitForm: (data: TodoFormType) => void;
};

export default function TodoForm({ submitForm }: TodoFormProps) {

  const [formData, setFormData] = useState<TodoFormType>({
    title: "",
    description: "",
    img: null,
    completionDate: "",
  });

  const validatedFormData: ValidateFormDataType[] = [
    { key: "title", pattern: /.{3,}/ },
    { key: "description", pattern: /.{3,}/ },
    { key: "completionDate", pattern: /[0-9]{4}-[0-9]{2}-[0-9]{2}/ },
  ];

  const updateFormState = (key: keyof TodoFormTextType, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const setFormFile = (file: File) => {
    setFormData({ ...formData, img: file });
  };

  const formIsValid = useMemo(
    () =>
      validatedFormData.every((formItem) =>
        formItem.pattern.test(String(formData[formItem.key]))
      ),
    [formData]
  );

  const onSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (formIsValid) {
      submitForm(formData);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <CustomInput
        updateTextField={(text) => updateFormState("title", text)}
        type="text"
        label="Название"
      />
      <CustomTextArea
        updateTextField={(text) => updateFormState("description", text)}
        label="Описание"
      />
      <CustomInput
        updateFileField={(file) => setFormFile(file)}
        type="file"
        label="Изображение"
      />
      <CustomInput
        updateTextField={(text) => updateFormState("completionDate", text)}
        type="date"
        label="Дата завершения"
      />
      <button
        disabled={!formIsValid}
        type="submit"
        className="btn btn-primary mt-2"
      >
        Добавить
      </button>
    </form>
  );
}
