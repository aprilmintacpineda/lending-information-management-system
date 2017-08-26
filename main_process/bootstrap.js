import './events';

import { app, dialog, ipcMain, BrowserWindow } from 'electron';
import url from 'url';
import path from 'path';
import Database from './Database';

let mainScreen = null;
let mainScreenShown = false;
let splashScreen = null;

function createSplashScreen() {
  // create the splash screen
  splashScreen = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    icon: path.join(__dirname, '../app/images/icon.png')
  });

  splashScreen.loadURL(url.format({
    pathname: path.join(__dirname, '../app/splash.html'),
    slashes: true,
    protocol: 'file'
  }));

  splashScreen.on('closed', closingEvent => {
    if(!mainScreenShown) {
      app.quit();
    }
  });
}

function createMainScreen() {
  // create the main screen
  mainScreen = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    show: false,
    icon: path.join(__dirname, '../app/images/icon.png')
  });

  // load the main.html
  mainScreen.loadURL(url.format({
    pathname: path.join(__dirname, '../app/main.html'),
    protocol: 'file',
    slashes: true
  }));

  mainScreen.on('closed', () => {
    mainScreen = null;
  });

  mainScreen.once('ready-to-show', () => {
    mainScreen.maximize();
    mainScreenShown = true;
    splashScreen.close();
    mainScreen.show();

    // open devtools on startup
    mainScreen.webContents.openDevTools();
  });
}

app.on('ready', () => {
  // create the splash screen first
  createSplashScreen();

  // check to see if sqlite file exists
  Database.authenticate()
  .then(() => {
    // if SQLite database exists create the main screen
    createMainScreen();
  })
  .catch(err => {
    // show error message
    dialog.showErrorBox('Missing Dependency', 'The SQLite Database located on database directory was not found. Please contact your developer for more information about this: ' + err);
    app.quit();
  });
});

// terminate all processes
app.on('window-all-closed', () => {
  app.quit();
});