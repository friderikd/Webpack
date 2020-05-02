function form() {
    let message = {
        loading: 'Загрузка...',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    
    let form = document.querySelector('.main-form'),
        formDown = document.getElementById('form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
    
    function sendForm(elem) { //с промисами
        elem.addEventListener('submit', function(e) {//правильноеназначениеобработчика-наформуанекнопку(submitанеbutton)
            e.preventDefault(); //запрет стандартного поведения браузера (чтобы страница не перезагружалась)
            elem.appendChild(statusMessage);    // добавляем созданный див в котором отображается сообщение о статусе
            let formData = new FormData(elem);     // создание и настройка запроса
    
            function postData(data) {
    
                return new Promise(function(resolve,reject) {
                    let request = new XMLHttpRequest();
    
                    request.open('POST', 'server.php');
    
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  // <<<== обычный формат
    
                    request.onreadystatechange = function() {   // отслеживание статуса и вывод сообщений о статусе
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                resolve();
                            } else {
                                reject();
                            }    
                        }
                    };
                    request.send(data);
                });
            } //End postData
            
            function clearInput() {
                for( let i = 0; i < input.length; i++) {     // очистка инпута после отправки формы
                    input[i].value ='';
                }
            }
            
            postData(formData)
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=> statusMessage.innerHTML = message.succes)
                .catch(()=> statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });  
    }
    sendForm(form);
    sendForm(formDown);
}

module.exports = form;