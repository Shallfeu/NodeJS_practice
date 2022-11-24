const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title){
    // const notes = require(notesPath)
    // const notes = Buffer.from(butter).toString('utf-8')
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile('./db.json', JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added'))
}

async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding:'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}

async function removeNote(id){
    const notes = await getNotes()
    const newNotes = notes.filter(note => note.id !== id)
    await fs.writeFile('./db.json', JSON.stringify(newNotes))
    console.log(chalk.bgRed('Note has been removed'))
}

async function editNote({id, data}){
    const notes = await getNotes()
    const newNotes = notes.map(note => {
        if(note.id === id) {
            note.title = data.title
        }

        return note
    })

    await fs.writeFile('./db.json', JSON.stringify(newNotes))
    console.log(chalk.bgRed('Note has been edited'))
}

module.exports = {
    addNote, printNotes, removeNote,getNotes, editNote
}