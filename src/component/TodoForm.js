import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  // TodoForm Component가 render 될 때마다 실행되는 구문
  // 입력 커서를 포커스한다.
  useEffect(() => {
    inputRef.current.focus();
  });

  // TodoForm에서 Submit이 되면 실행되는 함수
  const handleSubmit = (e) => {
    // Form이 Submit 되면 브라우저가 리프레시하는 것을 방지
    e.preventDefault();
    // TodoList의 addTodo 함수를 실행한다
    props.onSubmit({
      // Todo의 고유한 아이디 값 (리눅스 시간)
      // 어느 Todo가 선택이 되었는 가를 판별하는데에 사용된다
      id: Date.now().toString(),
      // 사용자로 부터 입력받은 값
      text: input,
      // Todo의 체크 속성 (기본값 : false)
      complete: props.edit ? props.edit.complete : false,
    });

    // 입력 필드 초기화
    setInput('');
  };

  // 사용자의 form 입력에 대해 state를 업데이트 한다
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={props.edit ? "" : "Enter your todo"}
        value={input}
        name="text"
        className={props.edit ? "todo-input edit" : "todo-input"}
        onChange={handleChange}
        ref={inputRef}
      ></input>
      <button
        type="submit"
        className={props.edit ? "todo-button edit" : "todo-button"}
      >
        {props.edit ? "Edit" : "Add"}
      </button>
      {!props.edit ? (
        <button className="clear-button" onClick={props.clearTodo}>
          Clear All
        </button>
      ) : (
        ''
      )}
    </form>
  );
}

export default TodoForm;
