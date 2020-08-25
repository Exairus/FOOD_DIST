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

    

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    
    // 2 способ

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement("div");

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector(".menu .container").append(element);
    //     });
    // }

    //forms
    
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что то пошло не так..."
    };

    forms.forEach( (item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };
    
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            // объект ошибки
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    };
    
    function bindPostData(form) {
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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
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

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    
    /* slider 
    1. Получить все элементы слайдера
    2. Определить индекс, который будет определять номер текущего слайда
    3. Функция, занимаюся показом слайдов, состоит из двух функций:
        - показ определенного слайда + скрытие других + условие, переход с 4 на 1 слайд и наоборот
        - обработчик события на стрелки, вправо - след. слайд, увеличение индекса и влево аналогично
    */

    const slides = document.querySelectorAll(".offer__slide"),
          prev = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          total = document.querySelector("#total"),
          current = document.querySelector("#current"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    slidesField.style.width = slides.length * 100 + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";


    const slider = document.querySelector(".offer__slider"),
          indicators = document.createElement("ol");
    
    slider.style.position = "relative";

    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    const dots = [];

    for (i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute('data-slide-to', i + 1);
        indicators.append(dot);

        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);
    }

    // функция, которая принимает строку, превращала бы ее в число и избавляла бы от не чисел

    

    // это нужно для того чтобы задать всем айтемам одинаковую ширину, если там есть неравные элементы
    slides.forEach(slide => {
        slide.style.width = width;
    });

    function strToNumeric(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener("click", () => {
        //в регулярке то, что не явл. числом (px) удаляется
        if (offset == strToNumeric(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += strToNumeric(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = "1";
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = strToNumeric(width) * (slides.length - 1);
        } else {
            offset -= strToNumeric(width);
        }
        
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = "1";
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = strToNumeric(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex - 1].style.opacity = "1";

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
        });
    });

    







    // showSlides(slideIndex);

    

    // function showSlides(n) {
        // if (n > slides.length) {
        //     slideIndex = 1;
        // }

        // if (n < 1) {
        //     slideIndex = slides.length;
        // }

    //     slides.forEach(item => item.style.display = "none");

    //     slides[slideIndex - 1].style.display = "block";

        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener("click", () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener("click", () => {
    //     plusSlides(1);
    // });
    
});