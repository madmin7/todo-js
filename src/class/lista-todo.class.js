import { Todo } from ".";


export class TodoList {


    constructor(){

        // this.todo = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( tarea ) {
        this.todo.push( tarea );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        this.todo = this.todo.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompleado( id ) {
        
        for(const todo of this.todo ){
            if( todo.id == id){
                // !todo.completado, si es true cambia a false y viceversa
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break
            }
        }

    }

    borrarCompletados() {
        this.todo = this.todo.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        
        localStorage.setItem( 'todo', JSON.stringify(this.todo) );

    }

    cargarLocalStorage(){

        // if( localStorage.getItem('todo')){
        //     this.todo = JSON.parse(localStorage.getItem('todo'));
        //     console.log('cargarLocal:', this.todo);
        // }else{
        //     this.todo = [];
        // }
        this.todo = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
        
        this.todo = this.todo.map( Todo.fromJson )
    }
}