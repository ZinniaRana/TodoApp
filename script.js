//Selectors
const todotask = document.querySelector('.todo-task');
const todobtn = document.querySelector('.todo-btn');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todobtn.addEventListener('click', addtodo);
todolist.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions
function addtodo(event){
    //Prevent form from submitting
    event.preventDefault();
    
            //TODO DIV
        const tododiv = document.createElement('div');
        tododiv.classList.add('todo');

        //Create li
        const newtodo = document.createElement('li');
        newtodo.innerText = todotask.value;
        newtodo.classList.add('todo-item');

        // APPEND li to div todo
        tododiv.appendChild(newtodo);

        //ADD todo to local storage
        saveLocalTodos(todotask.value);

        //CREATE trash button
        const trashbtn = document.createElement('button');
        trashbtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashbtn.classList.add('trash-btn');

        //CREATE checkmark button
        const checkbtn = document.createElement('button');
        checkbtn.innerHTML = '<i class="fas fa-check"></i>';
        checkbtn.classList.add('check-btn');

        tododiv.appendChild(checkbtn);
        tododiv.appendChild(trashbtn);

        //APPEND tododiv to todo-list
        todolist.appendChild(tododiv);

        //Clear todo task value 
        todotask.value = "";
}

function deleteCheck(event){
    const item = event.target;

    //DELETE todo
    if(item.classList[0] === 'trash-btn'){
       const todo = item.parentElement;
       //ANIMATION
       todo.classList.add('fall');
       todo.addEventListener('transitionend', function(){
            todo.remove();
       });
    }

    //Check Mark
    if(item.classList[0] === 'check-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('check');
    }
}

function filterTodo(event){
    const todos = todolist.childNodes;

    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains('check')){
                    console.log("completed item");
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains('check')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //Check
    let todos;
    if(localStorage.getItem('todos') === "null"){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}