window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer 

    let deadline = '2020-06-28';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else { return num;
                        }
                    }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        infoBtn = document.querySelector('.info');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    infoBtn.addEventListener('click', function(event){
        if (event.target && event.target.classList.contains('description-btn')){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });

// ======================================== FORM
 
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

/* function sendForm(elem) { //без промисов
    elem.addEventListener('submit', function(e) {//правильноеназначениеобработчика-наформуанекнопку(submitанеbutton)
        e.preventDefault(); //запрет стандартного поведения браузера (чтобы страница не перезагружалась)
        elem.appendChild(statusMessage);    // добавляем созданный див в котором отображается сообщение о статусе

        let request = new XMLHttpRequest();     // создание и настройка запроса
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');  // <<<== обычный формат
    
        let formData = new FormData(elem);      // отправка формы
        request.send(formData);

        request.onreadystatechange = function() {   // отслеживание статуса и вывод сообщений о статусе
            if(request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4) {
                if (request.status == 200 && request.status < 300){
                    statusMessage.innerHTML = message.succes;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            } 
        };

        for( let i = 0; i < input.length; i++) {     // очистка инпута после отправки формы
            input[i].value ='';
        }
    });  
}
sendForm(form);
sendForm(formDown); */

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

// Slider

    let slideIndex = 1, //slider number to show 1st
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none'); //hiding all slides
        // for (let i = 0; i < slides.length; i++) {  tozhe samoe chto s verhu no po staromu
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active')); // remove all active dots

        slides[slideIndex - 1].style.display = 'block'; //show 1st slide
        dots[slideIndex - 1].classList.add('dot-active'); //activate 1st dot
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length +1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    //Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0,
        placeValue = 0;

        totalValue.innerText = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            placeValue = place.options[place.selectedIndex].value;
            total = (daysSum + personsSum)*4000;
            if(restDays.value == '' || persons.value == '') {
                totalValue.innerText = 0;
            } else {
                totalValue.innerText = total * placeValue;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            placeValue = place.options[place.selectedIndex].value;
            total = (daysSum + personsSum)*4000;

            if(restDays.value == '' || persons.value == '') {
                totalValue.innerText = 0;
            } else {
                totalValue.innerText = total * placeValue;
            }
        });

        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerText = 0;
            } else {
                let a = total;
                totalValue.innerText = a * this.options[this.selectedIndex].value;
            }
        });
});