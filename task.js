const Importer = require('./importer');

// eslint-disable-next-line no-unused-vars
const yargs = require('yargs')
  .usage('$0 <cmd> [args]')
  .command(
    'listen [path] [delay] [outPath]',
    'Track for .csv file change in the folder, specified by [path], ' +
    'with given [delay] and creates a copy of the file in .json format ' +
    'in the folder, specified by [outPath].',
    {},
    function checkArgsAndListen (argv) {
      if (argv.path && argv.delay && argv.outPath) {
        const importer = new Importer(argv.path, argv.delay);
        importer.listen(argv.outPath);
      } else {
        throw new Error('Args cannot be empty');
      };
    })
  .demandCommand(1, 'You need at least one command before moving on.')
  .help()
  .argv;
