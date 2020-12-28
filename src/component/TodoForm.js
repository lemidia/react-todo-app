import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

function TodoForm({onSubmit, clearTodo, edit}) {
  const [input, setInput] = useState(edit ? edit.value : "");

  const inputRef = useRef(null);

  // TodoForm Component가 render 될 때마다 실행되는 구문
  // 입력 커서를 포커스한다.
  useEffect(() => {
    inputRef.current.focus();
  });

  // TodoForm에서 Submit이 되면 실행되는 함수
  const handleSubmit = () => {
    // Form이 Submit 되면 브라우저가 리프레시하는 것을 방지
    //e.preventDefault();
    // TodoList의 addTodo 함수를 실행한다
    onSubmit({
      // Todo의 고유한 아이디 값 (리눅스 시간)
      // 어느 Todo가 선택이 되었는 가를 판별하는데에 사용된다
      id: uuidv4(),
      // 사용자로 부터 입력받은 값
      text: input,
      // Todo의 체크 속성 (기본값 : false)
      complete: edit ? edit.complete : false,
    });

    // 입력 필드 초기화
    setInput('');
  };

  // 사용자의 form 입력에 대해 state를 업데이트 한다
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder={edit ? "" : "Enter your todo"}
        value={input}
        name="text"
        className={edit ? "todo-input edit" : "todo-input"}
        onChange={handleChange}
        ref={inputRef}
        onKeyUp={handleKeyUp}
      ></input>
      <button
        type="submit"
        className={edit ? "todo-button edit" : "todo-button"}
        onClick={handleSubmit}
      >
        {edit ? "Edit" : "Add"}
      </button>
      {!edit ? (
        <button className="clear-button" onClick={clearTodo}>
          Clear All
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default TodoForm;

