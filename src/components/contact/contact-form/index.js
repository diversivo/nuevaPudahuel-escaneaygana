import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';

const ContactForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [zone, setZone] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [zoneError, setZoneError] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // it's no longer the first render
      return; // skip the code below
    }

    if (name.length) {
      const nameFormat = /^[A-zÀ-ú][A-zÀ-ú\s]*$/
      setNameError(nameFormat.test(name) ? '' : 'Su nombre solo puede contener letras y espacios.');
    }

    if (zone.length) {
      setZoneError(zone === 'none' ? 'Seleccione en la zona en que se encuentra.' : '');
    }

    if (email.length) {
      const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      setEmailError(mailformat.test(email) ? '' : 'El correo ingresado debe ser un correo corporativo válido.');
    }

  }, [name, email]);

  const validForm = name.length &&
    email.length &&
    zone.length &&
    !nameError.length &&
    !emailError.length &&
    !zoneError.length


  const formClass = `button ${validForm ? '' : 'button--disabled'}`;
  console.log('FormValid', validForm);

  return (
    <form className="index__form form" id="contact-form" method="post">
      <label htmlFor="name-input">
        Nombre
        <input
          name="name"
          id="name-input"
          type="text"
          placeholder="Nombre Completo"
          value={name}
          className={nameError.length ? 'error' : ''}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="form__helper">{nameError}</p>
      </label>
      <label htmlFor="email-input">
        Correo
        <input
          name="email"
          id="email-input"
          type="text"
          placeholder="Correo corporativo"
          value={email}
          className={emailError.length ? 'error' : ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="form__helper">{emailError}</p>
      </label>
      <label htmlFor="phone-input">
        Fecha de nacimiento
        <input
          name="date"
          id="date-input"
          type="date"
          placeholder="dd/mm/aaaa"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </label>

      <label>Sexo</label>
      <div className="radio_content">
        <input
          type="radio"
          id="masculino"
          name="sexo"
          value="0"
          checked={gender === "0"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="masculino">Masculino</label>
        <input
          type="radio"
          id="femenino"
          name="sexo"
          value="1"
          checked={gender === "1"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="femenino">Femenino</label>
      </div>

      <label htmlFor="zone">Zona de aeropuerto</label>
      <select
        name="zone"
        id="zone"
        onChange={(e) => setZone(e.target.value)}
      >
        <option value="none">Zona en la que estás ahora</option>
        <option value={2}>Hall Principal</option>
        <option value={0}>Embarque Nacional</option>
        <option value={1}>Embarque Internacional</option>
      </select>

      <Link
        type="button"
        disabled={!validForm}
        className={formClass}
        to="/game"
        state={{ name, email, gender, birthDate, zone }}
      >
        {'ENVIAR'}
      </Link>
    </form>
  );
};

export default ContactForm;
