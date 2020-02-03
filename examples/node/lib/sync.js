const colors = require('colors');

module.exports = async function (client) {
    console.log('SYNC BANK');
    console.log('------------------');
    try {
        await client.syncBank();
    } catch (e) {
        console.error(e);
    }
};
