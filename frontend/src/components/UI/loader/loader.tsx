import React from 'react';
import "./loader.scss"

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader