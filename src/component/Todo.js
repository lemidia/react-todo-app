import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: '',
    value: '',
    complete: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: '',
      value: '',
    });
  };

  // Edit 값이 셋팅되면 실행되는 구문
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  // 일반적인 할 일 목록이 추가될 때 실행되는 구문
  else {
    return (
      // Scroll container
      <div className="scroll-container">
        {todos.map((todo, index) => (
          <div
            className={todo.complete ? "todo-row complete" : "todo-row"}
            key={index}
          >
            <div className="" key={todo.id}>
              {todo.text}
            </div>
            <div className="icons">
              <div className="check-icon" onClick={() => completeTodo(todo.id)}>
                <FaCheck />
              </div>
              <div
                className="edit-icon"
                onClick={() =>
                  setEdit({
                    id: todo.id,
                    value: todo.text,
                    complete: todo.complete,
                  })
                }
              >
                <AiFillEdit />
              </div>
              <div className="delete-icon" onClick={() => removeTodo(todo.id)}>
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Todo;
