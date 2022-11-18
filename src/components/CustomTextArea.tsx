
type CustomTextAreaProps = {
    label: string;
    updateTextField: (text: string) => void;
  };

export default function CustomTextArea({label, updateTextField}:CustomTextAreaProps) {

  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        onInput={event => updateTextField(event.currentTarget.value)}
        className="form-control"
      ></textarea>
    </div>
  );
}
