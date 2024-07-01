import React from 'react';
import './uploadLoader.css'; // Assuming the CSS is in a file named uploadLoader.css
import './selectFileLoader.css';

const UploadLoader = ({type}) => {
  return (
    <>
      {type ==='select'? <div className='selectFileLoader'></div> : <div className="uploadloader"></div>}
    </>
  );
};

export default UploadLoader;
