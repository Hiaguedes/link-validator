import chalk from 'chalk'
import { promises, readFileSync } from 'fs'
import { resolve } from 'path'
import log, { colors } from './log-colors.js'


const readUTF8File = (path: string) => {
    console.log(chalk.magenta(`lendo arquivo que esta em ${resolve(path)}`));
    promises.readFile(path, 'utf-8').then((text) => {
        log().success(text);
    })
    .catch(err => {
        throw new Error(colors.red(err?.message));       
    })
}

const asyncReadUTF8File = async (path: string) => {
    console.log(chalk.magenta(`lendo arquivo que esta em ${resolve(path)}`));
    try {
        const text =  await promises.readFile(path, 'utf-8');
        log().success(text)
    
        return text
    } catch(e){
        throw new Error(colors.red(e?.message)); 
    }
}

try {
    asyncReadUTF8File('src/arquivos_exemplo/file.md');
} catch (e){
    console.error(e)
}
finally {
       log().info('Programa finalizado')
    
}