import { useState } from "react";
import Xcross from "../icons/xcross"

const SearchBar = ({ onSearch }) => {

  const [focussed, setFocus] = useState(false);

  const [searchdata, setData]  = useState('');

  const handleInputChange = (event) => {
    setData(event.target.value);
  };
  const blur = (event) => {
    setFocus(false)
    setData('');
  };

  const clearSearch = () => {
    console.log('search data')
    setData('');
  }


  return (
    <div className='component'>
    <div className={`${focussed === true ? "focus" : "search"}`}>
            <img src='/images/search-logo.png' alt='' className='img' width='20px' height='20px' />
            <input className='innerbar' value={searchdata} onFocus={() => setFocus(true)} onBlur={() => blur()}  type="text" placeholder="Search a product"  onChange={handleInputChange} />
            <div className='x' onClick={()=> clearSearch()}><Xcross  /></div>
    </div>
    </div>
  );
};

export default SearchBar;