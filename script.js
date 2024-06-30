const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'FMgnoWvSIFxbmqLdf6PmoX2-U4n0KjWhHaHnGYMd4KI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//helper function to set attributes on DOM
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links, photos, and add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //function for each object in photosArray
    photosArray.forEach((photo) => {
        //create anchor element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });
        //create img element for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //event listener, check when each image is finished loading
        img.addEventListener('load', imageLoaded);
        //put img element inside anchor element and then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error here
    }
}

//check to see if scrolling near bottom of page, then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


// On load
getPhotos();
