const 
yargs = require('yargs');
app = require('./App.js');

const flags =yargs .usage('$0: Usage <cmd> [options]')
    // add the 'play' command

    .command({
        command: 'search',
        desc: 'NASA Cool Picture',
        builder: (yargs) => {
             return yargs
            .options('s', {
            alias: 'search',
            describe: 'search for images'
         
        }) 
    },
        handler: (argv) => { 
            app.search(argv.s);
         }
       })
       .command({
        command: 'show',
        desc: 'Show Star Pictures',
        handler: () => app.show()
    })

    // add a help menu to assist the user in understanding our CLI
    .help('help').argv;
