import React, { useState, useEffect } from 'react';
import { browserVersion, isSafari } from 'react-device-detect';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Branding from '../components/branding';
import PopUp from '../components/popup';

import Bigboy from '../assets/images/bigboy.png';
import Brands from '../components/trademarks';
import Rrss from '../components/rrss';

// import OutputLoad from '../components/contact/output-load';
// import OutputError from '../components/contact/output-error';

const IndexPage = ({ location }) => {

  const [warn, setWarn] = useState('');
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      let warning = null;
      if (typeof window !== 'undefined') {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
          warning = <div style={{ color: 'black', fontSize: '20px' }}>Este sitio no se encuentra soportado en este navegador por favor utilice uno diferente.</div>;
        }
        if (isSafari && browserVersion < 11) {
          warning = <div style={{ color: 'black', fontSize: '20px' }}>Este sitio no se encuentra soportado en este navegador por favor actualice su navegador o utilice uno diferente.</div>;
        }
      }
      setWarn(warning);
    }, 2000);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.Tawk_API.hideWidget()
      }
    }, 200)
  }, [])

  return <Layout>
    <SEO title="Nuevo Pudahuel - Escanea y Gana" />
    <PopUp isOpen={popup} setPopup={setPopup} />
    <div className="container">
      <div className="content">
        <Branding />
        <h1 className="title">¿CÓMO JUGAR?</h1>
        <div className="align-start-center">
          <div className="number">1</div>
          <h2>Escanea los QR</h2>
        </div>
        <div className="grid-2-col">
          <div>
            <p>Encuentra los códigos QR en los diferentes personajes ubicados en distintos puntos del aeropuerto.</p>
            <p>Dependiendo de la zona en la que te encuentres podrás canjear distintos premios de las tiendas más cercanas a ti.</p>
          </div>
          <img src={Bigboy} alt="Personaje" />
        </div>
        <button onClick={()=> setPopup(true)} className="spin-btn">  Ver Mapa</button>
        <div className="align-start-center">
          <div className="number">2</div>
          <h2>Completa el formulario</h2>
        </div>

        <div className="align-start-center">
          <div className="number">3</div>
          <h2>¡Juega y descubre tu premio!</h2>
        </div>
        <h1 className="title">MARCAS ADHERIDAS</h1>
        <Brands />
        <Rrss />
      </div>
    </div>
  </Layout>
};

export default IndexPage;