
const scrollerImgCenter = document.getElementById('scroller_img_center');
const scrollerImgLeft = document.getElementById('scroller_img_left');
const scrollerImgRight = document.getElementById('scroller_img_right');


scrollerImgLeft.onclick = function(){
    const temp = scrollerImgCenter.src;
    scrollerImgCenter.src = scrollerImgLeft.src;
    scrollerImgLeft.src = temp;
};

scrollerImgRight.onclick = function(){
    const temp = scrollerImgCenter.src;
    scrollerImgCenter.src = scrollerImgRight.src;
    scrollerImgRight.src = temp;
};


const ele = document.getElementById('new-blogs');
ele.style.cursor = 'pointer';

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function(e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';

    pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    ele.addEventListener('mousemove', mouseMoveHandler);
    ele.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function() {
    ele.style.cursor = 'pointer';
    ele.style.removeProperty('user-select');

    ele.removeEventListener('mousemove', mouseMoveHandler);
    ele.removeEventListener('mouseup', mouseUpHandler);
};

// Attach the handler
ele.addEventListener('mousedown', mouseDownHandler);