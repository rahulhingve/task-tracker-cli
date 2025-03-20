#!/usr/bin/env node

const fs = require("fs");
const { start } = require("repl");

const args = process.argv.slice(2);
const command = args[0];


const dataFilePath = "./rahul.json";
let dataFile;


//------------------------------------------------------------------------------------------------------------------------------//

// check if databse exists or not if not create a new one

//------------------------------------------------------------------------------------------------------------------------------//

if(!fs.existsSync(dataFilePath)){
  


    console.log("database not found");
    fs.writeFileSync(dataFilePath,JSON.stringify({todos:[]}));    
    console.log("database created");
    dataFile = require(dataFilePath);

}else{
    dataFile = require(dataFilePath);
    console.log("database found");  

}

//------------------------------------------------------------------------------------------------------------------------------//

// cli handler function to hnadle all commands

//------------------------------------------------------------------------------------------------------------------------------//

function commandHandler(){

    //uncomment below to see the args and command
    // console.log('Command:', command);
    // console.log('All args:', args);

   switch(command){
        case 'add':
            // const description = args.slice(1).join(' ').replace(/"/g, '').trim();
            if(!args[1]){
                console.log("Please provide a Todo description");
                return;
            }
            addTodo(args[1]);
            break;

        case 'update':
            if(!args[1]||!args[2]){
                console.log("Please provide a Todo id and description");
                return;
            }
            updateTodo(args[1],args[2]);
            break;

        case 'delete':
            // parse args[1] to int 
            const delId = parseInt(args[1]);
            if(!delId){
                console.log("Please provide a Todo id");
                return; 
            }    
            deleteTodo(delId);
            break;

        case 'mark-in-progress':

            const markId = parseInt(args[1]);
            if(!markId){
                console.log("Please provide a Todo id");
                return; 
            }    
            markInProgress(markId);
            break;
        case 'mark-done':

            const doneId = parseInt(args[1]);
            if(!doneId){
                console.log("Please provide a Todo id");
                return; 
            }    
            markDone(doneId);
            break;

        case 'list':
            if(args[1] === "done"){
                listDone();
                return;
            }
            if(args[1] === "todo"){
                listPendingTodos();
                return;
            }
            if(args[1] === "in-progress"){
                listInProgressTodos();
                return;
            }
            
            lisAllTodos();   
            break; 

        default:
            console.log("Invalid command");
            break;  
            
   }

}
//------------------------------------------------------------------------------------------------------------------------------//

// functions start from here


//------------------------------------------------------------------------------------------------------------------------------//
// # Adding a new task
// task-cli add "Buy groceries"
// # Output: Task added successfully (ID: 1)
const addTodo = (desc)=>{

    //1st
    const data = fs.readFileSync(dataFilePath, 'utf8');
    // 2nd
    const jsonData = JSON.parse(data);

    // Generate a unique ID
    const newId = jsonData.todos.length > 0 ? Math.max(...jsonData.todos.map(todo => todo.id)) + 1 : 1;

    const newTodo = {"id": newId, "description": desc, "status": "Pending", "createdAt": new Date().toISOString(), "updatedAt": new Date().toISOString()}

    //3rd
    jsonData.todos.push(newTodo);
    //4th
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));

    console.log(desc + " Added successfully in Todo list ID: " + newId);
}

// # Updating and deleting tasks
// task-cli update 1 "Buy groceries and cook dinner"
// task-cli delete 1

const updateTodo = (id,desc)=>{

    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    // check id exists or not by checkin id dont go for length coz it will be wrong

    const todoIndex = jsonData.todos.findIndex(todo => todo.id == id);
    if(todoIndex === -1){
        console.log("Invalid id");
        return;
    }

    jsonData.todos[todoIndex].description = desc;
    fs.writeFileSync(dataFilePath,JSON.stringify(jsonData,null,2));
    console.log("Todo updated successfully");
}

const deleteTodo = (id)=>{

    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    //fix id after deleting id it should reindex
    const todoIndex = jsonData.todos.findIndex(todo => todo.id == id);
    if(todoIndex === -1){
        console.log("Invalid id");
        return;
    }
    jsonData.todos.splice(todoIndex, 1);

    // Reindex the remaining todos
    jsonData.todos.forEach((todo, index) => {
        todo.id = index + 1;
    });

    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
    console.log("Todo ID: " + id + " deleted successfully");
}


const markInProgress = (id)=>{

    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const todoIndex = jsonData.todos.findIndex(todo => todo.id == id);
    if(todoIndex === -1){
        console.log("Invalid id");
        return;
    }
    jsonData.todos[todoIndex].status = "In Progress";
    fs.writeFileSync(dataFilePath,JSON.stringify(jsonData,null,2));
    console.log("Todo ID: " +id+ " marked as In Progress");

}
const markDone = (id)=>{

    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const todoIndex = jsonData.todos.findIndex(todo => todo.id == id);
    if(todoIndex === -1){
        console.log("Invalid id");
        return;
    }
    jsonData.todos[todoIndex].status = "Done";
    fs.writeFileSync(dataFilePath,JSON.stringify(jsonData,null,2));
    console.log("Todo ID: " +id+ " marked as Done");

}

const lisAllTodos = ()=>{
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    console.log(jsonData.todos);

}


const listDone =()=>{
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const doneTodos = jsonData.todos.filter(todo => todo.status === "Done");   
    console.log(doneTodos); 


}
const listPendingTodos =()=>{
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const pendingTodos = jsonData.todos.filter(todo => todo.status === "Pending");   
    console.log(pendingTodos); 


}
const listInProgressTodos =()=>{
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    const inProgressTodos = jsonData.todos.filter(todo => todo.status === "In Progress");   
    console.log(inProgressTodos); 


}


commandHandler();


// console.log(JSON.stringify(dataFile.todos));


