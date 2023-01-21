import fetch from "node-fetch"

const verifyIfLinkIsValidOrNot = async (link: string) => {

    try {
        const res = await fetch(link)
    
        if(res.ok){
            console.log(`${link} passou`)
        }
        
    } catch (e) {
        if(e){
            console.log(`${link} nao passou`)
        }
    }
}

const verifyListOfLinks = async (listLinks: string[]) => {
    await Promise.all(
        listLinks.map(link => {
            verifyIfLinkIsValidOrNot(link)
        })
        );
}


verifyIfLinkIsValidOrNot('https://httpstat.us/404')

export { verifyListOfLinks, verifyIfLinkIsValidOrNot };