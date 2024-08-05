import React, { useState, useEffect } from 'react';

const Content = ({ selectedImage, selecteddatas }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    

    // Scroll to the selected image when it is clicked
    useEffect(() => {
        const selectedIndex = selecteddatas.findIndex((item) => item.image === selectedImage);//The findIndex helps to find the index from the of the selecteddatas
        if (selectedIndex !== -1) {
            setCurrentIndex(selectedIndex);//updated the currentIndex
        }
    }, [selectedImage, selecteddatas]);//on every change of selectedImage and selecteddatas this useEffect hook render

    // This useEffect is to sure the container scrolls to the correct image position
    useEffect(() => {
        const element = document.getElementById('imageContainer');//using DOM to accesss the elements inside the id 'imageContainer'
        if (element) {
            element.scrollTop = currentIndex * window.innerHeight;//To calculate the vertical position(in pixel) of the image correspoding to the currentIndex
        }
    }, [currentIndex]);//Render on the change of currentIndex

   

    return (
        <div id="imageContainer" className="h-screen overflow-y-scroll">
            {selecteddatas.map((item, index) => (
                <div key={item.uid} className="view w-full h-screen flex flex-col justify-center items-center">
                    <div className='pt-3 px-3 sm:pb-10 pb-4 rounded-xl m-6 cursor-pointer transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300'><img className="T-Block rounded-xl sm:w-[300px] sm:h-[300px] w-[175px] h[175px]" src={item.image} alt="Selected" />
                    <span className=' font-extralight '>Name: {item.username}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Content;
