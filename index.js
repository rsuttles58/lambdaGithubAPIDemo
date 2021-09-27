const axios = require('axios');

const apiCall = (owner, repo) => {
    axios
    .get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open`)
    .then((response, error) => {
        if(error){
            console.log(error);
        }

        console.log(response.data[0])
    })
}

const handler = async (owner, repo) => {
    apiCall(owner, repo)
}

handler('kamranahmedse', 'developer-roadmap')