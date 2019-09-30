const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch('9JZ8KBSETQ', 'ad297cac926002b5dc094ef1be2ec656');
export const searchIndex = algoliaClient.initIndex('dev_titles');
