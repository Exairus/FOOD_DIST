function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    /* slider 
        1. Получить все элементы слайдера
        2. Определить индекс, который будет определять номер текущего слайда
        3. Функция, занимаюся показом слайдов, состоит из двух функций:
            - показ определенного слайда + скрытие других + условие, переход с 4 на 1 слайд и наоборот
            - обработчик события на стрелки, вправо - след. слайд, увеличение индекса и влево аналогично
        */

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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

    addZero(slides);

    slidesField.style.width = slides.length * 100 + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";

    const indicators = document.createElement("ol");

    slider.style.position = "relative";
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    const dots = [];

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.classList.add("dot");
        dot.setAttribute('data-slide-to', i + 1);
        indicators.append(dot);

        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);
    }

    // это нужно для того чтобы задать всем айтемам одинаковую ширину, если там есть неравные элементы
    slides.forEach(slide => {
        slide.style.width = width;
    });

    // функция, которая принимает строку, превращала бы ее в число и избавляла бы от не чисел
    function strToNumeric(str) {
        return +str.replace(/\D/g, '');
    }

    function addZero(slides) {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
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

        addZero(slides);

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

        addZero(slides);

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

            addZero(slides);
        });
    });
}

export default slider;