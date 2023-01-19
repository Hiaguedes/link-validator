const getFilePathFromArgs = () => {
    const filePath = process.argv;
    return filePath[2];

}

export default getFilePathFromArgs;

