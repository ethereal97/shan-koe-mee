export function showModal({ title, message, icon }, { reject, resolve }) {
  var _m = document.querySelector('.ui.basic.modal');
  
  if (!(_m instanceof HTMLElement)) {
    throw "Modal Element does not exist on DOM"
  }
  
  var _header = _m.querySelector('.header'),
    _content = _m.querySelector('.content');
  
  _header.innerHTML = _content.innerHTML = '';
  
  var _title = document.createElement('span'),
    _message = document.createElement('p'),
    _icon = document.createElement('i');
  
  _icon.className = `ui ${icon || 'window close outline'} icon`;
  _title.innerHTML = ` ${title||'Error'}`;
  _message.innerHTML = message;

  _header.append(_icon);
  _header.append(_title);
  _content.append(_message);

  $('.ui.basic.modal').modal('show');
}

export function disableButton() {
  this.classList.add('loading');
  this.disabled = true;
  var clear = () => {
    this.disabled = false;
    this.removeAttribute('disabled');
    this.classList.toggle('loading');
  };
  this.resolve = clear;
  return this;
}
