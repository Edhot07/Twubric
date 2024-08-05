import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Aside = ({ onSelectImage, ondatachange }) => {
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [monthData, setMonthData] = useState({});
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState('ascending');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [searchTerm, setsearchTerm] = useState('')

  // Fetch data from API
  const fetchData = async () => {
    let a = await fetch("https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json");
    let data = await a.json();
    setDatas(data);
    setFilteredDatas(data);
  };

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = ('0' + date.getDate()).slice(-2);
    return `${month} ${day}, ${year}`;
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Map month data after fetching
  useEffect(() => {
    if (datas.length > 0) {
      const monthDataMap = datas.reduce((acc, item) => {
        acc[item.uid] = formatDate(item.join_date);
        return acc;
      }, {});
      setMonthData(monthDataMap);
    }
  }, [datas]);

  // Handle sorting of data
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortKey(key);
      setSortDirection('ascending');
    }
  };

  // Sort data when sortKey or sortDirection changes
  useEffect(() => {
    if (sortKey) {
      const sortedData = [...filteredDatas].sort((a, b) => {
        const aValue = sortKey.startsWith('twubric.') ? a.twubric[sortKey.split('.')[1]] : a[sortKey];
        const bValue = sortKey.startsWith('twubric.') ? b.twubric[sortKey.split('.')[1]] : b[sortKey];
        if (aValue < bValue) {
          return sortDirection === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFilteredDatas(sortedData);
    }
  }, [sortKey, sortDirection]);

  // Filter data based on date range
  const handleDateChange = () => {
    let filtered = datas;

    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const joinDate = new Date(item.join_date * 1000);
        return joinDate >= startDate && joinDate <= endDate;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDatas(filtered);
  };

  // Reapply date filter when date range or search term changes
  useEffect(() => {
    handleDateChange();
  }, [startDate, endDate, searchTerm]);

  // Handle user removal
  const handleRemove = (uid, username) => {
    let con = confirm(`Are you sure you want to remove ${username} from your Follow List`);
    if (con) {
      const updatedDatas = filteredDatas.filter(item => item.uid !== uid);
      setFilteredDatas(updatedDatas);
      setDatas(updatedDatas);
      toast.success(`${username} is Removed from your Follow List`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Handle image selection
  const handleImageSelect = (image) => {
    onSelectImage(image);
  };

  // Pass all the datas
  useEffect(() => {
    ondatachange(datas);
  }, [datas, ondatachange]);

  // Handle keyboard shortcuts
  const handleKeyDown = (event) => {
    console.log(`${event} is event, Key pressed: ${event.key}, Shift: ${event.shiftKey}`); // Debugging line
    if (event.key === 'ArrowDown') {
      setSelectedUserIndex(prevIndex => Math.min(prevIndex + 1, filteredDatas.length - 1));
    }
    else if (event.key === 'ArrowUp') {
      setSelectedUserIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
    else if (event.key === 'Enter' && selectedUserIndex !== null) {
      const item = filteredDatas[selectedUserIndex];
      if (item) {
        handleImageSelect(item.image);
      }
    }
    else if (event.key === 'Delete') {
      if (selectedUserIndex !== null && selectedUserIndex >= 0 && selectedUserIndex < filteredDatas.length) {
        const user = filteredDatas[selectedUserIndex];
        handleRemove(user.uid, user.username);
      }
    }
    else if (event.shiftKey) {
      switch (event.key.toLowerCase()) {
        case 't': // Shift + t to sort by Twubric Score
          handleSort('twubric.total');
          break;
        case 'f': // Shift + f to sort by Friends
          handleSort('twubric.friends');
          break;
        case 'i': // Shift + i to sort by Influence
          handleSort('twubric.influence');
          break;
        case 'c': // Shift + c to sort by Chirpiness
          handleSort('twubric.chirpiness');
          break;
          case 's':
            document.getElementById('start-date').focus();
            break;
          case 'e':
            document.getElementById('end-date').focus();
            break;
        default:
          break;
      }
    }
  };




  // Add event listener for keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredDatas, selectedUserIndex]);


  // To handle the search change
  const handleSearchChange= (event) => {
    setsearchTerm(event.target.value);
  }
  

  return (
    <div className='md:text-xl text-sm flex flex-col h-screen text-white bg-transparent'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='Sort-Join md:text-xl text-sm flex flex-col gap-2 p-2 bg-slate-950'>
        <div className="sortBy flex flex-col">
          <div className='font-bold'>Sort By</div>
          <div className='grid lg:grid-cols-4 grid-cols-4 gap-1  text-lg '>
            <button onClick={() => handleSort('twubric.total')} type="button" className='rounded-xl md:col-span-2 border border-white cursor-pointer transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>Twubric Score</button>
            <button onClick={() => handleSort('twubric.friends')} type="button" className='rounded-xl md:col-span-2 border border-white cursor-pointer transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>Friends</button>
            <button onClick={() => handleSort('twubric.influence')} type="button" className='rounded-xl md:col-span-2 border border-white cursor-pointer transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>Influence</button>
            <button onClick={() => handleSort('twubric.chirpiness')} type="button" className='rounded-xl md:col-span-2 border border-white cursor-pointer transition ease-in-out delay-150 bg-blue-950 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>Chirpiness</button>
          </div>
        </div>

        <div className="joinedBetween-Section flex flex-col">
          <span className='font-bold'>Joined Twitter Between</span>
          <div className='joined-date grid xl:grid-cols-2 grid-rows-2'>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="border-2 border-black text-black py-1 px-2 rounded-full"
              id='start-date'
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="border-2 border-black text-black py-1 px-2 rounded-full"
              id='end-date'
            />
          </div>
        </div>


        {/* Search Bar Section */}
        <div className='search-bar p-2 bg-slate-950'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by username"
          className='w-full p-2 rounded-lg border border-white text-black'
        />
      </div>

      </div>

      {/* DATA MAP SECTION */}
      <section className="Datas-Section flex-1 overflow-y-scroll p-4">
        <div className='flex flex-col gap-4'>
          {filteredDatas.map((item, index) => (
            <div key={item.uid} className={selectedUserIndex === index ? 'selected' : ''}>
              <div className='T-Block grid grid-cols-3 border-4 text-center border-white  rounded-xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                <div className='col-span-3 border border-black text-start'>
                  <div className='flex justify-around items-center bg-blue-950 md:text-2xl text-xl'>
                    <div className='flex items-center gap-2 p-1'>
                      <img onClick={() => handleImageSelect(item.image)} className={`md:h-10 h-6 rounded-full  cursor-pointer`} src={item.image} alt="" />
                      <h2 onClick={() => handleImageSelect(item.image)} className=' cursor-pointer'>{item.username}</h2>
                    </div>
                    <span>{item.twubric.total}</span>
                  </div>
                </div>
                <div className='border border-white'>{item.twubric.friends}<p>Friends</p></div>
                <div className='border border-white'>{item.twubric.influence}<p>Influence</p></div>
                <div className='border border-white'>{item.twubric.chirpiness}<p>Chirpiness</p></div>
                <div className='col-span-1 border border-white'>{monthData[item.uid]}</div>
                <div
                  className='col-span-2 border border-white cursor-pointer transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-800 duration-300'
                  onClick={() => handleRemove(item.uid, item.username)}>Remove</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Aside;
