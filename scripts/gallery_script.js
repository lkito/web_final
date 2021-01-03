// const gallerySections = {
//     'gallery-title-cakes': document.getElementById('subsection-cakes'),
//     'gallery-title-decor': document.getElementById('subsection-decor'),
//     'gallery-title-cookies': document.getElementById('subsection-cookies')
// };

const changeClassProperties = (cssClass, propMap) => {
    Array.prototype.forEach.call(document.getElementsByClassName(cssClass), (el) => {
        for (const [key, value] of Object.entries(propMap)) {
            el.style[key] = value;
        }
    });
    // document.getElementsByClassName(cssClass).forEach(e => {
    //     for (const [key, value] of Object.entries(propMap)) {
    //         e.style[key] = value;
    //     }
    // });
}

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
        changeClassProperties('gallery-subsection', {
            'width': '30%',
            'flex-direction': 'column',
            'flex-wrap': 'nowrap',
            'justify-content': ''
        });
        changeClassProperties('gallery-card', {
            'width': '100%'
        });
    } else {
        changeClassProperties('gallery-subsection', {
            'width': '100%',
            'flex-direction': 'row',
            'flex-wrap': 'wrap',
            'justify-content': 'space-around'
        });
        changeClassProperties('gallery-card', {
            'width': '30%'
        });
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

// for (const [key, value] of Object.entries(gallerySections)) {
//     document.getElementById(key).addEventListener('click', gallerySectionHandler);
// }

// sectionCakes.addEventListener('click', gallerySectionHandler);
// sectionDecor.addEventListener('click', gallerySectionHandler);
// sectionCookies.addEventListener('click', gallerySectionHandler);