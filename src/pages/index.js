import React, {useState, useEffect} from 'react';
import { browserVersion, isIE, isSafari } from 'react-device-detect';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Form from '../components/contact/contact-form';

import Logos from '../assets/images/logos.jpg';
// import LogoLeft from '../assets/svg/logo-samsung.svg';
// import LogoRight from '../assets/svg/logo-movistar.svg';
import Branding from '../assets/images/branding.jpg';
import StreamingEvent from '../assets/images/streaming-event.jpg';
import ImgNote20 from '../assets/images/note20-right.jpg';
// import OutputLoad from '../components/contact/output-load';
// import OutputError from '../components/contact/output-error';

const IndexPage = ({ location }) => {

  const [warn, setWarn] = useState('');
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
    <SEO title="Samsung b2b Power Meeting - Inicio" />
    <div className="index__container">
      <div className="index__content-left">
        {/* <img className="index__logo-left" src={LogoLeft} alt="Logo Movistar"></img>
        <img className="index__logo-right" src={LogoRight} alt="Logo Samsung"></img> */}
        <img src={Logos} className="index__logos" alt="Logos Entel empresas y Samsung"></img>
        <img className="index__branding" src={Branding} alt="Samsungb2bAtHome"></img>
        <img className="index__streaming-event" src={StreamingEvent} alt="Streaming Event"></img>
        {warn ? warn : <Form location={location} />}
        {/* <OutputLoad />
        <OutputError /> */}
      </div>
      <div className="index__content-right">
        <img className="index__img" src={ImgNote20} alt="Note20"></img>
      </div>
    </div>
  </Layout>
};

export default IndexPage;