window.addEventListener("DOMContentLoaded", () => {

// 1. Функция, которая будет скрывать ненужные табы

// 2. Показать нужный таб

// 3. Нужно назначить обработчик события на меню (Выберите стиль питания)
// который и будет манипулировать этими функциями


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
});