const api = require('./api');

const dataFetch = async(arr) => {
    const data = await api.fetchPRs(arr[0], arr[1]);
    return data;
}

const urlParser = (url) => {
    const repoArr = url.split("/").filter
    const [,,,owner, repoVal] = repoArr
    return [owner, repoVal]
}

const mainProcess = async (repository) => {
        const repoArray = urlParser(repository)
        const prData = await dataFetch(repoArray);
        // console.log(prData.data)
} 

const handler = async (repo) => {
    mainProcess(repo)
}

handler('https://github.com/kamranahmedse/developer-roadmap')