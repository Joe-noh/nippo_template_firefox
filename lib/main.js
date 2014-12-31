var {ActionButton} = require('sdk/ui/button/action');
var {Panel} = require('sdk/panel');
var pref = require('sdk/simple-prefs');

var button = ActionButton({
  id: "nippo-button",
  label: "終業だ！",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
    },
  onClick: function () {

  }
});


var editPanel = Panel({
  contentURL:        "./panel/panel.html",
  contentStyleFile:  "./panel/panel.css",
  contentScriptFile: "./panel/panel.js",
  height: 300,
  width:  250,
  onHide: function () {
    editPanel.port.emit("save");
    button.state('window', {checked: false});
  }
});

pref.on('editTemplate', function () {
  editPanel.show();
});
