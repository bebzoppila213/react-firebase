import TodoForm, { TodoFormType } from "./TodoForm";
import { useEffect, useState } from "react";
import { TodoApiFireBase, ITodoItem } from "../../api/TodoApi";
import TodoTable from "./TodoTable";



export default function Todo() {
  const [todoState, setTodoState] = useState<ITodoItem[]>([]);
  const todoApi = new TodoApiFireBase();

  const createTodoItem = async (data: TodoFormType) => {
    const newTodoItem = await todoApi.create(data.completionDate, data.description, data.title, data.img);
    setTodoState([...todoState, newTodoItem])
  };

  const updateTodoFiled = async (todoId: string, key: keyof ITodoItem, newValue: string | boolean | File) => {
    const uploadValue = await todoApi.updateTodoField(todoId, key, newValue)
    setTodoState(todoState.map(todoItem => todoItem.id === todoId ? {...todoItem, [key]: uploadValue} : todoItem))
  }

  const deleteTodo = async (todoId: string) => {
    await todoApi.deleteTodo(todoId)
    // console.log(todoState.filter(todoItem => todoItem.id !== todoId));
    setTodoState(todoState.filter(todoItem => todoItem.id !== todoId))
  }


  useEffect(() => {
    const load = async () => {
      const allTodo = await todoApi.loadTodo();
      setTodoState(allTodo);
    };
    load();
  }, []);


  return (
    <section className="todo">
      <div className="container">
        <div className="todo__inner">
          <TodoForm submitForm={createTodoItem}></TodoForm>
          <TodoTable deleteTodo={deleteTodo} updateTodoFiled={updateTodoFiled} todos={todoState} />
        </div>
      </div>
    </section>
  );
}
