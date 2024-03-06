import React from 'react'
import Header from './Header'


const Home = () => {
  return (
    <>
      <Header />
      <div>
        <div className="lftBox">
          <div>
            <p>Choose your interaction mode : </p><br/>
            <label>
              <input type="radio" name="options" value="option1" /> Option 1
            </label>
            <br />
            <label>
              <input type="radio" name="options" value="option2" /> Option 2
            </label>
            <br />
            <label>
              <input type="radio" name="options" value="option3" /> Option 3
            </label>
          </div>
        </div>
        <div className="rghtBox"></div>
      </div>
    </>
  );
}

export default Home