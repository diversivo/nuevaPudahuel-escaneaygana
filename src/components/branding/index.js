import React from 'react';
import logoNuevoPudahuel from '../../assets/svg/logo_nuevo_pudahuel.svg';
import DeslizayGana from '../../assets/images/desliza_y_gana.png';

const Branding = () => (
  <div className="branding txt-center">
    <img className="branding_logo" src={logoNuevoPudahuel} alt="Logo Nuevo Pudahuel" />
    <img className="branding_message" src={DeslizayGana} alt="Branding" />
  </div>
)

export default Branding;
