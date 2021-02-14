import Shared from '/scripts/shared.js';

const sharedFuncs = new Shared();


export default class Order {
    constructor() { };

    async findExampleImage() {
        const exampleImage = document.getElementById('example_image');
        if (this.filterTags.length == 0) {
            this.exampleImages = {
                cake: '',
                decor: '',
                cookies: '',
            };
            exampleImage.src = '/images/no_tags_entered.png';
            return;
        }
        const selectedType = document.querySelector('input[name="orderType"]:checked').value;
        let queryString = sharedFuncs.apiUrl + `/api/images/GetGalleryImages?skip=0&take=1`;
        this.filterTags.forEach(e => queryString += `&filters=${e}`);
        sharedFuncs.apiCall('GET', queryString, (json) => {
            const result = JSON.parse(json);
            this.exampleImages.cake = result.cakeImages.length > 0 ? result.cakeImages[0].imagePath : '';
            this.exampleImages.decor = result.decorImages.length > 0 ? result.decorImages[0].imagePath : '';
            this.exampleImages.cookies = result.cookieImages.length > 0 ? result.cookieImages[0].imagePath : '';

            if (this.exampleImages[selectedType].length == 0) {
                exampleImage.src = '/images/example_not_found.jpg';
            } else {
                exampleImage.src = '/images/BlogImages/' + this.exampleImages[selectedType];
            }
        });
    };

    addTags(e) {
        if (e.key !== undefined && e.key !== 'Enter') return;
        const tagList = document.getElementById('filter_tags');
        const inputElem = document.getElementById('tag_input_text');
        const inputVal = inputElem.value;
        inputElem.value = '';
        const tags = inputVal.split(/(\s+)/);

        tags.forEach(t => {
            if (t === '' || /^\s+$/.test(t) || this.filterTags.includes(t)) return;
            this.filterTags.push(t);
            const tagElem = document.createElement('div');
            tagElem.className = 'filter_tag';
            tagElem.innerHTML = t;
            tagList.appendChild(tagElem);
            tagElem.addEventListener('click', (e) => {
                this.filterTags = this.filterTags.filter(function (item) {
                    return item !== e.target.textContent;
                })
                e.target.remove();
                this.findExampleImage();
            });
        });
        this.findExampleImage();
    }

    titleChange(e) {
        const exampleImage = document.getElementById('example_image');
        if (this.filterTags.length == 0) {
            exampleImage.src = '/images/no_tags_entered.png';
            return;
        }
        if (this.exampleImages[e.target.value].length == 0) {
            exampleImage.src = '/images/example_not_found.jpg';
            return;
        }
        exampleImage.src = '/images/BlogImages/' + this.exampleImages[e.target.value];
    }

    placeOrder() {
        const orderType = document.querySelector('input[name="orderType"]:checked').value;
        const emailValue = document.getElementById('email').value;
        const phoneValue = document.getElementById('phone_number').value;
        const descriptionValue = document.getElementById('additional_info').value;
        if (!emailValue || !phoneValue || !descriptionValue) {
            document.getElementById('fill_everything_text').style.display = 'block';
            return;
        }
        document.getElementById('fill_everything_text').style.display = 'none';
        const data = {
            phoneNumber: phoneValue,
            email: emailValue,
            tags: this.filterTags,
            imgLink: this.exampleImages[orderType].length !== 0 ? document.getElementById('example_image').src : '',
            description: descriptionValue,
            orderType: orderType
        }
        var request = new XMLHttpRequest();
        request.open('POST', sharedFuncs.apiUrl + '/api/order/SubmitOrder', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));

        document.getElementById('order_input_button').style.display = 'none';
        document.getElementById('order_submitted_text').style.display = 'block';
    }

    async loadOrderWithImage(image_id) {
        let imagePath = '';
        let imageType = '';

        const imageJson = await sharedFuncs.asyncApiCall('GET', sharedFuncs.apiUrl + `/api/images/${image_id}`);
        const imageResult = JSON.parse(imageJson);
        this.filterTags = imageResult.imageTags;
        imagePath = imageResult.imagePath;
        imageType = imageResult.imageType.toLowerCase();

        const tagList = document.getElementById('filter_tags');
        this.filterTags.forEach(t => {
            const tagElem = document.createElement('div');
            tagElem.className = 'filter_tag';
            tagElem.innerHTML = t;
            tagList.appendChild(tagElem);
            tagElem.addEventListener('click', (e) => {
                this.filterTags = this.filterTags.filter(function (item) {
                    return item !== e.target.textContent;
                })
                e.target.remove();
                this.findExampleImage();
            });
        });

        let queryString = sharedFuncs.apiUrl + `/api/images/GetGalleryImages?skip=0&take=1`;
        this.filterTags.forEach(e => queryString += `&filters=${e}`);
        sharedFuncs.apiCall('GET', queryString, (json) => {
            const result = JSON.parse(json);
            this.exampleImages.cake = result.cakeImages.length > 0 ? result.cakeImages[0].imagePath : '';
            this.exampleImages.decor = result.decorImages.length > 0 ? result.decorImages[0].imagePath : '';
            this.exampleImages.cookies = result.cookieImages.length > 0 ? result.cookieImages[0].imagePath : '';

            this.exampleImages[imageType] = imagePath;
            document.querySelector(`input[name="orderType"][value="${imageType}"]`).checked = true;
            document.getElementById('example_image').src = '/images/BlogImages/' + imagePath;
        });
    }

    orderLoad(image_id = '') {
        this.filterTags = [];
        this.exampleImages = {
            cake: '',
            decor: '',
            cookies: '',
        };

        document.getElementById('order-title-cakes').addEventListener('click', this.titleChange.bind(this));
        document.getElementById('order-title-decor').addEventListener('click', this.titleChange.bind(this));
        document.getElementById('order-title-cookies').addEventListener('click', this.titleChange.bind(this));
        document.getElementById('tag_input_button').addEventListener('click', this.addTags.bind(this));
        document.getElementById('tag_input_text').addEventListener('keydown', this.addTags.bind(this));
        document.getElementById('order_input_button').addEventListener('click', this.placeOrder.bind(this));

        if (image_id) {
            this.loadOrderWithImage(image_id);
        }
    }

    orderUnload() {
        this.filterTags = [];
        this.exampleImages = {
            cake: '',
            decor: '',
            cookies: '',
        };
    }
}