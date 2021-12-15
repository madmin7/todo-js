import './styles.css';

// import { Todo } from './class/todo.class.js';
// import { TodoList } from './class/lista-todo.class.js';

import { Todo, TodoList } from './class'
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();



// todoList.todo.forEach( todo => crearTodoHtml( todo ));

todoList.todo.forEach( crearTodoHtml );


console.log('todos:', todoList.todo); 





// const tarea =  new Todo('aprender Javascript');

// todoList.nuevoTodo(tarea);
// crearTodoHtml(tarea);

// localStorage.setItem('mi-key', 'abc1234');
// sessionStorage.setItem('mi-key', 'abc1235');

// setTimeout(()=> {

//     localStorage.removeItem('mi-key')

// }, 4500)