import { promises } from 'fs'
import { resolve } from 'path'
import { tuppleNameAndLinkArr } from './link-pattern.js'
import log, { colors } from './log-colors.js'
import getFilePathFromArgs from './cli.js'

const asyncReadUTF8File = async (path: string) => {
    log().highlight(`lendo arquivo que esta em ${resolve(path)}`);
    try {
        const text =  await promises.readFile(path, 'utf-8');
    
        return text
    } catch(e){
        throw new Error(colors.red(e?.message)); 
    }
}

try {
    (async() => {
        const filePath = await getFilePathFromArgs();

        if(Array.isArray(filePath)){
            filePath.forEach(async (path) => {
                const text = await asyncReadUTF8File(path);
                console.log(tuppleNameAndLinkArr(text).links)
            })
        } else {
            const text = await asyncReadUTF8File(filePath);
            console.log(tuppleNameAndLinkArr(text).links)
        }


    })()
} catch (e){

    console.error(e)

}
finally {
       log().info('Programa finalizado')
    
}