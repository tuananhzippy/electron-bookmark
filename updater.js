const { autoUpdater } = require('electron-updater');

//Enable logging
const log = require("electron-log");
log.transports.file.level = "info";
autoUpdater.logger = log;

//Check for updates
exports.check = () => {
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('error', (error) => {
        log.error("Auto Update Error:", error);
    });
    
    autoUpdater.on('checking-for-update', (info) => {
        log.info("Checking For Update");
    });

    autoUpdater.on('update-available', (info) => {
        log.info("Update Available:");
    });

    autoUpdater.on('update-not-available', (info) => {
        log.info("Update Not Available:");
    });

    autoUpdater.on('download-progress', (progress) => {
        log.info(`Download speed ${progress.bytesPerSecond} - Downloaded ${progress.percent}% (${progress.transferred} / ${progress.total}) `);
    });

    autoUpdater.on('update-downloaded', () => {
        log.info("Update downloaded, will install now");
        autoUpdater.quitAndInstall();
    });
}