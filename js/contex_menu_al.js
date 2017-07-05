var menu = new gui.Menu();











if (dev_mode===1){
menu.append(new gui.MenuItem({
label: 'Dev Tools',
click: function() {
//alert(win.isDevToolsOpen());
//temp 1 Not working
// if (win.isDevToolsOpen()) {
// win.closeDevTools();
// }else if (dev_mode==1){win.showDevTools();
// }
win.showDevTools();


}
}));
}


if (dev_mode==1){
menu.append(new gui.MenuItem({
label: 'Reload',
click: function() {

win.reload();
}
}));
}





menu.append(new gui.MenuItem({
label: 'Quit',
click: function() {
close();
}
}));







document.body.addEventListener('contextmenu', function(ev) { 
  ev.preventDefault();
  // Popup at place you click
  menu.popup(ev.x, ev.y);
  return false;
}, false);

function myExit()
{
close();
}

//////////////////////////////////////////////////////////////////////////////////////
// Create a tray icon
var tray = new gui.Tray({ title: 'Tray', icon: 'img/app-draw.png' });

// Give it a menu
var menu_tray = new gui.Menu();
//menu_tray.append(new gui.MenuItem({ type: 'checkbox', label: 'box1' }));
// menu_tray.append(new gui.MenuItem({
// label: 'Toggle FullScreen',
// click: function() {
// win.toggleFullscreen();
// }
// }));


menu_tray.append(new gui.MenuItem({
label: 'Dev Option',
click: function() {
//alert(win.isDevToolsOpen());
//temp1 Not Working 
// if (win.isDevToolsOpen()) {
// win.closeDevTools();
// }else if (dev_mode==1){}
win.showDevTools();


}
}));

menu_tray.append(new gui.MenuItem({
label: 'Quit',
click: function() {
close();
}
}));


tray.menu = menu_tray;
