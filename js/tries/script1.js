window.addEventListener("DOMContentLoaded", () => {

    // tabs

    const tabs = document.querySelectorAll(".tabcontent"); //выбор всех табов
    const items = document.querySelectorAll(".tabheader__item"); //выбор всех ссылок
    const itemsParent = document.querySelector(".tabheader__items"); // выбор родителя для делегирования

    // в начале нужно скрыть весь контент

    function hideContent() {
        tabs.forEach( (tab) => {
            tab.classList.add("hide");
            tab.classList.remove("show");
        });

        items.forEach( (item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showContent(i = 0) {
        tabs[i].classList.remove("hide");
        tabs[i].classList.add("show");
        items[i].classList.add("tabheader__item_active")
    }

    hideContent();
    showContent();

    itemsParent.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("tabheader__item")) {
            items.forEach( (item, i) => {
                if (event.target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    // timer

    const deadline = "2020-11-03";

    function timeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor(t / 1000 % 60);

        return {
            'stamp': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(number) {
        if (number > 1 && number <= 9) {
            return `0${number}`;
        } else {
            return number;
        }
    }
    
    function addTime(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              interval = setInterval(updateTimer, 1000);
        
        function updateTimer() {
            const timerObj = timeRemaining(deadline);

            days.innerHTML = addZero(timerObj.days);
            hours.innerHTML = addZero(timerObj.hours);
            minutes.innerHTML = addZero(timerObj.minutes);
            seconds.innerHTML = addZero(timerObj.seconds);
        }
        updateTimer();
    }

    addTime(".timer", deadline);

    // modal

    const btns = document.querySelectorAll("button[data-modal]"),
          modal = document.querySelector(".modal");

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";

        // clearInterval(intervalId);
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
    
    btns.forEach( (btn) => {
        btn.addEventListener("click", openModal);
    });


    modal.addEventListener("click", (event) => {
        // у нас есть атрибут data-close, но т.к. ему значение не передано
        // getAttribute выдаст пустую строку
        if (event.target === modal || event.target.getAttribute("data-close") == "") {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code == "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const intervalId = setTimeout(openModal, 50000);

    //если долистать до конца открыть модальное
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight) {
            openModal();

            window.removeEventListener("scroll", showModalByScroll);      
        }
    }

    window.addEventListener("scroll", showModalByScroll);


    const menuItem = document.querySelector(".menu__item"),
          src = menuItem.querySelector("img[src]"),
          alt = menuItem.querySelector("img[alt]"),
          title = menuItem.querySelectorAll(".menu__item-subtitle"),
          descr = menuItem.querySelector(".menu__item-descr"),
          price = menuItem.querySelector(".menu__item-total");
    
    class MenuItem {
        constructor(src, alt, title, descr, price, parent, ...divClasses) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.divClasses = divClasses;

            this.createElem();
        }

        createElem() {
            const div = document.createElement("div");

            div.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            
            if (this.divClasses.length === 0) {
                this.div = "menu__item";
                div.classList.add(this.div);
            } else {
                this.divClasses.forEach( (className) => {
                    div.classList.add(className);
                });
            }
            this.parent.append(div);    
        }
    }

    const newElem = new MenuItem(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '229',
        '.menu .container'
    );

    // forms 

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Форма отправлена! Скоро мы с вами свяжемся",
        failure: "Что то пошло не так..."
    };

    forms.forEach((item) => {
        sendForm(item);
    });

    function sendForm(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // вставка спиннера при загрузке формы
            const spinner = document.createElement("img");
            spinner.src = message.loading;
            spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentHTML("afterend", spinner);

            // подготовка формы к отправке на сервер
            const formData = new FormData(form);
 

            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            fetch("server.php", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(data => data.text())
            .then((data) => {
                console.log(data);
                showSuccessMessage(message.success);
                spinner.remove();
            }).catch(() => {
                console.log(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showSuccessMessage(message) {
        const prevModal = document.querySelector(".modal__dialog");
        prevModal.classList.add("hide");
        openModal();
        
        const newModal = document.createElement("div");
        newModal.classList.add("modal__dialog");
        newModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
                
        `;
        document.querySelector(".modal").append(newModal);

        // удалить форму через 5 секунд и закрыть модальное окно
        setTimeout( () => {
            prevModal.classList.add("show");
            prevModal.classList.remove("hide");
            newModal.remove();
            closeModal();
        }, 5000);
    }


});
