
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Clock from '../components/streaming/clock';
import Video from '../components/streaming';
import ThanksImage from '../assets/images/pantalla-samsung.jpg';

import Logos from '../assets/images/logos.jpg';
import Branding from '../assets/images/branding.jpg';
import StreamingEvent from '../assets/images/streaming-event.jpg';

// Internet Explorer 6-11
let isIE = false;
if (typeof document !== 'undefined') {
   isIE = /*@cc_on!@*/false || !!document.documentMode;
}

const Streaming = ({ location }) => {

  const [milisTime, setMilisTime] = useState(1000);

  const stringDate = 'Sep 2, 2020 15:39:00 GMT-0400';

  const updateTimer = () => {
    const eventDate = new Date(stringDate);
    const today = new Date();
    setMilisTime(eventDate - today);
  };

  useEffect(() => { setInterval(updateTimer, 1000) }, []);

  return(
    <Layout>
    <SEO title="Samsung b2b Power Meeting - Streaming" />
    <div className="streaming__content">
      <img src={Logos} className="index__logos" alt="Logos Entel empresas y Samsung"></img>
      <div className="streaming__branding">
        <img src={Branding} alt="Samsung Branding"></img>
        <img className="index__streaming-event padding-1" src={StreamingEvent} alt="Streaming Event"></img>
      </div>
      <div className="streaming__info">
        {/* <Video/> */}
        <img src={ThanksImage} alt="gracias"></img>
        {/* {milisTime == 1000 ? '' : milisTime > 1000 ?
        <>
          <div className="streaming__info">
          <p>TIEMPO RESTANTE PARA QUE COMIENCE EL STREAMING DEl LANZAMIENTO <br />DEL NUEVO SAMSUNG GALAXY NOTE20</p>
          </div>
          <Clock stringDate={stringDate} />
        </>
        : <Video />} */}
        
      {/* <img src={ThanksImage} alt="gracias"></img> */}
      </div>
    </div>
  </Layout>
  );
  
};

export default Streaming;
