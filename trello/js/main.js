//**************************************************************************************************
//object of Task class creates new task card and its createNode() method places it on HTML
class Task {
    constructor(category="backlog",
                label="green",
                header="",
                description="",
                dueDate="",
                taskId=Math.random()
    ) {
        this.category=category;
        this.label=label;
        this.header=header;
        this.description=description;
        this.dueDate=dueDate;
        this.taskId=taskId;
    }

    createNode(){
        let task=document.createElement("div");
        task.setAttribute("class","task");
        task.draggable=true;
        task.setAttribute("ondragstart","this,drag(event)");

        task.id=this.taskId.toString();

        let color=document.createElement("div");

        color.setAttribute("class","task-color");
        color.style.backgroundColor=this.label;
        task.appendChild(color);

        let name=document.createElement("p");
        name.setAttribute("class","task-name");
        name.innerText=this.header;
        task.appendChild(name);

        let description=document.createElement("p");
        description.setAttribute("class","task-description");
        description.innerText=this.description;
        task.appendChild(description);

        let time=document.createElement("div");
        time.setAttribute("class","task-time-container");

        let timeIcon=document.createElement("i");
        timeIcon.setAttribute("class","far icon fa-clock");
        time.appendChild(timeIcon);

        let dueDate=document.createElement("p");
        dueDate.setAttribute("class","task-due-date");
        dueDate.innerText=this.dueDate.toString();
        time.appendChild(dueDate);


        let deleteContainer=document.createElement("div");
        deleteContainer.addEventListener("click",function (event) {
            window.event.cancelBubble = true
            categories[event.target.closest(".card").id]=
                categories[event.target.closest(".card").id].
                filter((item)=>item.taskId.toString()!==event.target.closest(".task").id);
            event.target.closest(".card").removeChild(event.target.closest(".task"));
            localStorage.setItem('categories', JSON.stringify(categories));
        });
        let deleteIcon=document.createElement("i");
        deleteIcon.setAttribute("class","far icon fa-trash-alt");
        deleteContainer.appendChild(deleteIcon);
        time.appendChild(deleteContainer);

        task.appendChild(time);
        task.addEventListener("click",function (event) {
            modalCreate=false;
            editingTask=event.target.closest(".task");
            inputSelect.style.display="none";
            modal.style.display = "block";
        });
        document.getElementById(this.category).appendChild(task);
    }

}

//*****************************************************************************************
let categories={
    backlog:[],
    todo:[],
    progress:[],
    done:[]
};
//**************************************************************************************************
//Loading content from local storage
let retrievedObject = localStorage.getItem('categories');

if(JSON.parse(retrievedObject)){
    categories=JSON.parse(retrievedObject);
    for (let cat in categories) {
        categories[cat].forEach(function (item) {
            item=new Task(item.category,item.label,item.header,item.description,item.dueDate,item.taskId);
            item.createNode()
        });
    }
}
//**************************************************************************************************
const modal = document.getElementById("myModal");
const buttons = Array.from(document.getElementsByClassName("add-card-btn"));
const span = document.getElementsByClassName("close")[0];
const selectCategory=document.getElementById("category");
const addSubmit=document.getElementById("submit-button");
const inputSelect=document.getElementById("input-select");
let modalCreate=true;
let editingTask;
addSubmit.addEventListener("click",()=>{
    modal.style.display = "none";
    //******************************************************************
    //Inputs
    let category=document.getElementById("category").value;
    let label=document.getElementById("color-picker").value;
    let header=document.getElementById("header-input").value;
    let description=document.getElementById("description-input").value;
    let dueDate=document.getElementById("date-input").value;
    //*******************************************************************
    if(modalCreate){
        let createTask=new Task(category,label,header,description,dueDate);
        createTask.createNode();
        categories[category].push(createTask);
    }
    else{
        let editingItem=categories[editingTask.closest(".card").id].find((item)=>editingTask.id===item.taskId.toString());
        editingItem.label=editingTask.childNodes[0].style.backgroundColor=label;
        editingItem.header=editingTask.childNodes[1].innerText=header;
        editingItem.description=editingTask.childNodes[2].innerText=description;
        console.log(editingTask.childNodes[3].childNodes[1]);
        editingItem.dueDate=editingTask.childNodes[3].childNodes[1].innerText=dueDate;
    }
    localStorage.setItem('categories', JSON.stringify(categories));
});

buttons.forEach(btn=>{
    btn.onclick = function(event) {
        modalCreate=true;
        //It is used for modal window select option, to get the clicked buttons container category
        selectCategory.selectedIndex=[...selectCategory.children].findIndex((item)=>{
            return "option-"+event.target.closest(".card").id===item.id;
        });
        inputSelect.style.display="flex";
        modal.style.display = "block";
    };
});

//**********************************************************************
//Hide Modal Window
span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
//**********************************************************************

let draggedItemsContainer;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    draggedItemsContainer=ev.target.closest(".card").id;
}
let task;
let dropEvent;
function dropModify(item)
{
    if(item.taskId.toString()!==task.id){
        return true;
    }
    item.category=dropEvent.target.closest(".card").id;
    categories[dropEvent.target.closest(".card").id].push(item);
    return false
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    task=document.getElementById(data);
    ev.target.closest(".card").appendChild(document.getElementById(data));
    dropEvent=ev;
    if(ev.target.closest(".card").id!==draggedItemsContainer){
        categories[draggedItemsContainer]=categories[draggedItemsContainer].filter(dropModify);
    }
    localStorage.setItem('categories', JSON.stringify(categories));
}
//**************************************************************************************

