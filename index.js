const api = require('./api');

const dataFetch = async(owner, repo) => {
    const data = await api.fetchPRs(owner, repo);
    return data;
}

const handler = async (owner, repo) => {
    dataFetch(owner, repo)
}

handler('kamranahmedse', 'developer-roadmap')