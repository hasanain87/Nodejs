// complete the yargs command to ensure it meets the criteria outlined in the instructions
// - needs a location command
// - needs to include help support
const yargs = require('yargs');
const app = require('./app.js');
yargs
    .usage('$0: Usage <cmd> [options]')
    // add the 'play' command
    .command({
        command: 'locations',
        desc: 'fetches locations',
        handler: argv => {
            app.locations();
        }
    })
    // add a help menu to assist the user in understanding our CLI
    .help('help').argv;