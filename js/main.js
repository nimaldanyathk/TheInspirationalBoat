const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,  // For secure EmailJS use
      preload: path.join(__dirname, 'preload.js') // Optional preload (if needed)
    },
  });

  mainWindow.loadFile('../index.html');

  const menuTemplate = [
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Welcome Page 🛶',
          click: () => {
            mainWindow.loadFile('../index.html');
          },
        },
        {
          label: 'Puzzle Page 🧩',
          click: () => {
            mainWindow.loadFile('../pages/puzzle.html');
          },
        },
        {
          label: 'Links Page 🔗',
          click: () => {
            mainWindow.loadFile('../pages/links.html');
          },
        },
        {
          label: 'Newsletter 📬',
          click: () => {
            mainWindow.loadFile('../pages/newsletter.html');
          },
        },
        {
          label: 'Copyright Page ©️',
          click: () => {
            mainWindow.loadFile('../pages/copyright.html');
          },
        },
      ],
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.reload();
          },
        },
        {
          label: 'Back',
          accelerator: 'CmdOrCtrl+Left',
          click: () => {
            if (mainWindow.webContents.canGoBack()) {
              mainWindow.webContents.goBack();
            }
          },
        },
        { type: 'separator' },
        { role: 'quit', label: 'Exit' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            console.log('About clicked');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});