const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let count = 5; // Number of images to get, initially loading only 5 images and after that loading 30 images.
const apiKey = "vK8FhpG4c8LNWx_y6bPXsANVZBYc8KqBdpFtMQzJz8w";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let totalImages = 0; // total number of images got from the API.
let loadedImages = 0; // how many images are loaded.
let ready = false;
let photosArray = [];

// 4th function to get called.
function imageLoaded() {
  loadedImages++;
  if (loadedImages === totalImages) {
    // if total number of images loaded are equals to the length of images got from API.
    ready = true;
    console.log("ready true");
    console.log("loaded images = ", loadedImages);
    count = 30; // once initial load is completed, then we will load 30 images everytime user scrolls to the bottom of the website
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    loader.hidden = true;
  }
}

// function to display photos from photosArray.... 2nd function to get called.
function displayPhotos() {
  loadedImages = 0;
  totalImages = photosArray.length;
  console.log("total images = ", totalImages);
  photosArray.forEach((photo) => {
    // creating 'a' tag & 'img' tag for each photo
    const link = document.createElement("a");
    setAttributes(link, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_descritption,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded); // calling imageLoaded evertime when an image is loaded to increment loadedImages.

    // adding 'img' tag inside 'a' tag & adding 'a' tag inside image container
    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

// Get photos from Unsplash API... 1st function to get called.
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    photosArray = data;
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight &&
    ready
  ) {
    ready = false;
    console.log("bottom hit");
    getPhotos();
  }
});

// helper function to set Attributes of 'img' & 'a' tag.... 3rd function to get called.
function setAttributes(element, attributes) {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// on load
getPhotos();
