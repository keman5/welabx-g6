#!/usr/bin/env node

const Service = require('./utils/service-cli');

const service = new Service();

// npm run dev
const command = process.argv.slice(2)[0]; // => dev/build

service.run(command).catch(error => {
    console.log(error);
    process.exit(1);
});
