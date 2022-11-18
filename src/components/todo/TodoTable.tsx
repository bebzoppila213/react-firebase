import { ITodoItem } from "../../api/TodoApi";
import TodoRow from "./TodoRow";
type TodoListProps = {
  todos: ITodoItem[];
  updateTodoFiled: (todoId: string, key: keyof ITodoItem, newValue: string | boolean | File) => void
  deleteTodo: (todoId: string) => void
};

export default function TodoTable({ todos, updateTodoFiled, deleteTodo}: TodoListProps) {
  // console.log(todos);
  
  return (
    <div className="todo-list">
      <table className="table mb-4">
        <thead>
          <tr>
            <th scope="col">Заголовок</th>
            <th scope="col">Описание</th>
            <th scope="col">Статус</th>
            <th  scope="col">Картинка</th>
            <th scope="col">Дата завершения</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todoItem) => (
            <TodoRow key={todoItem.id} deleteTodo={deleteTodo} updateTodoFiled={updateTodoFiled} todoItem={todoItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
