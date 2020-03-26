
const { BrowserWindow } = require('electron');

let offscreenWindow;

module.exports = (url, callback) => {

    // Create offscreen window
    offscreenWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        show: false,
        webPreferences: {
            offscreen: true
        }
    });

    offscreenWindow.loadURL(url)

    offscreenWindow.webContents.on('did-finish-load', async event => {
        let title = offscreenWindow.getTitle();
        let image = await offscreenWindow.webContents.capturePage();
        let screenshot = image.toDataURL();
        callback({ title, screenshot, url });
        // Clean up
        offscreenWindow.close();
        offscreenWindow = null;
    });
}
