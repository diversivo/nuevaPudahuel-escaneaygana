import React, { useEffect, useState } from 'react';

const PopUp = ({isOpen,setPopup}) => {

  const closePopUp = () => setPopup(false);
  const prevent = (e) => { e.stopPropagation(); };


  return (
    <div className={`overlay ${isOpen ? 'popup--open' : 'popup--close'}`} onClick={closePopUp}>
      <div className="popup" onClick={prevent}>
        <div onClick={closePopUp} className="close-button">+</div>
        <div>
          <p className="popup-text">
            Por nuestro lanzamiento usa el código
          </p>
          <p className="codigo" >MARCHABLANCA</p>
          <p className="popup-text">
            para obtener un 20% de descuento hasta el jueves 22 de octubre
          </p>
        </div>
      </div>
    </div>
  );
}



export default PopUp;