var src = document.currentScript.src.split('/');
src.pop();

const BASE_URL = src.join('/');

require([BASE_URL, 'js', 'app'], 'js');

function require(path, ext) {
  if (typeof path === 'string') {
    path = [path];
  }
  
  let module = document.createElement('script');
  
  module.src = path.join('/');
  
  if (ext) {
    module.src += '.' + ext;
  }
  
  module.type = 'module';
  
  document.body.appendChild(module);
}