import { ITodoItem } from "../../api/TodoApi";
import TodoRowItem from "./TodoRowText";
import TodoRowFile from "./TodoRowFile";
type TodoRowProps = {
  todoItem: ITodoItem;
  updateTodoFiled: (
    todoId: string,
    key: keyof ITodoItem,
    newValue: string | boolean | File
  ) => void;
  deleteTodo: (todoId: string) => void
};

export default function TodoRow({ todoItem, updateTodoFiled, deleteTodo }: TodoRowProps) {
  return (
    <tr className="todo-row">
      <TodoRowItem
        updateState={(text) => updateTodoFiled(todoItem.id, "title", text)}
        text={todoItem.title}
      ></TodoRowItem>

      <TodoRowItem
        updateState={(text) =>
          updateTodoFiled(todoItem.id, "description", text)
        }
        text={todoItem.description}
      ></TodoRowItem>
      <td className={todoItem.done ? "text-success" : "text-danger"}>
        {" "}
        {todoItem.done ? "Выполнено" : "Не выполнено"}
      </td>
      <TodoRowFile
        uploadFile={(file) => updateTodoFiled(todoItem.id, "img", file)}
        img={todoItem.img}
      ></TodoRowFile>
      <td>{todoItem.completionDate}</td>
      <td>
        <button onClick={() => deleteTodo(todoItem.id)} type="submit" className="btn btn-danger">
          Удалить
        </button>
        <button
          onClick={() => updateTodoFiled(todoItem.id, "done", true)}
          type="submit"
          className="btn btn-success ms-1"
        >
          Завершить
        </button>
      </td>
    </tr>
  );
}
