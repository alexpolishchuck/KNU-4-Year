import React from "react";
import '../Common/Styles/MainPart.css'
import Header from './Header'

const LoadingCircle = () => {
  return (
    <div className="mainBackground">
        <Header/>
        <div className="spinner-border mx-auto my-auto" role="status">
          <span className="sr-only"></span>
        </div>
    </div>
  );
};

export default LoadingCircle;