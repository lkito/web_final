
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