// Global:
var taskList = new TaskList();


function getEle(id) {
    return document.getElementById(id);
}

// Nội dung trong task
function contentFromTask() {
    var _task = getEle("newTask").value;
    return _task
}

getLocalStorage();



// Tạo bảng toDo
function createTableToDo(arr) {
    var tableToDo = "";
    for (var i = 0; i < arr.length; i++) {
        tableToDo +=
            `
            <li> <span> ${arr[i].task} </span>
                <span>
                <button class="icon__fontAwesome" onclick="deleteTask(${arr[i].id})"><i class="fas fa-trash-alt"></i></button> 
                <button class="icon__fontAwesome" onclick="changeTask(${arr[i].id})" ><i class="far fa-check-circle"></i></button>
                </span>
                </li>
            `;
    }
    getEle("todo").innerHTML = tableToDo
        // getEle("todo").style.display = "block"
        // getEle("completed").style.display = "none"



}

// Tạo bảng Completed: 
function createTableCompleted(arr) {
    var tableCompleted = "";
    for (var i = 0; i < arr.length; i++) {
        tableCompleted +=
            `
                <li> <span id="txtCompleted"> ${arr[i].task} </span>
                <span>
                <button class="icon__fontAwesome" id="txtToDo" onclick="deleteTask(${arr[i].id})"><i class="fas fa-trash-alt"></i></button> 
                <button class="icon__fontAwesome" onclick="changeTask(${arr[i].id})" ><i class="far fa-check-circle"></i></button>
                </span>
                </li>
            `;
    }
    getEle("completed").innerHTML = tableCompleted
        // getEle("todo").style.display = "none"
        // getEle("completed").style.display = "block"



}

// Thêm task
function addTask() {
    var content = new Task(contentFromTask());
    if (content.task === "") {
        alert("Task Empty!")
    } else {
        alert("Add success!")
        taskList.addTask(content);
        createTableToDo(taskList.arr);
        setLocalStorage();
    }
    console.log(content);
}

// Chuyển Task
function changeTask(arr) {
    var content = new Task(contentFromTask());

    if (content.status == false) {
        content.status = true
        createTableCompleted(taskList.arr)

    }
};
// Xóa Task
function deleteTask(arr) {
    taskList.deleteTask(arr);
    createTableToDo(taskList.arr);
    createTableCompleted(taskList.arr)
    setLocalStorage();
}










// Set local
function setLocalStorage() {
    var arrString = JSON.stringify(taskList.arr)
    localStorage.setItem("TASK", arrString)
}

// Get local
function getLocalStorage() {
    if (JSON.parse(localStorage.getItem("TASK"))) {
        taskList.arr = JSON.parse(localStorage.getItem("TASK"));
        createTableToDo(taskList.arr);
    }
}