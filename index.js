const api = require('./api');

const isURL = url => typeof url === "string" && url.includes("www");

const urlParser = (url) => {
    if(!isURL(url)) return []
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
        const commitData = await commitCounter(prData.data);
        return commitData;
    } catch(error){
        console.log(error)
    }
} 

const handler = async (event, context, callback,) => {
    const repo = event.queryStringParameters.repository
    if ( !repo || repo.length < 15) return callback(500, "repository not included or invalid value passed.")
    try{
        const responseData = await mainProcess(repo)
        const response = {
            "statusCode": 200,
            "body": JSON.stringify(responseData),
            "isBase64Encoded": false
        }
        console.log(responseData)
        return response;
    } catch(err){
        console.log(err);
        return callback(500, "Error while processing repository URL.")
    }
}

module.exports = {
    handler,
    urlParser,
}