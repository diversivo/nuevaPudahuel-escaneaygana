
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Clock from '../components/streaming/clock';
import Video from '../components/streaming';
import { navigate } from 'gatsby';
import ThanksImage from '../assets/images/pantalla-samsung.jpg';

import Logos from '../assets/images/logos.jpg';
import Branding from '../assets/images/branding.jpg';
import StreamingEvent from '../assets/images/streaming-event.jpg';

const Streaming = ({ location }) => {

  // if (typeof window != 'undefined') {
  //   const validEmails = [
  //     window.btoa('@ford.com').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@samsung.com').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@partner.samsung.com').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@p-per.com').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@movistar.cl').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@telefonica.com').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@cva.cl').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@ssangyong.cl').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@transbank.cl').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@koandina.com').replace(/[^a-zA-Z0-9]/g, ''),
  //     window.btoa('@diversivo.cl').replace(/[^a-zA-Z0-9]/g, ''),
  //   ];
  // }

  const validEmails = [
    "QGZvcmQuY29t",
    "QHNhbXN1bmcuY29t",
    "QHBhcnRuZXIuc2Ftc3VuZy5jb20",
    "QHAtcGVyLmNvbQ",
    "QG1vdmlzdGFyLmNs",
    "QHRlbGVmb25pY2EuY29t",
    "QGN2YS5jbA",
    "QHNzYW5neW9uZy5jbA",
    "QHRyYW5zYmFuay5jbA",
    "QGtvYW5kaW5hLmNvbQ",
    "QGRpdmVyc2l2by5jbA",
    "QHMyZ2ludGVybmF0aW9uYWwuY29t",
    "QHdzY2hpbGUuY2w",
    "QGd0Yi5jb20",
    "QGFkaWRhcy1ncm91cC5jb20",
    "QGFkaWRhcy5jb20",
    "QGNsYXJvY2hpbGUuY2w",
    "QG1ldHJvLmNs",
    "QGRjdi5jbA",
    "QG1nbW90b3JzLmNs",
    "QGxpZmVyYXkuY29t",
    "QGFmcGNhcGl0YWwuY2w",
    "QHN1cmEuY2w",
    "QGl0YmEuZWR1LmFy",
    "QGVudGVsLmNs",
    "QGVudGVsY2FuYWxlcy5jbA",
    "QGJocC5jb20",
    "QHBhcmFjaHV0ZS5jbA",
    "QGdydXBvZmlkZXMuY2w",
  ]

  const [milisTime, setMilisTime] = useState(1000);
  const [token, setToken] = useState(location.search.split('token=')[1]);

  const stringDate = 'Sep 11, 2020 09:15:00 GMT-0300';

  const updateTimer = () => {
    const eventDate = new Date(stringDate);
    const today = new Date();
    setMilisTime(eventDate - today);
  };

  useEffect(() => {
    if (!validEmails.includes(token)) navigate('/');

    const interval = setInterval(updateTimer, 1000)
    return function cleanup() {
      clearInterval(interval);
    }
  }, []);

  return (<Layout>
    <SEO title="Samsung b2b Power Meeting - Streaming" />
    <div className="streaming__content">
      <img src={Logos} className="index__logos" alt="Logos Entel empresas y Samsung"></img>
      <div className="streaming__branding">
        <img src={Branding} alt="Samsung Branding"></img>
        <img className="index__streaming-event padding-1" src={StreamingEvent} alt="Streaming Event"></img>
      </div>
      <div className="streaming__info">
        {milisTime == 1000 ? '' : milisTime > 1000 ?
        <>
          <div className="streaming__info">
          <p>TIEMPO RESTANTE PARA QUE COMIENCE EL STREAMING DEl LANZAMIENTO <br />DEL NUEVO SAMSUNG GALAXY NOTE20</p>
          </div>
          <Clock stringDate={stringDate} />
        </>
        : <img src={ThanksImage} alt="gracias"></img>}
        
      </div>
    </div>
  </Layout>);
}


export default Streaming;