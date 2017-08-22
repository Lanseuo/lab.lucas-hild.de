// Icons in SVG format
var removeSVG = '<svg fill="#757575" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
var completeSVG = '<svg fill="rgb(16, 199, 148)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>';

var todos = [];
getTodosFromLocalStorage();

function getTodosFromLocalStorage() {
  if (localStorage.getItem('todos')) {
    var todos = JSON.parse(localStorage.getItem('todos'));
    for (var i = 0; i < todos.length; i++) {
      addItemToList(todos[i]);
    }
  }
}

// Click on add button
document.getElementById('addItem').addEventListener('click', function () {
  var value = document.getElementById('item').value;
  if (value) {
    addItemToList(value);
    document.getElementById('item').value = '';
  }
});

// Event listener of ENTER
document.getElementById('item').addEventListener('keyup', function (event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    document.getElementById('addItem').click();
  }
});

function removeItem(e) {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  parent.removeChild(item);

  var textToRemove = item.childNodes[0].textContent;

  for (var i = 0; i < todos.length; i++) {
    console.log(textToRemove.slice(1, todos.length - 1));
    console.log(textToRemove + ' ' + todos[i]);
    if (textToRemove == todos[i]) {
      todos.pop(i);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }
}

// Add new item to the todo list
function addItemToList(text) {
  // Add item to array and localStorage
  todos.push(text);
  localStorage.setItem('todos', JSON.stringify(todos));

  var list = document.getElementById('todo');

  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing item
  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  // Add click event for completing item
  complete.addEventListener('click', removeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}
