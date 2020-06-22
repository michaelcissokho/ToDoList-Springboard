const form = document.querySelector('#entry')
const list = document.querySelector('#userList')

//retrieving from local storage, basically recreates the list based on what was saved in local storage(saving function below in doc)
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
for (let i = 0; i<savedTodos.length; i++){
    let newItem = document.createElement('li');
    newItem.innerText = savedTodos[i].goal;
    newItem.isCompleted = savedTodos[i].isCompleted ? true: false;
    if (newItem.isCompleted) {
        newItem.style.textDecoration = 'line-through'
    }
    list.appendChild(newItem);
}
//removes items with double click. first two lines removes item from screen. for loop removes item from local storage by checking to see if 
//if local storage item matches with inner text of item on screen
list.addEventListener('dblclick',function(event){
    let clickedListItem = event.target;
    clickedListItem.remove();

    for (let i = 0; i<savedTodos.length; i++){
        if (savedTodos[i].goal === clickedListItem.innerText){
            var indexToRemove = i;
            var numberToRemove = 1;
            savedTodos.splice(indexToRemove, numberToRemove);  
            localStorage.setItem('todos',JSON.stringify(savedTodos))
        }
    }
})
//function to submit item, saves item to local storage as soon as its created
form.addEventListener('submit',function (event){
    event.preventDefault();
    let newItem = document.createElement('li');
    let taskValue = document.querySelector('#goal').value;
    newItem.innerText = taskValue;
    newItem.isCompleted = false;
    form.reset();

    list.appendChild(newItem);

    savedTodos.push({goal: newItem.innerText, isCompleted: false});
    localStorage.setItem('todos',JSON.stringify(savedTodos));
});

//cross out when completed function, if else statement crosses out based on whether or not we click
//for loop saves the crossed out version of item in local storage as soon as we click
list.addEventListener('click', function(event){

    let clickedListItem = event.target;

    if(!clickedListItem.isCompleted){
        clickedListItem.style.textDecoration = 'line-through';
        clickedListItem.isCompleted = true;
    }else {
        clickedListItem.style.textDecoration= 'none';
        clickedListItem.isCompleted = false;
    }

    for (let i = 0; i<savedTodos.length; i++){
        if (savedTodos[i].goal === clickedListItem.innerText){
            savedTodos[i].isCompleted = clickedListItem.isCompleted;
            localStorage.setItem('todos',JSON.stringify(savedTodos));
        }
    }
})

