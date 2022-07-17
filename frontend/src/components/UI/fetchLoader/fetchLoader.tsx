import React from 'react';
import "./fetchLoader.scss"

const FetchLoader: React.FC = () => {
  return (
    <div className="post-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default FetchLoader;