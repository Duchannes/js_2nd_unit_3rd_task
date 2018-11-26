const EventEmitter = require('events');
const fs = require('fs');
const chokidar = require('chokidar');

class DirWatcher extends EventEmitter {
  constructor () {
    super();
    this.watcher = null;
  }

  // Function that listens to the events of chokidar and generate own events after that
  watch (path, delay) {
    console.log('Start watching');
    this.watcher = chokidar.watch(path + '/*.csv', {
      followSymlinks: false,
      usePolling: true,
      interval: delay,
      binaryInterval: delay
    });
    this.watcher.on('change', file => this.emit('dirwatcher:changed', fs.realpathSync(file)));
  }

  // Function that stop to listens chokidar
  stopWatch () {
    this.watcher.close();
    this.watcher = null;
    console.log('Stop watching');
  }
}

module.exports = DirWatcher;
