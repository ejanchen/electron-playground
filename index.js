// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// const electron = require('electron');
// BrowserWindow Instance is a part of the Main Process,  
// To fetch its instance from the Main Process, 

const electron = require('electron')
const path = require('path')
// Use electron.remote 
const BrowserWindow = electron.remote.BrowserWindow

let button = document.getElementById('new');

button.addEventListener('click', function (event) {
    // Linking to new-window.html 
    const newPath = path.join(__dirname, 'new-window.html');
    let win = new BrowserWindow({
        // To display the Default Frame of the Window  
        // consisting of default Menu 
        frame: true,

        // Makes the Renderer Window Sticky,  
        // Will always stay on top despite focus change  
        alwaysOnTop: true,
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }

    });

    // Destroy the BrowserWindow Instance on close  
    win.on('close', function () {
        win = null;
    });

    // win.webContents.openDevTools(); 
    win.loadURL(newPath);
    win.show();

    win.webContents.openDevTools()

});


var update = document.getElementById('value');
var received = document.getElementById('received')
var button2 = document.getElementById('send');

const { ipcRenderer } = require('electron')

ipcRenderer.on('updateValue', function (event, arg) {
    console.log(arg);
    // Updating the value of the HTML Tag with the Data Received 
    // In Case the Data Received is not a Number and is  
    // some arbitary Value,display will show as NaN (Not a Number) 
    update.innerHTML = arg;
});


// Adding Click EventListener to button2 
// For Synchronous Message Transfer we are using the 'ipcRenderer.sendSync' method 
// We do not need to Implemented any Callbacks to handle the Response 
// The 'ipcRenderer.sendSync' method will return the data from the Main Process 
button2.addEventListener('click', function (event) {

    // Setting the Key and the Message to be sent to the Main Process 
    const data = ipcRenderer.sendSync('synchronous', 'Message to Main Window');

    // Setting the Data received to the <span> tag 
    received.innerHTML = data;
}); 
