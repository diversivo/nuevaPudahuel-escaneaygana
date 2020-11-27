import React, { useEffect, useState } from 'react';
import Mapa from '../../assets/images/mapa.jpg';

const PopUp = ({isOpen,setPopup}) => {

  const closePopUp = () => setPopup(false);
  const prevent = (e) => { e.stopPropagation(); };


  return (
    <div className={`overlay ${isOpen ? 'popup--open' : 'popup--close'}`} onClick={closePopUp}>
      <div className="popup" onClick={prevent}>
        <div onClick={closePopUp} className="close-button">+</div>
        <div>
          <img alt="mapa" src={Mapa} />
        </div>
      </div>
    </div>
  );
}



export default PopUp;