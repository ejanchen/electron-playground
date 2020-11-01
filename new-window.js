const electron = require('electron')
const remote = electron.remote;
// Import the ipcRenderer Module from Electron 
const { ipcRenderer } = require('electron')
var input = document.querySelector('input');
var submit = document.getElementById('submit');

// Adding Click EventListener to the Button 
submit.addEventListener('click', function () {
    console.log(input.value);

    // Calling the ipcRenderer.send() 
    // To send the value from the input tag with 
    // a Unique Key to the main process 
    // Asynchronously 
    ipcRenderer.send('update-value', input.value);
    remote.getCurrentWindow().close();
});

// ipcRenderer.on('updateValue', (event, arg) => {
//     console.log(arg)
// })


// const { ipcRenderer } = require('electron')
// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // 印出 "pong"

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg) // 印出 "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')