const DirWatcher = require('./dirwatcher');
const fs = require('fs');
const jquery = require('jquery-csv');

class Importer {
  constructor (path, delay) {
    this.watcher = new DirWatcher();
    this.watcher.watch(path, delay);
    this.lastChange = {};
  }

  // Function that listens to the events of DirWatcher and, when any .csv file is changed, writes it in a .json format at the specified path
  listen (outPath) {
    this.watcher.on('dirwatcher:changed', (data) => {
      const filename = data.substr(data.lastIndexOf('\\'));
      const path = filename.replace('.csv', '.json');
      this.lastChange = this.csvToJsonParser(data);
      fs.writeFileSync(outPath + path, JSON.stringify(this.lastChange, null, ' '), 'utf-8');
    });
  }

  // Function that stop to listens DirWtcher
  stopImport () {
    this.watcher.stopWatch();
  }

  // Function that converts .csv file to json object
  csvToJsonParser (data) {
    const text = fs.readFileSync(data, 'utf-8');
    return jquery.toObjects(text, { headerIndex: 1 });
  }

  // A function that returns the contents of the last modified file. (synchronous)
  importSync () {
    return this.lastChange;
  }

  // A function that returns the contents of the last modified file. (asynchronous)
  import () {
    return Promise.resolve(this.lastChange);
  }
}

module.exports = Importer;
