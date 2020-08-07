// ID番号のための変数
let nextId = 0;

// コメントを格納する配列
const todos = [];

// DOMの取得
// コメント入力ボックス
// 追加ボタン
// タスク表示欄
const inputComment = document.getElementById('input_todo');
const addBtn = document.getElementById('add_btn');
const tableBody = document.getElementById('todo_body');

// ボタン押下時の処理
addBtn.addEventListener('click', () =>{
  // 空文字が入力された時の処理
  if (inputComment.value === '') {
    alert('タスクを入力してください!');
    return;
  }

  const todo = {
      id: nextId++, 
      comment: inputComment.value, 
      status: '作業中'
    }
  todos.push(todo);
  displayTodos(todos);
  // タスク入力後、入力欄を空にする
  inputComment.value = '';
});

// todosを表示させるための関数
const displayTodos = (todos) => {
  tableBody.textContent = '';
  
  todos.forEach((todo, index) => {
    // trの生成
    const tableRecord = document.createElement('tr');
    tableBody.appendChild(tableRecord);
    
    // IDの生成
    const tableId = document.createElement('th');
    tableId.textContent = index;
    tableRecord.appendChild(tableId);

    // コメントの生成
    const tableComment = document.createElement('td')
    tableComment.textContent = todo.comment;
    tableRecord.appendChild(tableComment);

    // 「作業中」ボタンの生成
    const tableStatus = document.createElement('td');
    tableRecord.appendChild(tableStatus);
    tableStatus.appendChild(actionStatusButton(todo));
   
    // 「削除」ボタンの生成
    const tableDelete = document.createElement('td');
    tableRecord.appendChild(tableDelete);
    tableDelete.appendChild(actionDeleteButton(todo.id));
  });
};

// 削除ボタン押下時の処理
const actionDeleteButton = (id) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';
  deleteButton.addEventListener('click', () => {
    const targetIndex = todos.findIndex(todo => {
      return todo.id === id;
    });
    todos.splice(targetIndex, 1);
    displayTodos(todos);
  });
  return deleteButton;
};

//　作業中ボタン押下時の処理
const actionStatusButton = (todo) => {
    const statusButton = document.createElement('button');
    statusButton.textContent = todo.status;
    statusButton.addEventListener('click', () => {
        if (todo.status === '作業中') {
            todo.status = '完了';
            statusButton.textContent = todo.status;
        } else if (todo.status === '完了') {
            todo.status = '作業中';
            statusButton.textContent = todo.status;
        }
    });
    return statusButton
};