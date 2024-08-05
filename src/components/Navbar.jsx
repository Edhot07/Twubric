import React, { useState } from 'react';

const Navbar = ({ onToggleAside }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onToggleAside();
  };

  return (
    <div>
      <header className="text-gray-600 body-font bg-blue-950 ">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0" >
            <img className='h-10 rounded-full' src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722643200&semt=ais_hybrid" alt="" />
            <span className="ml-3 text-xl" >Twubric</span>
          </a>
          
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-white justify-center">
            <a className="mr-5 hover:h-14 w-14 rounded-full border-white cursor-pointer transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" href='https://x.com/home'><img className='md:h-12 md:w-12 rounded-full' src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/43ac02a557532c5bb2f7cfe1fd35332e-1601735589/02/send-101-animated-gif-icons.gif" alt="" /></a>
            <a className="mr-5  cursor-pointer border-white transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Version</a>
            <a className="mr-5 hover:h-14 w-14 rounded-full border-white cursor-pointer transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"><img className='md:h-12  md:w-12  rounded-full' src="https://designmodo.com/wp-content/uploads/2015/09/speaker_workshop.gif" alt="" /></a>
          </nav>

          <button onClick={handleToggleMenu} className='hamburger md:hidden invert'>
            {isMenuOpen ? 
              <img className='h-12 w-12 rounded-full' src="https://cdn.dribbble.com/users/108183/screenshots/2016141/close.gif" alt="Close" /> :
              <img className='h-12 w-12 rounded-full' src="https://cdn.dribbble.com/users/1573707/screenshots/4616126/menu800600bc.gif" alt="Menu" />
            }
          </button>

        </div>
      </header>
    </div>
  );
}

export default Navbar;
