const count = 10; // Number of images to get
const apiKey = "vK8FhpG4c8LNWx_y6bPXsANVZBYc8KqBdpFtMQzJz8w";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPhotos();
