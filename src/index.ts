import chalk from 'chalk'
import { promises, readFileSync } from 'fs'
import { resolve } from 'path'
import { tuppleNameAndLinkArr } from './link-pattern.js'
import log, { colors } from './log-colors.js'
import getFilePathFromArgs from './cli.js'

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
    (async() => {
        const text = await asyncReadUTF8File(getFilePathFromArgs());
        console.log(tuppleNameAndLinkArr(text).links)

    })()
} catch (e){
    console.error(e)
}
finally {
       log().info('Programa finalizado')
    
}