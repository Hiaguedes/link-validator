import { promises } from 'fs'
import { resolve } from 'path'
import { tuppleNameAndLinkArr } from './link-pattern.js'
import log, { colors } from './log-colors.js'
import getFilePathFromArgs from './cli.js'
import {verifyIfLinkIsValidOrNot, verifyListOfLinks} from './http-link.js'

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

                const links = tuppleNameAndLinkArr(text).links


                const resLinks = await verifyListOfLinks(links);

                console.log(resLinks)
                return resLinks
                // links.forEach(link => {
                //     verifyIfLinkIsValidOrNot(link)
                // })
            })
        } else {
            const text = await asyncReadUTF8File(filePath);
            console.log(tuppleNameAndLinkArr(text).links)
            const links = tuppleNameAndLinkArr(text).links

            const resLinks =  await verifyListOfLinks(links)

            console.log(resLinks)
            return resLinks
            // links.forEach(link => {
            //     verifyIfLinkIsValidOrNot(link)
            // })
        }


    })()
} catch (e){

    console.error(e)

}
finally {
       log().info('Programa finalizado')
    
}