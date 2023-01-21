import fetch from "node-fetch"

export type LinkValidationType = {
    link: string;
    ok: boolean;
    status?: number | undefined
}

const verifyIfLinkIsValidOrNot = async (link: string): Promise<LinkValidationType> => {

    try {
        const res = await fetch(link)

        return {
            link,
            ok: res.ok,
            status: res.status,
        }
        
    } catch (e) {
        return {
            link,
            ok: false,
        }
    }
}

const verifyListOfLinks = async (listLinks: string[]) => {
    const responses = listLinks.map<Promise<LinkValidationType>>(async(link) => {
        return await verifyIfLinkIsValidOrNot(link)
    })
    const res = await Promise.all(responses)

    return [...res]
}

export { verifyListOfLinks, verifyIfLinkIsValidOrNot };