const State = Object.freeze({
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
    LARGE_LANDSCAPE: 'large-landscape',
});

let state; // Global state variable

const areas = {
    /* [State.PORTRAIT]: [
         {
             coords: [323, 291, 343, 255, 416, 283, 478, 346, 467, 374, 430, 374, 386, 327],
             href: 'mailto:dimitrisdouramakos@yahoo.com',
             alt: 'Contact',
             shape: 'poly',
         },
         // More areas for the portrait state can go here
     ],*/
    [State.LANDSCAPE]: [
        {
            coords: [274, 350, 300, 287, 331, 248, 361, 227, 384, 241, 385, 266, 361, 293, 343, 313, 332, 332, 314, 372],
            href: 'mailto:dimitrisdouramakos@yahoo.com',
            alt: 'Shop',
            shape: 'poly',
        },
        {
            coords: [795, 458, 818, 501, 853, 498, 883, 484, 916, 467, 937, 496, 915, 531, 854, 555, 800, 545, 763, 508, 757, 461],
            href: 'https://nycrat.bigcartel.com/',
            alt: 'Contact',
            shape: 'poly',
        },
        {
            coords: [616, 627, 24],
            href: 'https://www.instagram.com/nycrat/',
            alt: 'Instagram',
            shape: 'circle',
        }
    ],
    /* [State.LARGE_LANDSCAPE]: [
         {
             coords: [900, 600, 1024, 480],
             href: 'https://nycrat.bigcartel.com/',
             alt: 'Shop',
             shape: 'rect',
         }
     ]*/
};

function calculateState() {
    if (window.innerWidth > window.innerHeight) {
        if (window.innerWidth > 1280) {
            state = 'large-landscape';
        } else {
            state = 'landscape';
        }
    } else {
        state = 'portrait';
    }
}

function setImage() {
    const image = document.getElementById('responsive-image');

    calculateState();

    switch (state) {
        case 'large-landscape':
            image.src = 'images/land_large.jpg';
            break;
        case 'landscape':
            image.src = 'images/land.jpg';
            break;
        case 'portrait':
            image.src = 'images/port.jpg';
            break;
    }

    updateImageMap();
}

function updateImageMap() {
    const image = document.getElementById('responsive-image');
    const map = document.querySelector('map');
    map.innerHTML = ''; // Clear existing area elements

    let scaleFactorX;
    let scaleFactorY;
    switch (state) {
        case 'large-landscape':
            scaleFactorX = image.clientWidth / 1920;
            scaleFactorY = image.clientHeight / 1080;
            break;
        case 'landscape':
            scaleFactorX = image.clientWidth / 1280;
            scaleFactorY = image.clientHeight / 720;
            break;
        case 'portrait':
            scaleFactorX = image.clientWidth / 720;
            scaleFactorY = image.clientHeight / 1280;
            break;
    }

    console.log('*** state', state);

    areas[state].forEach(area => {
        const areaElement = document.createElement('area');
        areaElement.setAttribute('shape', area.shape);
        console.log('*** the original coords are: ' + area.coords.join(','));
        const scaledCoords = area.coords.map((coord, index) => index % 2 === 0 ? coord * scaleFactorX : coord * scaleFactorY);
        console.log('*** the scaled coords are: ' + scaledCoords.join(','));
        areaElement.setAttribute('coords', scaledCoords.join(','));
        areaElement.setAttribute('href', area.href);
        areaElement.setAttribute('alt', area.alt);
        map.appendChild(areaElement);
    });
}

window.addEventListener('resize', setImage);
window.addEventListener('load', setImage);