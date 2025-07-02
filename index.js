let todoInput = document.querySelector(".input");
let todoButton = document.querySelector(".button");
let showTodoClass = document.querySelector(".todos-container");

let todo;
let localData = JSON.parse(localStorage.getItem("todo"))
let todoList =  localData|| [];

/**
 * Generates a universally unique identifier (UUID) in the standard format.
 *
 * @function uuid
 * @returns {string} A UUID string in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
 *
 * @example
 * let id = uuid();
 * console.log(id); // Output: "123e4567-e89b-12d3-a456-426614174000"
 */
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


/**
 * Event listener for the todoButton click event.
 * Handles adding a new todo item to the list and updating the UI.
 *
 * @param {Event} e - The click event object.
 */
todoButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the form from submitting

  // Get the value from the todo input field
  todo = todoInput.value;

  // Check if the todo value is not empty
  if (todo.length > 0) {
    // Add a new todo item to the list with a unique ID and default completion status
    todoList.push({ id: uuid(), todo, isCompleted: false });
  }

  // Update the UI with the new todo list
  showTodos(todoList);

  // Store the updated todo list in local storage
  localStorage.setItem("todo", JSON.stringify(todoList));

  // Clear the todo input field
  todoInput.value = "";

  // Log debug information
  console.log("button clicked");
  console.log(todo);
  console.log(todoList);
});

/**
 * Event listener for clicks on the todo list container.
 * Handles toggling todo item completion status and deleting todo items.
 *
 * @param {Event} e - The click event object.
 * @returns {void}
 */
showTodoClass.addEventListener("click", (e) => {
  console.log("item clicked");
  const target = e.target;
  let key = e.target.dataset.id;
  let deleteKey = e.target.dataset.todoKey;
  console.log(key);

  todoList = todoList.map((todo) =>
    todo.id === key
      ? { ...todo, isCompleted: !todo.isCompleted }
      : todo
  );

  
    // todoList = todoList.filter((todo) => todo.id !== deleteKey);
    const deleteBtn = target.closest("button[data-todoKey]");
    if (deleteBtn) {
      const deleteKey = deleteBtn.dataset.todokey;
      todoList = todoList.filter((todo) => todo.id !== deleteKey);
    }

    localStorage.setItem("todo", JSON.stringify(todoList))

  showTodos(todoList);
  console.log(todoList);
});




function showTodos(todoList) {
  showTodoClass.innerHTML = todoList.map(
    ({ id, todo, isCompleted }) => `<div>
    <input data-id="${id}"${ isCompleted ? "checked" : ""} type="checkbox">
          <label data-id="${id}" class="todo todo-text t-pointer ${ isCompleted ? "checked-todo" : ""
    }"> ${todo}</label>


<button 
          class="absolute right-0 btn-primary" 
          data-todoKey="${id}" 
          
        >
          <label 
            class="del-btn-label" 
            data-todoKey="${id}" 
           
            style="cursor: pointer;"
          >
            <span 
              class="del-btn material-icons-outlined" 
              data-todoKey="${id}" 
              
            >
              delete
            </span>
          </label>
        </button>
</div>`
  );
}

showTodos(todoList);


