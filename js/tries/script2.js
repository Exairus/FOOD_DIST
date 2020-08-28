window.addEventListener("DOMContentLoaded", () => {

    // tabs 

    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

    //1.
    function hideTabContent() {
    tabsContent.forEach( (item) => {
    item.classList.add("hide");
    item.classList.remove("show");
    });

    tabs.forEach( (item) => {
    item.classList.remove("tabheader__item_active");
    });
    }


    //2. 
    function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    //3.
    tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
    tabs.forEach((item, i) => {
        if (target === item) {
            hideTabContent();
            showTabContent(i);
        }
    });
    }
    });

    // timer 

    const deadline = "2020-09-11";

    function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000*60*60*24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
    return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
    };
    }

    function getZero(num) {
    if (num >= 0 && num < 10) {
    return `0${num}`;
    } else {
    return num;
    }
    }

    function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
    const t = getTimeRemaining(endtime);

    days.innerHTML = getZero(t.days);
    hours.innerHTML = getZero(t.hours);
    minutes.innerHTML = getZero(t.minutes);
    seconds.innerHTML = getZero(t.seconds);

    if (t.total <= 0) {
        clearInterval(timeInterval);
    }
    }
    }

    setClock(".timer", deadline);

    // modal

    const modal = document.querySelector(".modal"),
    modalTrigger = document.querySelectorAll("button[data-modal]");

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

    modal.addEventListener("click", (event) => {
    // если кликаем на подложку или на какой то крестик, закрывать модальное
    if (event.target === modal || event.target.getAttribute("data-close") == "") {
    closeModal();
    }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });


    const modalTimerId = setTimeout(openModal, 50000);

    // если пользователь долистал до конца - показать модальное окно

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= 
                document.documentElement.scrollHeight) {
            openModal();

            window.removeEventListener("scroll", showModalByScroll);      
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    // creating of menu cards

    class MenuCard {
        constructor(img, altimg, title, descr, price, parent, ...divClasses) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.divClasses = divClasses;
        }

        render() {
            const div = document.createElement("div");

            div.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            if (this.divClasses.length === 0) {
                div.classList.add("menu__item");
            } else {
                this.divClasses.forEach(className => {
                    div.classList.add(className);
                });
            }

            this.parent.append(div);
        }
    }

    const newElem1 = new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container'
    ).render();

    const newElem2 = new MenuCard(
        "img/tabs/post.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container'
    ).render();

    const newElem3 = new MenuCard(
        "img/tabs/elite.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container'
    ).render();

    // forms

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Форма отправлена! Мы с вами свяжемся в течении нескольких секунд",
        failure: "Что-то пошло не так"
    };

    forms.forEach((item) => {
        sendForm(item);
    });

    function sendForm(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // creating spinner
            const spinner = document.createElement("img");
            spinner.src = message.loading;

            spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentHTML("afterend", spinner);

            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            
            fetch('server.php', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then((data) => data.text())
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
        setTimeout(() => {
            prevModal.classList.add("show");
            prevModal.classList.remove("hide");
            newModal.remove();
            closeModal();
        }, 5000);
    }

    // calc

    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const statics = document.querySelectorAll(selector);

        statics.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                elem.classList.add(activeClass);
            } 
            if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                elem.classList.add(activeClass);;
            }
        });
    }
    initLocalSettings("#gender div", "calculating__choose-item_active")
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active")

    function calcResult() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }
        if (sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcResult();

    function getStaticInformation(selector, activeClass) {
        const statics = document.querySelectorAll(selector);

        statics.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }

                statics.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);

                calcResult();
            });
        });  
    }

    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
    getStaticInformation("#gender div", "calculating__choose-item_active");

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch(input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                   
                case "age":
                    age = +input.value;
                    
            }

            calcResult();
        });
        
    }

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");



});