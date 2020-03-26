const { app, BrowserWindow, ipcMain } = require('electron');
const readItem = require('./read-item.js');

ipcMain.on('new-item', (e, itemUrl) => {
    readItem( itemUrl, item => {
        e.sender.send('new-item-success', item)
    });
});

let mainWindow;

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 450, height: 650,
        minWidth: 450, maxWidth: 650, minHeight: 300,
        webPreferences: {
            nodeIntegration: true
        },
        icon: `${__dirname}/icons/64x64.png`
        
    });

    mainWindow.loadFile('renderer/main.html');

    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
