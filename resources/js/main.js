const config = {
    individualItem: '.album-item', // class of individual item
    carouselWidth: 1000, // in px
    carouselId: '#album-rotator', // carousel selector
    carouselHolderId: '#album-rotator-holder', // carousel should be <div id="carouselId"><div id="carouselHolderId">{items}</div></div>
}

document.addEventListener("DOMContentLoaded", function(e) {

    // Get items
    const elem = document.querySelector(config.individualItem);
    const elemWidth = parseFloat(window.getComputedStyle(elem).width) + parseFloat(window.getComputedStyle(elem).marginLeft) + parseFloat(window.getComputedStyle(elem).marginRight);
    
    // Track carousel
    let mousedown = false;
    let movement = false;
    let initialPosition = 0;
    let selectedItem;
    let currentDelta = 0;

    document.querySelectorAll(config.carouselId).forEach(function (item) { 
        item.style.width = `${config.carouselWidth}px`;
    });
    
    document.querySelectorAll(config.carouselId).forEach(function(item) {
        item.addEventListener('pointerdown', function(e) {
            mousedown = true;
            selectedItem = item;
            initialPosition = e.pageX;
            currentDelta = parseFloat(item.querySelector(config.carouselHolderId).style.transform.split('translateX(')[1]) || 0;
        }); 
    });
    
    const scrollCarousel = function(change, currentDelta, selectedItem) {
        let numberThatFit = Math.floor(config.carouselWidth / elemWidth);
        let newDelta = currentDelta + change;
        let elemLength = selectedItem.querySelectorAll(config.individualItem).length - numberThatFit;
        if(newDelta <= 0 && newDelta >= -elemWidth * elemLength) {
            selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${newDelta}px)`;
        } else {
            if(newDelta <= -elemWidth * elemLength) {
                selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${-elemWidth * elemLength}px)`;
            } else if(newDelta >= 0) {
                selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(0px)`;
            }
        }
    }

    document.body.addEventListener('pointermove', function(e) {
        if(mousedown == true && typeof selectedItem !== "undefined") {
            let change = -(initialPosition - e.pageX);
            scrollCarousel(change, currentDelta, document.body);
            document.querySelectorAll(`${config.carouselId} a`).forEach(function(item) {
                item.style.pointerEvents = 'none';
            });
            movement = true;
        }
    });
    
    ['pointerup', 'mouseleave'].forEach(function(item) {
        document.body.addEventListener(item, function(e) {
            selectedItem = undefined;
            movement = false;
            document.querySelectorAll(`${config.carouselId} a`).forEach(function(item) {
                item.style.pointerEvents = 'all';
            });
        });
    });

    document.querySelectorAll(config.carouselId).forEach(function(item) {
        let trigger = 0;
        item.addEventListener('wheel', function(e) {
            if(trigger !== 1) {
                ++trigger;
            } else {
                let change = e.deltaX * -3;
                let currentDelta = parseFloat(item.querySelector(config.carouselHolderId).style.transform.split('translateX(')[1]) || 0;
                scrollCarousel(change, currentDelta, item);
                trigger = 0;
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        });
    });
});