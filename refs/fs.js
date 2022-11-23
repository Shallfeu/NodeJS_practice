const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const base = path.join(__dirname, 'temp')

const getContent = () => `\r${process.argv[2] ?? ''}`

async function start(){
    try {
        if(fsSync.existsSync(base)){
            await fs.appendFile(path.join(base, 'logs.txt'), getContent())
            console.log(process.argv)
            const data = await fs.readFile(path.join(base, 'logs.txt'), {encoding: 'utf-8'})
            console.log(data)
        }
        else{
            await fs.mkdir(base)
            await fs.appendFile(path.join(base, 'logs.txt'), getContent())
        }
    }catch (e) {
        console.log('error', e)
    }
}

start()

