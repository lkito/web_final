
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

const addScroller = function(elem) {
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function(e) {
        elem.style.cursor = 'grabbing';
        elem.style.userSelect = 'none';
    
        pos = {
            left: elem.scrollLeft,
            top: elem.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };
    
        elem.addEventListener('mousemove', mouseMoveHandler);
        elem.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;
    
        // Scroll the element
        elem.scrollTop = pos.top - dy;
        elem.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function() {
        elem.style.cursor = 'pointer';
        elem.style.removeProperty('user-select');
    
        elem.removeEventListener('mousemove', mouseMoveHandler);
        elem.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    elem.addEventListener('mousedown', mouseDownHandler);
}

const blog_elem = document.getElementById('new-blogs');
const tweet_elem = document.getElementById('new-tweets');
addScroller(blog_elem);
addScroller(tweet_elem);



const ScrollRight = function(elem) {
    elem.scrollLeft += 200;
};

const ScrollLeft = function(elem) {
    elem.scrollLeft -= 200;
};

document.getElementById('right-arrow-blogs').addEventListener('click', function(){
    ScrollRight(blog_elem);
});
document.getElementById('left-arrow-blogs').addEventListener('click', function(){
    ScrollLeft(blog_elem);
});


document.getElementById('right-arrow-tweets').addEventListener('click', function(){
    ScrollRight(tweet_elem);
});
document.getElementById('left-arrow-tweets').addEventListener('click', function(){
    ScrollLeft(tweet_elem);
});
