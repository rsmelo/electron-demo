const { app, Menu } = require('electron');
const isWindows = process.platform === 'win32';

const { showMessage, showSaveDialog, showOpenDialog } = require('./dialogs');

function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? 'File' : app.getName(),
      submenu: [
        {
          label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
          acceletator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall'}
      ]
    },
    {
      label: 'Say Hello',
      click() {
        showMessage(mainWindow);
      }
    },
     {
      label: 'Save Memory Usage Info',
      click() {
        showSaveDialog(mainWindow);
      }
    },
     {
      label: 'Open File',
      click() {
        showOpenDialog(mainWindow);
      }
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = {
  setMainMenu
};
