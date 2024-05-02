import React from "react";
import '../Common/Styles/MainPart.css'
import Header from './Header'

const LoadingCircle = () => {
  return (
    <div class="mainBackground">
        <Header/>
        <div class="spinner-border mx-auto my-auto" role="status">
          <span class="sr-only"></span>
        </div>
    </div>
  );
};

export default LoadingCircle;