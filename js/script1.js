window.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsParent = document.querySelector(".tabheader__items"),
          content = document.querySelectorAll(".tabcontent");

    function hideContent() {
        content.forEach( (item) => {
            item.style.display = "none";
        });

        tabs.forEach( (item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showContent(i = 0) {
        content[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hideContent();
    showContent();

    tabsParent.addEventListener("click", (event) => {

        if (event.target && event.target.classList.contains("tabheader__item")) {
            tabs.forEach( (tab, i) => {
                if (event.target == tab) {
                    hideContent();
                    showContent(i);
                }
            });
        }

    });

    //timer

    const deadline = "2020-09-11";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());

        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor(t / 1000 % 60);
        
        return {
            timestamp: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector);

        const days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds");
              interval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }
    }

    setTimer(".timer", deadline);

});
