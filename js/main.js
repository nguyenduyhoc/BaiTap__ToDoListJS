// Global:
var taskList = new TaskList();
var validation = new Validation();


function getEle(id) {
    return document.getElementById(id);
}

// Nội dung trong task
function contentFromTask() {
    var _task = getEle("newTask").value;
    var isValid = true;
    isValid &= validation.kiemTraRong(_task) && validation.kiemTraTrungTen(_task, "(*) Đã có Task trùng", taskList.arr)

    if (isValid) {
        var task = new Task(
            _task,
        );
        return task
    }
    return null
}

getLocalStorage();



// Tạo bảng 
function createTable(arr) {
    var tableToDo = "";
    var tableCompleted = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].status == false) {
            tableToDo +=
                `
            <li> <span> ${arr[i].task} </span>
                <div class="buttons">
                <button class="remove" onclick="deleteTask(${arr[i].id})"><i class="fas fa-trash-alt"></i></button> 
                <button class="complete" onclick="changeTask(${arr[i].id})" ><i class="far fa-check-circle"></i></button>
                </div>
            `;

        } else {
            tableCompleted +=
                `
                <li> <span id="txtCompleted"> ${arr[i].task} </span>
                <div class="buttons">               
                <button class="remove" onclick="deleteTask(${arr[i].id})"><i class="fas fa-trash-alt"></i></button> 
                <button class="complete" onclick="changeTask(${arr[i].id})" ><i class="fas fa-check-circle"></i></button>
                </div>
            `;
        }
    }
    getEle("completed").innerHTML = tableCompleted
    getEle("todo").innerHTML = tableToDo
}


// Thêm task
function addTask() {
    var content = contentFromTask()
    if (content !== null) {
        taskList.addTask(content);
        createTable(taskList.arr)
        setLocalStorage();
    }
}

// Chuyển Task
function changeTask(maId) {
    alert("Change Status Success!")
    taskList.updateTask(maId);
    createTable(taskList.arr);
    setLocalStorage();
}

// Xóa Task
function deleteTask(arr) {
    alert("Delete Status Success!")
    taskList.deleteTask(arr);
    createTable(taskList.arr);
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
        createTable(taskList.arr);
    }
}