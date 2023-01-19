const LinkPattern = /\[(.*?)\]\((https?:\/\/.*?)\)/g

const identifyMatchesOnMarkdownFile = (text: string) => {
    return text.match(LinkPattern);
}

const tuppleNameAndLinkArr = (text: string) => {
    let links = [];
    let names = [];
    let raw = []
    let match;

    while((match = LinkPattern.exec(text)) != null){
        raw.push([match[1], match[2]]);
        names.push(match[1]);
        links.push(match[2]);
    }
    
    return {
        links,
        names,
        raw,
    };
}

export { identifyMatchesOnMarkdownFile, tuppleNameAndLinkArr }