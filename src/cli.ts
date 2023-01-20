import { extname } from 'path'
import { colors } from './log-colors.js';
import { lstatSync, promises } from 'fs'

const getFilePathFromArgs = async () => {
    try {
        const filePath = process.argv[2];
    
        if(!filePath){
            throw new Error(colors.red('Por favor especifique um arquivo ou diretorio com arquivos markdown pra ser lido'))
        }
    
        if(lstatSync(filePath).isDirectory()){
    
            const arquivosDiretorio = await promises.readdir(filePath);
    
            const arquivosMD = arquivosDiretorio
            .filter(arquivo => extname(arquivo) === '.md')
            .map((arquivo) => {
                return filePath + '/' + arquivo
            });
    
            if(!arquivosMD){
                throw new Error(colors.red('Por favor adicione arquivos markdown dentro do diretorio'))
            }
    
            return arquivosMD;
    }
    return filePath;
        } catch(e){
            if(e.code === 'ENOENT'){
                throw new Error(colors.red('Arquivo nao encontrado'))
            }
    }

    }

export default getFilePathFromArgs;

