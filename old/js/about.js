const apiKey = 'YVw_HNY8DJzhCXQ-sKV4T1pQt3TTdm1ZkdQpvr2YCqc';
const apiUrl = `https://api.unsplash.com/photos/random?query=biology&client_id=${apiKey}`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const imageUrl = data.urls.regular;
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.classList.add('img-fluid', 'rounded');
    const divElement = document.querySelector('.biology'); 
    divElement.innerHTML = '';
    divElement.appendChild(imageElement);
  })
  .catch((error) => {
    console.error('Error fetching image:', error);
  });
