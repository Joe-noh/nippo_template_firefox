var input = document.getElementById('edit-template');

input.addEventListener('keyup', function onkeyup(event) {
  self.port.emit("entered", input.value);
}, false);

self.port.on('show', function (template) {
  input.value = template;
  input.focus();
});
