import React, { useState } from 'react';

function ImageComponent({ imageName }) {
  const [imageSrc, setImageSrc] = useState('');

  const getImage = async (imageName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/images/${imageName}`);
      if (response.ok) {
        const imageData = await response.blob();
        setImageSrc(URL.createObjectURL(imageData));
      } else {
        console.error('Failed to fetch image');
      }
    } catch (error) {
      console.error('Error occurred while fetching image:', error);
    }
  };

  // Call the getImage function when the component mounts
  React.useEffect(() => {
    getImage(imageName);
  }, [imageName]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Image" width={100} className="rounded"/>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default ImageComponent;
