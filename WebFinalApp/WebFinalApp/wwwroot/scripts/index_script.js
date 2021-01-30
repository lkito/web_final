import Shared from '/scripts/shared.js';

const sharedFuncs = new Shared();


export default class Index {
    constructor() { };


    addSlider(elem, isTouch) {
        let pos = { top: 0, left: 0, x: 0, y: 0 };
        let startPos = { x: 0, y: 0 };

        const mouseDownHandler = function (e) {
            elem.style.cursor = 'grabbing';
            elem.style.userSelect = 'none';

            pos = {
                left: elem.scrollLeft,
                top: elem.scrollTop,
                // Get the current mouse position
                x: isTouch ? e.touches[0].clientX : e.clientX,
                y: isTouch ? e.touches[0].clientY : e.clientY,
            };

            startPos = {
                x: isTouch ? e.touches[0].clientX : e.clientX,
                y: isTouch ? e.touches[0].clientY : e.clientY,
            };
            sharedFuncs.addListenerMulti(elem, isTouch ? 'touchmove' : 'mousemove', mouseMoveHandler);
            sharedFuncs.addListenerMulti(elem, isTouch ? 'touchend' : 'mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            const dx = (isTouch ? e.touches[0].clientX : e.clientX) - pos.x;
            //const dy = (isTouch ? e.touches[0].clientY : e.clientY) - pos.y;

            // Scroll the element
            //elem.scrollTop = pos.top - dy;
            elem.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function (e) {
            elem.style.cursor = 'pointer';
            elem.style.removeProperty('user-select');

            sharedFuncs.removeListenerMulti(elem, isTouch ? 'touchmove' : 'mousemove', mouseMoveHandler);
            sharedFuncs.removeListenerMulti(elem, isTouch ? 'touchend' : 'mouseup', mouseUpHandler);
            if (startPos.x == e.x && startPos.y == e.y) {
                e.target.querySelector('.targ_link').dispatchEvent(new MouseEvent('click'));
            }
        };

        // Attach the handler
        sharedFuncs.addListenerMulti(elem, isTouch ? 'touchstart' : 'mousedown', mouseDownHandler);
    }

    scrollRight (elem) {
        elem.scrollLeft += 200;
    };

    scrollLeft (elem) {
        elem.scrollLeft -= 200;
    };

    setupScroller() {
        const scrollerImgCenter = document.getElementById('scroller_img_center');
        const scrollerImgLeft = document.getElementById('scroller_img_left');
        const scrollerImgRight = document.getElementById('scroller_img_right');
        const masterClassButton = document.getElementById('find_out_more');


        const scrollLeftEvent = function () {
            const temp = [scrollerImgCenter.src, scrollerImgCenter.alt];
            scrollerImgCenter.src = scrollerImgLeft.src;
            scrollerImgCenter.alt = scrollerImgLeft.alt;
            scrollerImgLeft.src = temp[0];
            scrollerImgLeft.alt = temp[1];
            if (scrollerImgCenter.alt === 'masterclass') {
                masterClassButton.style.display = 'block';
            } else {
                masterClassButton.style.display = 'none';
            }
        };

        const scrollRightEvent = function () {
            const temp = [scrollerImgCenter.src, scrollerImgCenter.alt];
            scrollerImgCenter.src = scrollerImgRight.src;
            scrollerImgCenter.alt = scrollerImgRight.alt;
            scrollerImgRight.src = temp[0];
            scrollerImgRight.alt = temp[1];
            if (scrollerImgCenter.alt === 'masterclass') {
                masterClassButton.style.display = 'block';
            } else {
                masterClassButton.style.display = 'none';
            }
        };

        scrollerImgLeft.onclick = scrollLeftEvent;
        scrollerImgRight.onclick = scrollRightEvent;
        this.scrollLeftFlag = true;

        this.scrollerIntervalId = setInterval(function () {
            if (this.scrollLeftFlag) {
                scrollLeftEvent();
            } else scrollRightEvent();
            this.scrollLeftFlag = !this.scrollLeftFlag;
        }.bind(this), 5000);
    }

    indexLoad() {
        this.setupScroller();

        const blog_elem = document.getElementById('new-blogs');
        const tweet_elem = document.getElementById('new-tweets');
        this.addSlider(blog_elem, false);
        this.addSlider(blog_elem, true);

        this.addSlider(tweet_elem, false);
        this.addSlider(tweet_elem, true);

        document.getElementById('right-arrow-blogs').addEventListener('click', () => {
            this.scrollRight(blog_elem);
        });
        document.getElementById('left-arrow-blogs').addEventListener('click', () => {
            this.scrollLeft(blog_elem);
        });


        document.getElementById('right-arrow-tweets').addEventListener('click', () => {
            this.scrollRight(tweet_elem);
        });
        document.getElementById('left-arrow-tweets').addEventListener('click', () => {
            this.scrollLeft(tweet_elem);
        });

        const fillFeaturedBlogs = () => {
            const blogsElem = document.getElementById('new-blogs');
            sharedFuncs.apiCall('GET', sharedFuncs.apiUrl + '/api/blogs/GetBlogPreviews?skip=0&take=10', (json) => {
                const result = JSON.parse(json);
                result.forEach(e => {
                    blogsElem.innerHTML += `
                        <div class="item--new-blog" target="_blank">
                            <a class="targ_link" href="/article/${e.id}" target="_blank"></a>
                            <img src="/images/BlogImages/${e.image.imagePath}" alt="">
                            <div class="new-blog-title">
                                ${e.blogTitle}
                            </div>
                        </div>
                    `;
                });
            });
        };

        fillFeaturedBlogs();
    }

    indexUnload() {
        clearInterval(this.scrollerIntervalId);
    }
}

