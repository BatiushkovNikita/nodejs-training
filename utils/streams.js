#!/usr/bin/env node

const program = require('commander');
const through = require('through2');
const util = require('./utils');
const fs = require('fs');
const Converter = require('csvtojson').Converter;
const csvConverter = new Converter({
    constructResult: false,
    toArrayString: true
});
const {promisify} = require('util');
const readdir = promisify(fs.readdir);
const appendFile = promisify(fs.appendFile);
const readFile = promisify(fs.readFile);

const resultPath = './data/css/​bundle.css';
const appendixPath = './data/css/nodejs-homework3.css';


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
    if (!filePath) program.help();
    fs.createReadStream(filePath)
        .on('error', function () {
            console.error('File not found: ' + filePath);
            program.help();
        })
        .pipe(process.stdout);
}

function convertFromFile(filePath) {
    fs.createReadStream(filePath)
        .on('error', function () {
            console.error('File not found: ' + filePath);
            program.help();
        })
        .pipe(csvConverter)
        .pipe(process.stdout);
}

function convertToFile(filePath) {
    fs.createReadStream(filePath)
        .on('error', function () {
            console.error('File not found: ' + filePath);
            program.help();
        })
        .pipe(csvConverter)
        .pipe(fs.createWriteStream(filePath.substring(0, filePath.lastIndexOf('.')) + '.json'));
}

function cssBundler(filePath) {
    console.log(filePath);
    readdir(filePath)
        .then(files => {
            files.forEach(fileName => {
                appendToResult(filePath + '/' + fileName);
            });
            appendToResult(appendixPath);
        })
        .catch(console.error);
}

function appendToResult(filePath) {
    readFile(filePath)
        .then(content => {
            appendFile(resultPath, content);
        });
}

function call(action, value) {
    if (!value) program.help();
    action(value);
}

function start() {
    program
        .name('module3')
        .option('-a, --action <action>', 'action to perform')
        .option('-f, --file <filePath>', 'path to the existing file')
        .option('-p, --path <filePath>', 'path to the existing dir')
        .on('--help', function () {
            console.log('Available actions:');
            console.log('reverse          - reverse string data');
            console.log('transform        - transform string data to uppercase');
            console.log('outputFile       - print the contents of file specified in --file option');
            console.log('convertFromFile  - print the contents of .csv file specified in --file option as json');
            console.log('convertToFile    - convert .csv file specified in --file option to .json');
            console.log('cssBundler       - merge .css files specified in --path directory');
        })
        .parse(process.argv);

    if (program.action === 'reverse') {
        reverse(process.stdin);
    } else if (program.action === 'transform') {
        transform(process.stdin);
    } else if (program.action === 'outputFile') {
        call(outputFile, program.file);
    } else if (program.action === 'convertFromFile') {
        call(convertFromFile, program.file);
    } else if (program.action === 'convertToFile') {
        call(convertToFile, program.file);
    } else if (program.action === 'cssBundler') {
        call(cssBundler, program.path);
    } else {
        program.help();
    }
}

start();
