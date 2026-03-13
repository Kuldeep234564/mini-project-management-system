const PROJECT_API = "http://localhost:5000/projects"; // base API URL for projects


// create a new project
function createProject(){

const name = document.getElementById("name").value; // get project name from input
const description = document.getElementById("desc").value; // get project description

// send POST request to backend
fetch(PROJECT_API,{
method:"POST",
headers:{
"Content-Type":"application/json" // sending JSON data
},
body:JSON.stringify({name,description}) // convert data to JSON
})
.then(res=>res.json())
.then(data=>{
alert("Project Created"); // show success message
loadProjects(); // refresh project list
});

}


// load all projects from backend
function loadProjects(){

fetch(PROJECT_API)
.then(res=>res.json())
.then(data=>{

const list=document.getElementById("projects"); // project list element

list.innerHTML=""; // clear existing list

data.forEach(p=>{

const li=document.createElement("li"); // create list item

li.innerText = "ID: "+p.id+" | "+p.name; // show project id and name

list.appendChild(li); // add item to list

});

});

}


// create a task for a specific project
function createTask(){

const projectId = document.getElementById("projectId").value; // get project id

// task object from form inputs
const task = {

title: document.getElementById("title").value,

description: document.getElementById("taskdesc").value,

status: document.getElementById("status").value,

priority: document.getElementById("priority").value,

due_date: document.getElementById("due_date").value

};

// send POST request to create task
fetch(`http://localhost:5000/projects/${projectId}/tasks`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(task)

})

.then(res=>res.json())

.then(data=>{
alert("Task Created"); // confirmation
});

}


// load tasks for selected project
function loadTasks(){

const projectId = document.getElementById("projectId").value; // get project id

fetch(`http://localhost:5000/projects/${projectId}/tasks`)

.then(res=>res.json())

.then(data=>{

const table=document.getElementById("tasks"); // tasks table

table.innerHTML=""; // clear existing rows

data.forEach(t=>{

const row=document.createElement("tr"); // create table row

row.innerHTML=`
<td>${t.id}</td>
<td>${t.title}</td>
<td>${t.status}</td>
<td>${t.priority}</td>
<td>${t.due_date}</td>
`;

table.appendChild(row); // add row to table

});

});

}

// load projects when page loads
loadProjects();