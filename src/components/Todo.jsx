import { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitems from './Todoitems'; // Importing the separate Todoitems component

function Todo() {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const inputRef = useRef(); // Keeping inputRef in case you need it

  // Function to add a new to-do item
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === '') {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = ''; // Clear input field after adding new todo
  };

  // Function to delete a to-do item
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  // Function to toggle the completion status of a to-do item
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete }; // Toggle the isComplete state
        }
        return todo;
      });
    });
  };

  // Sync to-do list with local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white hover:shadow-xl shadow-xl shadow-gray-700 place-self-center min-h-[550px] max-w-md w-11/12 flex flex-col p-7 rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <img src={todo_icon} className="w-8" alt="Todo Icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your Task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 text-white w-32 h-14 text-lg font-medium cursor-pointer hover:shadow-lg active:shadow-md transition-shadow duration-200"
        >
          ADD +
        </button>
      </div>
      <div className="todo-list">
        {todoList.map((item) => (
          <Todoitems
            key={item.id}
            text={item.text}
            id={item.id}
            deleteTodo={deleteTodo}
            toggle={toggle}
            isComplete={item.isComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;
