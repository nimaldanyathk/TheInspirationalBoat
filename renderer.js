const { remote, shell } = require('electron');
const { Menu, MenuItem } = remote;

const contextMenu = new Menu();

contextMenu.append(new MenuItem({
  label: 'Go to Puzzle Page 🧩',
  click: () => { window.location.href = 'puzzle.html'; },
}));

contextMenu.append(new MenuItem({
  label: 'Go to Links Page 🔗',
  click: () => { window.location.href = 'links.html'; },
}));

contextMenu.append(new MenuItem({
  label: 'Go to Copyright Page ©️',
  click: () => { window.location.href = 'copyright.html'; },
}));

contextMenu.append(new MenuItem({
  label: 'Back to Welcome Page 🛶',
  click: () => { window.location.href = 'welcome.html'; },
}));

contextMenu.append(new MenuItem({
  label: 'Visit My YouTube 📺',
  click: () => { shell.openExternal('https://youtube.com/@letsdotech'); },
}));

contextMenu.append(new MenuItem({ type: 'separator' }));

contextMenu.append(new MenuItem({
  label: 'Reload Page 🔄',
  click: () => { location.reload(); },
}));

contextMenu.append(new MenuItem({
  label: 'Inspect Element 🔍',
  click: () => {
    remote.getCurrentWindow().webContents.openDevTools();
  },
}));

// Trigger context menu on right click
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  contextMenu.popup({ window: remote.getCurrentWindow() });
});
