import { x } from './xscript.mjs';
import { config } from './config.mjs';

const utils = {
  init(){
    let obj = {
      email: '',
      password: ''
    },
    password = x('input', {
      class: 'form-item',
      type: 'password',
      placeholder: 'password',
      onkeyup(evt){
        obj.password = evt.target.value
      }
    }),
    email = x('input', {
      class: 'form-item',
      type: 'email',
      placeholder: 'email',
      onkeyup(evt){
        obj.email = evt.target.value
      }
    }),
    twostep = x('input', {
      class: 'form-item hidden dn',
      type: 'text',
      readOnly: ''
    }),
    code = x('div', {
      class: 'sub hidden dn'
    }, 'Authenticating...')

    let base = x('app-main',
      x('div', {class: 'title'}, 'Authentication'),
      x('div', {class: 'group'},
        x('div', {class: 'circle'}),
        x('div',{class: 'form-group'},
          email,
          password,
          x('button', {
            class: 'form-item btn',
            type: 'buton',
            onclick(evt){

              if(utils.validate(obj)){
                
                utils.hide(password);
                utils.hide(email);
                utils.hide(evt.target);
                utils.theme(config.colors[1]);
                utils.show(code);

                config.fetch.data.body = JSON.stringify(obj);

                fetch(config.fetch.url, config.fetch.data)
                .then(function(res){
                  if (res.status >= 200 && res.status < 300) {
                    return res.json();
                  } else {
                    return Promise.reject(new Error(res.statusText))
                  }
                })
                .then(function(data) {
                  utils.theme(config.colors[2]);
                  utils.show(twostep);
                  code.textContent = 'Code';
                  twostep.value = data.code;
                })
                .catch(function(err){

                  console.error(err)
                  utils.theme(config.colors[0]);
                  utils.hide(code);
                  utils.show(password);
                  utils.show(email);
                  utils.show(evt.target);

                })

              }

            }
          }, 'fetch'),
          code,
          twostep
        )
      )
    )
    return base;
  },
  hide(x){
    x.classList.add('hidden');
    setTimeout(function(){
      x.classList.add('dn');
    },1000)
  },
  show(x){
    setTimeout(function(){
      x.classList.remove('dn', 'hidden');
    },1000)
  },
  is_email(x){
    let re = /\S+@\S+\.\S+/;
    return re.test(x);
  },
  validate(obj){
    if(
      typeof obj.email === 'string' &&
      typeof obj.password === 'string' &&
      utils.is_email(obj.email) &&
      obj.email.length >= config.email.min &&
      obj.email.length <= config.email.max &&
      obj.password.length >= config.password.min &&
      obj.password.length <= config.password.max
    ){
      return true
    } else {
      return false
    }
  },
  theme(i){
    document.styleSheets[0].deleteRule(0)
    document.styleSheets[0].insertRule(':root{--main-color:'+ i +'}', 0)
  }
}

export { utils }
