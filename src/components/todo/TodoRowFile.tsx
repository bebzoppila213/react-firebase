import { FormEvent, useState } from "react";

type TodoRowFileType = {
  img: string;
  uploadFile: (file: File) => void;
};
export default function TodoRowFile({ img, uploadFile }: TodoRowFileType) {
  const [inputIsVisible, setInputVisible] = useState(false);

  const onBlur = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files) {
        console.log(input.files[0]);
        
      uploadFile(input.files[0]);
    }
    setInputVisible(false);
  };

  return (
    <td onDoubleClick={() => setInputVisible(true)}>
      {inputIsVisible ? (
        <input onChange={onBlur}  type="file" />
      ) : (
        <img className="todo-img" src={img} alt="Картинка" />
      )}
    </td>
  );
}
