function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // tabs 

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);
    
    //1.
    function hideTabContent() {
        tabsContent.forEach( (item) => {
            item.classList.add("hide");
            item.classList.remove("show");
        });
        
        tabs.forEach( (item) => {
            item.classList.remove(activeClass);
        });
    }

    //2. 
    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    //3.
    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;