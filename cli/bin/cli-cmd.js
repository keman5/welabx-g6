#!/usr/bin/env node

const program = require("commander");
const actionMap = require('./actions/actionMap');
const package = require('../package.json');

Object.keys(actionMap).forEach(action => {

    const actions = actionMap[action];

    if (action === 'create') {
        program
            .command('create <app-name> [options...]')
            .description(actions.description)
            // .alias(actions.alias)
            .action((appName, {}, ...args) => {
                actions.action(appName, args[0]);
            });

    } else if (action === 'inspect'){
        program
            .command('run <command> [env]')
            .description(actions.description)
            .action((run, env, ...args) => {
                actions.action(run, env, args[0]);
            });
    }
});

program.on('--help', () => {
    console.log(`\n例如:
    - 创建新项目:
        welabx-cli create
        welabx-cli create [vue-app]
        welabx-cli create [-l|--local, -i|--install] [myproject]
        (-l|--local is optional, to disable check the update when create app)
        (-i|--install is optional, to install dependencies after create app)
    `);
});

program
    .version(package.version, "-v, --version")
    .parse(process.argv);
