
const scrollerImgCenter = document.getElementById('scroller_img_center');
const scrollerImgLeft = document.getElementById('scroller_img_left');
const scrollerImgRight = document.getElementById('scroller_img_right');


scrollerImgLeft.onclick = function(){
    const temp = scrollerImgCenter.id;
    scrollerImgCenter.id = scrollerImgRight.id;
    scrollerImgRight.id = scrollerImgLeft.id;
    scrollerImgLeft.id = temp;
};