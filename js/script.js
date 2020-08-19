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
                if (target == item) {
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

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight 
            >= document.documentElement.scrollHeight) {
                openModal();
                // удалить обработчик события после первого раза, как он сработал
                window.removeEventListener("scroll", showModalByScroll);
            }
        
    }

    window.addEventListener("scroll", showModalByScroll);
    
    
    // динамическое создание menu-item

    //1. Используем классы для карточек
    
    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;

            this.transfer = 27;
            this.changeToUAH();       
        }
        

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach( (className) => {
                    element.classList.add(className);
                });
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    //forms
    
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что то пошло не так..."
    };

    forms.forEach( (item) => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // вставка спиннера при загрузке формы
            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);
            
            const formData = new FormData(form);

            // const object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });

            // const json = JSON.stringify(object);

            fetch('server.php', {
                method: 'POST',
                body: formData
            }).then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);  
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        // скрыть текущее модальное окно перед тем, как покажем новое
        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        
        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
    
});