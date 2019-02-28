#!/usr/bin/env node
const program = require('commander');
const through = require('through2');
const stream = through(write, end);
const transformStream = require('./transform');
const util = require('./utils');
const fs = require('fs');
const Converter = require('csvtojson').Converter;

function write(chunk, encoding, done) {
    console.log(chunk);
    this.push(chunk);
    done();
}

function end(done) {
    done();
    console.log('__END__');
}


function reverse(str) {
    str
        .pipe(through(function (buffer, encodding, done) {
            this.push(util.reverse(buffer));
            done();
            process.exit(0);
        }))
        .pipe(process.stdout);
}

function transform(str) {
    str
        .pipe(through(function (buffer, encodding, done) {
            this.push(util.toUpperCase(buffer));
            done();
            process.exit(0);
        }))
        .pipe(process.stdout);
}

function outputFile(filePath) {
    fs.createReadStream(filePath).pipe(process.stdout);
}

function convertFromFile(filePath) {
    let csvConverter = new Converter({constructResult: false});
    fs.createReadStream(filePath)
        .pipe(csvConverter)
        .pipe(process.stdout);
}

function convertToFile(filePath) {
    console.log(filePath);
}

program
    .name('module3')
    .option('-a, --action <action>', 'Action')
    .option('-f, --file', 'File')
    .parse(process.argv);

function call(action) {
    if (program.file && program.args.length) {
        action(program.args[0]);
    } else {
        console.log('no args');
    }
}

if (program.action === 'reverse') {
    reverse(process.stdin);
} else if (program.action === 'transform') {
    transform(process.stdin);
} else if (program.action === 'outputFile') {
    call(outputFile);
} else if (program.action === 'convertFromFile') {
    call(convertFromFile);
} else if (program.action === 'convertToFile') {
    call(convertToFile);
}
