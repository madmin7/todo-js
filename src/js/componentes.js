import { Todo } from '../class'

import { todoList } from '../index'


// Referencias en el html:

const divTodoList = document.querySelector(".todo-list");

const txtInput = document.querySelector(".new-todo");

const btnBorrar = document.querySelector(".clear-completed");

const ulFiltros = document.querySelector('.filters');

const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml= ( todo ) =>{

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed': ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked': ''}>
            <label> ${ todo.tarea } </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div')

    div.innerHTML = htmlTodo;
    
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}


// Eventos:

txtInput.addEventListener('keyup', ( event) => {
    if ( event.keyCode === 13 && txtInput.value.length > 0){
        const nvoTodo = new Todo( txtInput.value );
        
        //agrega la tarea al array::
        todoList.nuevoTodo( nvoTodo );

        //mnostrar la tarea en la pantalla::
        crearTodoHtml(nvoTodo);
        txtInput.value = '';
    }
})

//Enter, target.value, keyCode


divTodoList.addEventListener('click', (event) => {
    const nombreEvento = event.target.localName; // input - label - button
    const todoElemento = event.target.parentElement.parentElement; // parentElement --> hace referencia a la etiqueta html
    const todoId =  todoElemento.getAttribute('data-id')

    if (nombreEvento.includes( 'input' )){ //click en el check
        todoList.marcarCompleado(todoId);
        
        todoElemento.classList.toggle('completed'); // toggle si existe la clase completed la borra y sino la crea.
    
    } else if(nombreEvento.includes( 'button' )) {  // hay que borrar el elem
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

})

btnBorrar.addEventListener('click', () => {
    
    todoList.borrarCompletados();

    for (let i = divTodoList.children.length-1; i >= 0; i--){
        
        const elemento = divTodoList.children[i];
        
        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }

});

ulFiltros.addEventListener('click', (event)=>{
    console.log( event.target.text );

    const filtro = event.target.text

    if (!filtro) { return; }


    anchorFiltros.forEach( elemento => elemento.classList.remove('selected'))

    event.target.classList.add('selected')

    console.log(event.target);


    for ( const elemento of divTodoList.children ){
        
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes': 
                if ( completado ){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados': 
            if ( !completado ){
                elemento.classList.add('hidden');
            }
            break;
        }

    }

})