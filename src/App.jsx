import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Content from './components/Content';
import Aside from './components/Aside';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selecteddatas, setSelecteddatas] = useState([]);
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleDateChange = (datas) => {
    setSelecteddatas(datas);
  };

  const toggleAside = () => {
    setIsAsideVisible(!isAsideVisible);
  };

  return (
    <>
    {/* Sizes all the components using grid */}
      <div className='grid grid-cols-5 text-center'>
        <div className='col-span-5'>
          <Navbar onToggleAside={toggleAside} />
        </div>
        <div className={`Aside-class md:block ${isAsideVisible ? 'block' : 'hidden'} md:col-span-2 col-span-5 scroll-smooth transition-all duration-300 ease-in-out`}>
          <Aside ondatachange={handleDateChange} onSelectImage={handleImageSelect} />
        </div>
        <div className='md:col-start-3 md:col-span-3 md:row-span-1 row-span-4 col-span-5'>
          <Content selecteddatas={selecteddatas} selectedImage={selectedImage} />
        </div>
        <div className='col-span-5'>
          <Footer />
        </div>
      </div> 
    </>
  );
}

export default App;
