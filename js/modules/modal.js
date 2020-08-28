function modal() {
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
}

module.exports = modal;