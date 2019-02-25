import commander from 'commander';

commander.version('0.1.0')
    .option('-r, --reverse', 'Reverse')
    .option('transform')
    .option('outputFile')
    .option('convertFromFile')
    .option('convertToFile')
    .parse(process.argv);
