const api = require('./api');

const urlParser = (url) => {
    const repoArr = url.split("/")
    const [,,,owner, repoVal] = repoArr
    return [owner, repoVal]
}

const commitCounter = async (prArr) => {
    const commitObj = await prArr.reduce(async (obj, pr) => {
        const results = await obj;
        const commitCount = await api.fetchCommits(pr.commits_url);
        results[`${pr.number}`] = commitCount
        return results
    }, {})

    return commitObj
}

const mainProcess = async (repository) => {
    try{
        const repoArray = urlParser(repository)
        const prData = await api.fetchPRs(repoArray[0], repoArray[1])
        const responseData = await commitCounter(prData.data);
        return responseData;
    } catch(error){
        console.log(error)
    }
} 

const handler = async (event, context, callback,) => {
    const repo = event.queryStringParameters.repository

    try{
        const response = await mainProcess(repo)
        console.log(response);
        return response
    } catch(err){
        console.log(err);
        return callback(500, "Error while processing repository URL.")
    }
}

module.exports = {
    handler,
    urlParser,
}