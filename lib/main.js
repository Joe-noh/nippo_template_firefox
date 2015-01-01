var {ActionButton} = require('sdk/ui/button/action');
var {Panel}        = require('sdk/panel');
var tabs           = require('sdk/tabs');
var pref           = require('sdk/simple-prefs');
var notifications  = require('sdk/notifications');
var {viewFor}      = require('sdk/view/core');
var tabUtils       = require('sdk/tabs/utils');

// default preferences
// I don't know why "value" keys in preferences don't work
pref.prefs.username = pref.prefs.username || "お名前を設定してね！"
pref.prefs.tags     = pref.prefs.tags || "日報"
pref.prefs.template = pref.prefs.template || (function () {
/*## 今日の業務

### (1)

### (2)

### (3)


## 明日（来週）の業務内容

1.

2.


## コメント


*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

var button = ActionButton({
  id: "nippo-button",
  label: "終業だ！",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
    },
  onClick: function () {
    var newNippoUrl = "http://pb2015.grouptube.jp/diary/entry";

    tabs.open({
      url: newNippoUrl,
      onReady: function (tab) {
        if (tab.url != newNippoUrl) { return; }

        doc = tabUtils.getBrowserForTab(viewFor(tab)).contentDocument;

        if (doc.getElementById('login') != null) {
          // when redirected to login page
          notifications.notify({
            title: "ログインしてからもう一回！"
          });
          return;
        }

        var titleInput = doc.getElementById('entry_form_title');
        var bodyInput  = doc.getElementById('entry_form_description');
        var tagInput   = doc.getElementById('entry_form_tag');

          console.log(pref.prefs.username);
          console.log(pref.prefs.template);
          console.log(pref.prefs.tags);
      }
    });
  }
});


var editPanel = Panel({
  contentURL:        "./panel/panel.html",
  contentStyleFile:  "./panel/panel.css",
  contentScriptFile: "./panel/panel.js",
  height: 600,
  width:  400,
  onShow: function () {
    editPanel.port.emit('show', pref.prefs.template);
  }
});

editPanel.port.on("entered", function (template) {
  // unefficient but handling onhide doesn't work well
  pref.prefs.template = template;
});

pref.on('template', function () {
  editPanel.show();
});
