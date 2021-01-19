
const gallerySections = [
    {
        'title': document.getElementById('gallery-title-cakes'),
        'section': document.getElementById('subsection-cakes'),
    },
    {
        'title': document.getElementById('gallery-title-decor'),
        'section': document.getElementById('subsection-decor'),
    },
    {
        'title': document.getElementById('gallery-title-cookies'),
        'section': document.getElementById('subsection-cookies'),
    }
];

const gallerySectionHandler = (e) => {
    var clickedList = e.srcElement.classList;
    if(clickedList.contains('gallery-title--clicked')){
        clickedList.remove('gallery-title--clicked');
        gallerySections.forEach(s => {
            s.section.style.display = 'flex';
        });
        document.getElementById('dynamic_style').innerHTML = ``;
    } else {
        document.getElementById('dynamic_style').innerHTML = `
            div .gallery-subsection {
                width: 100%;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
            }

            div .gallery-card {
                width: 30%;
            }
        `;
        gallerySections.forEach(s => {
            if(s.title.id != e.srcElement.id){
                s.section.style.display = 'none';
                if(s.title.classList.contains('gallery-title--clicked')){
                    s.title.classList.remove('gallery-title--clicked');
                }
            } else {
                s.section.style.display = 'flex';
            }
        });
        clickedList.add('gallery-title--clicked');
    }
}

gallerySections.forEach(e => {
    e.title.addEventListener('click', gallerySectionHandler);
});
