const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

function showMessage(browserWindow) {
  dialog.showMessageBox(browserWindow, {
    type: 'info',
    // icon: nativeImage.createFromPath(),
    message: 'Hello',
    detail: 'just a friendly meow.',
    buttons: ['Meow', 'Close'],
    defaultId: 0
  }, (clickedIndex) => {
    console.log(clickedIndex);
  });
}

function showSaveDialog(browserWindow) {
  dialog.showSaveDialog(browserWindow, {
    defaultPath: path.join(app.getPath('downloads'), 'memory-info.txt')
  }, (filename) => {
    if (filename) {
      const memInfo = JSON.stringify(process.getProcessMemoryInfo(), null, 2);
      fs.writeFile(filename, memInfo, 'utf8', (err) => {
        if (err) {
          dialog.showErrorBox('Save Failer', err.message);
        }
      });
    }
  });
}

function showOpenDialog(browserWindow) {
  dialog.showOpenDialog(browserWindow, {
    defaultPath: app.getAppPath('downloads'),
    filters: [
      { name: 'Text Files', extensions: ['txt']}
    ]
  }, (filepaths) => {
    if (filepaths) {
      console.log(filepaths, fs.readFileSync(filepaths[0], 'utf8'));
    }
  });
}
module.exports = {
  showMessage,
  showSaveDialog,
  showOpenDialog,
};
