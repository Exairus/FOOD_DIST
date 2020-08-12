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

});