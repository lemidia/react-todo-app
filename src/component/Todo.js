import React, { useState, useEffect } from 'react';
import TodoList from './TodoList'
import TodoForm from './TodoForm';

function Todo() {
  const [todos, setTodos] = useState([]);

  // Local storage key
  const LOCAL_STORAGE_KEY = "todos";

  // 기존에 있던 todo를 불러온다.
  // TodoList가 최초로 랜더링 되고 나서 한 번만 실행된다.
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  // todo가 추가 되거나 변경될 때 마다 Local storage에 값을 최신으로 셋팅한다.
  // todos 값이 변할 때 마다 실행된다.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Todo 목록 추가
  const addTodo = (todo) => {
    // 입력이 없거나 빈 공백이면 todo를 추가하지 않는다.
    if (!todo.text || !todo.text.trim()) {
      alert("Empty value is not allowed")
      return;
    }

    // 기존 Todo 목록에 새로운 Todo를 추가하여 새로운 Todo 목록을 만든다.
    const newTodos = [todo, ...todos];

    // Todo state를 업데이트 한다.
    setTodos(newTodos);
  };

  // Todo state를 빈 배열로 하여 목록을 초기화 한다.
  const clearTodo = () => {
    setTodos([]);
  };

  // Todo의 완료 혹은 미완료 체크 기능 (Toggle)
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  // 특정 Todo에 대해서 사용자로 부터 새로운 값을 입력받아 Todo 값을 업데이트 한다.
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || !newValue.text.trim()) {
      alert("Empty value is not allowed")
      return;
    }

    setTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? newValue : todo))
    );
  };

  // 특정 Todo를 삭제한다.
  const removeTodo = (id) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(filteredTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      {/* 텍스트를 입력받고 이를 처리하는 TodoForm 컴포넌트 */}
      <TodoForm onSubmit={addTodo} clearTodo={clearTodo} />
      {todos.length === 0 ? (
        // todos가 없으면 단순히 Empty List 랜더링
        <h1 className="Empty">Empty List</h1>
      ) : (
        // TodoList 컴포넌트 랜더링
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      )}
    </div>
  );
}

export default Todo;
