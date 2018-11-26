const EventEmitter = require('events');

class DirWatcher extends EventEmitter {
  constructor (path, delay) {
    super();
    const chokidar = require('chokidar');
    this.watcher = chokidar.watch(path + '/*.csv', {
      followSymlinks: false,
      cwd: '.',
      usePolling: true,
      binaryInterval: delay
    });
    this.watcher
      .on('change', (path) => {
        this.emit('dirwatcher:changed', path);
      });
  }
}

const a = new DirWatcher('./data', 100);
a.startWatch();
a.on('dirwatcher:changed', data => console.log('data = ', data));
