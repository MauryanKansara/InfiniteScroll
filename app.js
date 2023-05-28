const imageContainer = document.getElementById("image-container");

const count = 10; // Number of images to get
const apiKey = "vK8FhpG4c8LNWx_y6bPXsANVZBYc8KqBdpFtMQzJz8w";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];

// helper function to set Attributes of 'img' & 'a' tag
function setAttributes(element, attributes) {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// function to display photos from photosArray
function displayPhotos() {
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
      title: photo.alt_descritption,
    });

    // adding 'img' tag inside 'a' tag & adding 'a' tag inside image container
    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

// Get photos from Unsplash API
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

getPhotos();
