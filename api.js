const axios = require('axios');

const fetchPRs = async (owner, repo) => {
    const prData = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open`)
    return prData;
}

const fetchCommits = async (commitsURL) => {
    const commitArr = await axios.get(commitsURL)
    return commitArr.data.length || 0
}

module.exports = {
    fetchPRs,
    fetchCommits
}