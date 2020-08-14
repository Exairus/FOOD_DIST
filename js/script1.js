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

    // modal

    const modal = document.querySelector(".modal"),
          modalTrigger = document.querySelectorAll("button[data-modal]"),
          close = document.querySelector("div[data-close]");
    
    // при клике на кнопки с data атрибутом открывать модальное окно

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        // если пользователь кликнул на кнопку, вызывающее модальное окно
        // до того, как оно само сработает, отменяем интервал
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    
    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    close.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

   
    // const modalTimerId = setTimeout(openModal, 3000);

    // если пользователь долистал до конца - показать модальное окно

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight 
            >= document.documentElement.scrollHeight) {
                openModal();
                // удалить обработчик события после первого раза, как он сработал
                window.removeEventListener("scroll", showModalByScroll);
            }
        
    }

    window.addEventListener("scroll", showModalByScroll);

    // cards

    class MenuCard {

        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
        }

        render() {
            const menuItem = document.createElement("div");

            menuItem.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
            `;

            this.parentSelector.append(menuItem);
        }

    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container'
    ).render();

});
