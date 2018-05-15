function attachEventsListeners() {
    let days = document.getElementById('days');
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');

    let daysBtn = document.getElementById('daysBtn');
    let hoursBtn = document.getElementById('hoursBtn');
    let minutesBtn = document.getElementById('minutesBtn');
    let secondsBtn = document.getElementById('secondsBtn');

    daysBtn.addEventListener('click', daysClick);

    function daysClick() {
        let daysValue = days.value;
        hours.value = daysValue * 24;
        minutes.value = daysValue * 24 * 60;
        seconds.value = daysValue * 24 * 60 * 60;
    }

    hoursBtn.addEventListener('click', hoursClick);

    function hoursClick() {
        let hoursValue = hours.value;
        let daysValue = days.value = hoursValue / 24;
        minutes.value = daysValue * 24 * 60;
        seconds.value = daysValue * 24 * 60 * 60;
    }

    minutesBtn.addEventListener('click', minutesClick);

    function minutesClick() {
        let minutesValue = minutes.value;
        let daysValue = days.value = minutesValue / 60 / 24;
        hours.value = daysValue * 24;
        seconds.value = daysValue * 24 * 60 * 60;
    }

    secondsBtn.addEventListener('click', secondsClick);

    function secondsClick() {
        let secondsValue = seconds.value;
        let daysValue = days.value = secondsValue / 60 / 60 /24;
        minutes.value = daysValue * 24 * 60;
        hours.value = daysValue * 24;
    }
}