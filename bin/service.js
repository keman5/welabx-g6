#!/usr/bin/env node

const Service = require('./cli-service/service');

const service = new Service();

// npm run dev -dev / npm run build -test
const command = process.argv.slice(2)[0]; // dev/build
// {"remain":[],"cooked":["run","build","-test"]}
const rawArgs = JSON.parse(process.env.npm_config_argv).cooked;

const args = rawArgs.length > 2 ? rawArgs[2].replace('-', '') : (command === 'build' ? 'prod' : 'test');

service.run(command, args).catch(error => {
    console.log(error);
    process.exit(1);
});
