
import React, {useState } from 'react';
import Aside from './components/Aside';
import Content from './components/Content';

const MainComponent = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (image) => {
      setSelectedImage(image);
    };

  return (
    <div className="main-container flex">
      <Aside onSelectImage = {handleImageSelect} />
      <Content selectedImage={selectedImage} />
    </div>
  );
};

export default MainComponent;
