//Images Toggle, code from Shreya
function changeImage() {

    if (document.getElementById("imgClickAndChange").src.includes('lindaWithMask'))
    {
        document.getElementById("imgClickAndChange").src = "/static/assets/lindaWithoutMask.jpg";
    }
    else{
        document.getElementById("imgClickAndChange").src ="/static/assets/lindaWithMask.jpg"
    }
}


function lightMode() {
    //light mode
    if(document.getElementById("subject").style.color === "rgb(255, 255, 255)"){
        document.getElementById("subject").style.color = "#333333"
        document.getElementById("subject").style.backgroundColor = "rgba(255, 255, 255,0.5)"
        document.getElementById("subject").style.textShadow = "5px 5px #ffffff"
        document.getElementById("welcome-words").style.color = "#333333"
        document.getElementById("welcome-words").style.backgroundColor = "rgba(255, 255, 255,0.5)"
        document.getElementById("enter-name").style.color = "#333333"
        document.getElementById("display-quote").style.color = "#333333"
        document.getElementById("display-quote").style.backgroundColor = "rgba(255, 255, 255,0.5)"
        document.getElementById("translation").style.color = "#333333"
        document.getElementById("translation").style.backgroundColor = "rgba(255, 255, 255,0.5)"
        document.getElementById("image").style.backgroundColor = "rgba(255, 255, 255,0.5)"
        document.getElementById("click-me").style.backgroundColor = "rgba(255, 255, 255,0.5)"
        document.getElementById("click-me").style.color = "#333333"
    }
    //dark mode
    else{
        document.getElementById("subject").style.color = "#ffffff"
        document.getElementById("subject").style.backgroundColor = "rgba(112, 112, 112, 0.51)"
        document.getElementById("subject").style.textShadow = "5px 5px #333333"
        document.getElementById("welcome-words").style.color = "#ffffff"
        document.getElementById("welcome-words").style.backgroundColor = "rgba(112, 112, 112, 0.51)"
        document.getElementById("enter-name").style.color = "#ffffff"
        document.getElementById("display-quote").style.color = "#ffffff"
        document.getElementById("display-quote").style.backgroundColor = "rgba(112, 112, 112, 0.51)"
        document.getElementById("translation").style.color = "#ffffff"
        document.getElementById("translation").style.backgroundColor = "rgba(112, 112, 112, 0.51)"
        document.getElementById("image").style.backgroundColor = "rgba(112, 112, 112, 0.51)"
        document.getElementById("click-me").style.backgroundColor = "rgba(112, 112, 112, 0.51)"
        document.getElementById("click-me").style.color = "#ffffff"
    }
}

//Translation Api
function translateIt() {
    console.log(document.getElementById("english").value)
    let translateSetting = {
        "async": true,
        "crossDomain": true,
        "url": "https://nlp-translation.p.rapidapi.com/v1/translate",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-host": "nlp-translation.p.rapidapi.com",
            "x-rapidapi-key": "9e3f40a0cemshcced0bdaa85f0c0p1e3309jsnbb4748bd1d8c"
        },
        "data": {
            "text": document.getElementById("english").value,
            "to": "es",
            "from": "en"
        }
    };
    $.ajax(translateSetting).done(function (response) {
        console.log(response)
        document.getElementById("spanish").innerText = response.translated_text.es;
    });
}

//Random Motivational Quote Api
function newQuote(){
    $.ajax(settings).done(function (response) {
        console.log(response);
        document.getElementById("display-quote").innerText = response;
    });
}
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://motivational-quotes1.p.rapidapi.com/motivation",
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "x-rapidapi-host": "motivational-quotes1.p.rapidapi.com",
        "x-rapidapi-key": "9e3f40a0cemshcced0bdaa85f0c0p1e3309jsnbb4748bd1d8c"
    },
    "processData": false,
    "data": {
        "key1": "value",
        "key2": "value"
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
    document.getElementById("display-quote").innerText = response;
});

function onOff() {
    if($('#display-quote').css('display') === 'none') $('#display-quote').css('display', 'block')
    else $('#display-quote').css('display', 'none')
}


//Todo List
function showTodo(){
    if(document.getElementById("todo-list").style.display === "block"){
        document.getElementById("todo-list").style.display = "none"
    }else document.getElementById("todo-list").style.display = "block";
}

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString) {
    //Create List Item
    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); // text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Each element needs modifying

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

//Add a new task
var addTask = function() {
    var taskInput = document.getElementById("new-task"); //new-task
    var addButton = document.getElementsByTagName("button")[0]; //first button
    var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
    var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
    console.log("Add task...");
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(document.getElementById("new-task").value);
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    document.getElementById("new-task").value = "";
}

//Edit an existing task
var editTask = function() {
    console.log("Edit task...");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
    } else {
        //Switch to .editMode
        //input value becomes the label's text
        editInput.value = label.innerText;
    }

    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
    console.log("Delete task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    //Remove the parent list item from the ul
    ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
    console.log("Task complete...");
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


//Mark a task as incomplete
var taskIncomplete = function() {
    console.log("Task incomplete...");
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
    editButton.onclick = editTask;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

// var ajaxRequest = function() {
//     console.log("AJAX request");
// }

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


//Change Backgrounds
function changeBackground() {
    console.log("hi")
    document.body.style.backgroundImage = 'url("/static/assets/studyBackground1 (2).jpg")'
}

function changeBackground2() {
    console.log("hi")
    document.body.style.backgroundImage = 'url("/static/assets/studyBackground4.jpg")'
}

function changeBackground3() {
    console.log("hi")
    document.body.style.backgroundImage = 'url("/static/assets/studyBackground5.jpg")'
}

function changeBackground4() {
    console.log("hi")
    document.body.style.backgroundImage = 'url("/static/assets/studyBackground3 (2).jpg")'
}

function changeBackground5() {
    console.log("hi")
    document.body.style.backgroundImage = 'url("/static/assets/studyBackground6.jpg")'
}


