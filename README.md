### First commit 후 코드 설명을 하고 나서 개선하거나 수정해보면 좋을 것 같은 부분들 정리(202012.28)

---

#### 1. 내용이 없는 것 외에도 화이트 스페이스만으로 이루어진 입력에 대해서는 add기능과 update 기능이 작동되지 않게 수정 + 알림기능 추가

TodoList의 기존 todo 추가 메소드
```
const addTodo = (todo) => {
    // 입력이 없다면 todo를 추가하지 않는다
    if (!todo.text) {
      return;
    }
```

수정 후
``` 수정 후
const addTodo = (todo) => {
    // 입력이 없거나 빈 공백이면 todo를 추가하지 않는다
    if (!todo.text || !todo.text.trim()) {
      alert("Empty value is not allowed")
      return;
    }
```

TodoList의 기존 update 메소드
```
const updateTodo = (todoId, newValue) => {
    if (!newValue.text) {
      return;
    }

    setTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? newValue : todo))
    );
  };
```

수정 후
``` 
const updateTodo = (todoId, newValue) => {
    if (!newValue.text || !newValue.text.trim()) {
      alert("Empty value is not allowed")
      return;
    }

    setTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? newValue : todo))
    );
  };
```
---

#### 2. todo의 고유 id 값을 기존 리눅스타임 사용에서 고유 값인 uuid를 사용하는 것으로 변경 (시간을 이용하면 찰나의 순간에 동일한 id 값을 가질 수 있는 가능성이 있어서)

기존의 코드
```
id: Date.now().toString(),
```
수정 후
```
// uuid를 import 후
import { v4 as uuidv4 } from 'uuid';

...

// 다음 코드로 대체
id: uuidv4()
```
---

#### 3. 어떤 컴포넌트는 부모 컴포넌트에서 넘어온 props를 object destructuring 하고, 어떤 컴포넌트는 props object 그대로 받는 등의 일관성이 떨어져, 넘어오는 props를 모두 object destructuring 하기로 수정.

기존의 코드
```
function TodoForm(props) {
...
}
```

수정 후
```
function TodoForm({onSubmit, clearTodo, edit}) {
...
}
```
그리고 나머지 코드에서 나타나는 props. 부분을 삭제하였다.

#### 4. 기존에는 사용자에게 입력을 받아 add 버튼을 누름으로써 submit event를 발생시키고 이는 form의 onSubmit event를 호출하여 Todo 추가 기능을 구현 하였다.
하지만 이는 브라우저가 화면을 리프레시 하는 것을 야기하게 되고, 이를 방지하고자e.preventDefault()라는 코드를 삽입하였다.

프론트 앤드 개발자 분의 이야기를 듣고 다음과 같이 코드를 개선해 보았다.

기존의 코드에서 굳이 필요성이 없는 form 태그를 없애고 버튼에 onClick event를 달아 Todo 추가 기능을 구현하는 식으로 수정을 해보았다. 
이는 브라우저의 리프레시 문제를 생각할 필요도 없게 되고 e.preventDefault()을 쓸 필요도 없게 되었다.

그리고 add 버튼을 누르는 것 외에도 input 필드에서 엔터키가 입력되어도 Todo가 제출이 되도록 하는 메소드를 추가해 보았다.

수정 전
```
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={edit ? "" : "Enter your todo"}
        value={input}
        name="text"
        className={edit ? "todo-input edit" : "todo-input"}
        onChange={handleChange}
        ref={inputRef}
      ></input>
      <button
        type="submit"
        className={edit ? "todo-button edit" : "todo-button"}
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
    </form>

// 함수 부분
const handleSubmit = (e) => {
    // Form이 Submit 되면 브라우저가 리프레시하는 것을 방지
    e.preventDefault();
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
```

수정 후
```
   <div className="input-container">
      <input
        type="text"
        placeholder={edit ? "" : "Enter your todo"}
        value={input}
        name="text"
        className={edit ? "todo-input edit" : "todo-input"}
        onChange={handleChange}
        ref={inputRef}
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

// 함수 부분
const handleSubmit = (e) => {
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

다음은 input 필드에서 엔터키가 입력되어도 Todo가 제출이 되도록 하는 메소드이다.

const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

input 필드에서 onKeyUp={handleKeyUp}의 이벤트를 추가하여 키가 눌릴 때 위의 함수가 호출이 되도록 하였다. (13은 키보드에서 Enter키의 번호이다.)
```

#### 5. 컴포넌트의 네이밍과 그 역할 관점에서 보면 기존의 Todo 컴포넌트와 TodoList 컴포넌트, 이 둘의 네임을 서로 바꾸는 것이 좋다고 생각되어, 이름을 서로 바꾸고 이 들의 컴포넌트를 이용하는 부분의 코드도 같이 수정하였다.

기존 Todo.js의 이름에서 -> TodoList.js 라는 이름으로
기존 TodoList.js의 이름에서 -> Todo.js 라는 
