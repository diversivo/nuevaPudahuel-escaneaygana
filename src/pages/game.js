
import React, { useState } from 'react';
import { navigate } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Branding from '../components/branding';

import Ruleta from '../components/ruleta';
import Config from '../assets/config/config.json';

const Game = ({ location }) => {

  // ?name=hola&email=hola&birthDate=hola&gender=hola

  // console.log(location);

  const { state } = location;

  const [winner, setWinner] = useState(17);
  const [code, setCode] = useState('');

  if (typeof window !== 'undefined') {

    if (!state || !state.email || !state.name || !state.birthDate) {
      navigate('/ruleta');
    }
  }

  // const getAge = (birth) => {
  //   const today = new Date();
  //   const birthDate = new Date(birth);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // };

  const edad = state ? state.birthDate : 0;

  const availableStores = Config.reduce((acum, elem) => {
    let response = [];
    const minEdad = elem.min_edad <= edad;
    const maxEdad = elem.max_edad > edad || elem.max_edad === -1;
    const correctGender = elem.gender.includes(parseInt(state ? state.gender : 0));
    const correctZone = elem.zone.includes(parseInt(state ? state.zone : 0));
    if (
      minEdad &&
      maxEdad &&
      correctGender &&
      correctZone
    ) {
      response = [elem]
    }
    return [...acum, ...response]
  }, [])


  // console.log('availableStores', availableStores);


  const submitToAPI = () => {
    const url = 'https://vy01mtf35c.execute-api.us-east-1.amazonaws.com/getPrize';
    const data = { ...state, promos: availableStores };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        // console.log('Success:', result);
        result.json().then((data) => {
          if (data.result === 'error.') {
            setWinner(17);
            setCode('NO');
          } else {
            setWinner(parseInt(data.id) - 1);
            setCode(data.code);
          }
        })
          .catch(() => {
            setWinner(17);
            setCode('NO');
          })
      })
      .catch((error) => {
        setWinner(17);
        setCode('NO');
        console.error('Error:', error);
      });
  };

  // console.log(Config);

  return (<Layout>
    <SEO title="Desliza y gana - Nueva Pudahuel" />
    <div className="branding--ruleta">
      <Branding />
    </div>
    <Ruleta submitToAPI={submitToAPI} winner={winner} code={code} maxPromos={availableStores.length} />
  </Layout>);
}


export default Game;