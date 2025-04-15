import React, { useState, useEffect, useCallback } from 'react';
import '../App.css'; // Import the CSS file

function DogImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDogImage = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setImageUrl(data.message);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setImageUrl(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchDogImage();
  }, [fetchDogImage]);

  if (loading) {
    return <p>Fetching a furry friend...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Woops! Couldn't fetch a doggo: {error}</p>
        <button onClick={fetchDogImage}>Try Again?</button>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="dog-container"> {/* Added this container div */}
        <h2>Here's a doggo!</h2>
        <img src={imageUrl} alt="A random dog" className="dog-image" /> {/* Added a class to the image */}
        <button onClick={fetchDogImage} className="fetch-button">Fetch Another One!</button> {/* Added a class to the button */}
      </div>
    );
  }

  return null;
}

export default DogImage;