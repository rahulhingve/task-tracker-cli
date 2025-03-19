#!/usr/bin/env node

const fs = require("fs");

const args = process.argv.slice(2);
const command = args[0];

// console.log(args);
// const inquirer = require("inquirer");

// const { up } = require("inquirer/lib/utils/readline");
const dataFilePath = "./rahul.json";
let dataFile;


// ?check if file exists or not 

if(!fs.existsSync(dataFilePath)){
  


    console.log("database not found");
    fs.writeFileSync(dataFilePath,JSON.stringify({todos:[]}));    
    console.log("database created");
    dataFile = require(dataFilePath);

}else{
    dataFile = require(dataFilePath);
    console.log("database found");  

}

function commandHandler(){
    console.log('Command:', command);
    console.log('All args:', args);

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
            const id = parseInt(args[1]);
            if(!id){
                console.log("Please provide a Todo id");
                return; 
            }    
            deleteTodo(id);
            break;
        default:
            console.log("Invalid command");
            break;  
            
   }

}

// # Adding a new task
// task-cli add "Buy groceries"
// # Output: Task added successfully (ID: 1)
const addTodo = (desc)=>{

    //1st
    const data = fs.readFileSync(dataFilePath, 'utf8');
    // 2nd
    const jsonData = JSON.parse(data);


    const newTodo = {"id":jsonData.todos.length+1,"description":desc,"status":"pending","createdAt":new Date().toISOString(),"updatedAt":new Date().toISOString()}

    //3rd
    jsonData.todos.push(newTodo);
//4th
    fs.writeFileSync(dataFilePath,JSON.stringify(jsonData,null,2));

    console.log(desc + " Added successfully in Todo list ID: "+jsonData.todos.length);
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

    const todoIndex = jsonData.todos.findIndex(todo => todo.id == id);
    if(todoIndex === -1){
        console.log("Invalid id");
        return;
    }
    jsonData.todos.splice(todoIndex,1);

    fs.writeFileSync(dataFilePath,JSON.stringify(jsonData,null,2));
    console.log("Todo ID: " +id+ " deleted successfully");
}


commandHandler();


// console.log(JSON.stringify(dataFile.todos));


