import React from 'react';
//import './about.css';

export function About(props) {
  const [imageUrl, setImageUrl] = React.useState('');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.
  React.useEffect(() => {
    const apiKey = 'YVw_HNY8DJzhCXQ-sKV4T1pQt3TTdm1ZkdQpvr2YCqc';
    const apiUrl = `https://api.unsplash.com/photos/random?query=biology&client_id=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // const containerEl = document.querySelector('#picture');

        // const width = containerEl.offsetWidth;
        // const height = containerEl.offsetHeight;
        setImageUrl(data.urls.regular);
      })
      .catch();
  }, []);

  let imgEl = '';

  if (imageUrl) {
    imgEl = <img src={imageUrl} alt='stock background' />;
  }

  return (
    <main className='container-fluid text-center'>
      <div>
        <div id='picture' className='picture-box'>
          {imgEl}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-md-center text-center">
          <h1 className="display-7">About</h1>
        </div>
        <div className="row justify-content-md-center text-center">
          <p>This is a tool to help make working in a biology lab slightly more bearable.</p>
        </div>
      </div>
    </main>
  );
}
