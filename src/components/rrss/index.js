import React from 'react';
import logoNuevoPudahuel from '../../assets/svg/logo_nuevo_pudahuel.svg';
import Linkedin from '../../assets/svg/linkedin.svg';
import Facebook from '../../assets/svg/facebook.svg';
import Twitter from '../../assets/svg/twitter.svg';
import Instagram from '../../assets/svg/instagram.svg';

const Rrss = () => (
  <div className="footer">
    <img className="footer__branding" src={logoNuevoPudahuel} alt="Logo Nuevo Pudahuel" />
    <div className="rrss">
      <a href="https://web.facebook.com/NuevoPudahuel?_rdc=1&_rdr"><img src={Facebook}></img></a>
      <a href="https://twitter.com/NuevoPudahuel/"><img src={Twitter}></img></a>
      <a href="https://www.instagram.com/aeropuertoamb/"><img src={Instagram}></img></a>
    </div>
  </div>
)

export default Rrss;