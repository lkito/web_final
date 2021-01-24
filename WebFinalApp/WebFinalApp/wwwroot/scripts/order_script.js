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
        let queryString = `http://localhost:52162/api/images/GetGalleryImages?skip=0&take=1`;
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

    orderLoad() {
        this.filterTags = [];
        this.exampleImages = {
            cake: '',
            decor: '',
            cookies: '',
        };

        const titleChange = (e) => {
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
        };

        document.getElementById('order-title-cakes').addEventListener('click', titleChange);
        document.getElementById('order-title-decor').addEventListener('click', titleChange);
        document.getElementById('order-title-cookies').addEventListener('click', titleChange);
        document.getElementById('tag_input_button').addEventListener('click', this.addTags.bind(this));
        document.getElementById('tag_input_text').addEventListener('keydown', this.addTags.bind(this));

        document.getElementById('order_input_button').addEventListener('click', () => {
            const data = {
                phoneNumber: document.getElementById('phone_number').value,
                email: document.getElementById('email').value,
                tags: this.filterTags,
                imgLink: document.getElementById('example_image').src,
                description: document.getElementById('additional_info').value,
                orderType: document.querySelector('input[name="orderType"]:checked').value
            }
            var request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:52162/api/order/SubmitOrder', true);
            request.setRequestHeader('Content-Type', 'application/json');
            console.log(JSON.stringify(data));
            request.send(JSON.stringify(data));

            document.getElementById('order_input_button').style.display = 'none';
            document.getElementById('order_submitted_text').style.display = 'block';
        });
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