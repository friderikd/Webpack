function calc() {
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
}

module.exports = calc;