
import React, { useEffect, useState, useRef } from 'react';
import { navigate } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Branding from '../components/branding';

import Ruleta from '../components/ruleta';
import Config from '../assets/config/config.json';

const Game = ({ location }) => {

  // ?name=hola&email=hola&birthDate=hola&gender=hola

  console.log(location);

  const { state } = location;

  if(!state.email || !state.name || !state.birthDate){
    navigate('/ruleta');
  }

  const getAge = (birth) => {
    const today = new Date();
    const birthDate = new Date(birth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const availableStores = Config.reduce((acum, elem) => {
    let response = [];
    const edad = getAge(state.birthDate);
    const minEdad = elem.min_edad < edad;
    const maxEdad = elem.max_edad > edad || elem.max_edad === -1;
    const correctGender = elem.gender.includes(parseInt(state.gender));
    const correctZone = elem.zone.includes(parseInt(state.correctZone));
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
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  console.log(Config);

  return (<Layout>
    <SEO title="Desliza y gana - Nueva Pudahuel" />
    <div className="branding--ruleta">
    <Branding/>
    </div>
    <Ruleta submitToAPI={submitToAPI} />
  </Layout>);
}


export default Game;