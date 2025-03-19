#!/usr/bin/env node

// const yargs  = require("yargs")
// console.log("task tracker cli")
// console.log(process.argv);

// const {argv} = yargs(process.argv)

const inquirer = require("inquirer");


const printNames = async (pokiName) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokiName}`);
    const pokemon = await response.json();
    const moves = pokemon.moves.map(({move})=>move.name);
    console.log(moves.slice(0,5));

};

const prompt = inquirer.createPromptModule();
prompt([{
    type: "input",
    name:"pokemon",
    message:"Enter a pokemon name"
}]).then((answer)=>{
    const pokemon = answer.pokemon;
    printNames(pokemon);
})
