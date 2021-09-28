const axios = require('axios');

const fetchPRs = async (owner, repo) => {
    const prData = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open`)
    return prData;
}


module.exports = {
    fetchPRs
}