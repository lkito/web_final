import Shared from '/scripts/shared.js';

const sharedFuncs = new Shared();


export default class Article {
    constructor() { };

    articleLoad(id) {
        sharedFuncs.apiCall('GET', sharedFuncs.apiUrl + `/api/blogs/${id}`, (json) => {
            const result = JSON.parse(json);
            document.getElementById('article_title').innerHTML = result.blogTitle;

            const curDate = new Date(result.dateCreated);
            document.getElementById('date-text').innerHTML = curDate.toLocaleTimeString() + ' · ' + curDate.toLocaleDateString();

            let mainImagePath = result.images[0].imagePath;
            result.images.forEach(e => {
                if (e.isMainImage) {
                    mainImagePath = e.imagePath;
                }
            });
            const mainImage = document.createElement('img');
            mainImage.src = `/images/BlogImages/${mainImagePath}`;
            mainImage.className = 'main-image';

            const articleContent = document.createElement('div');
            articleContent.className = 'article-content';
            articleContent.innerHTML = result.blogBody;

            const articleItems = document.getElementById('article-items');
            articleItems.appendChild(mainImage);
            articleItems.appendChild(articleContent);
        });

    }
}

