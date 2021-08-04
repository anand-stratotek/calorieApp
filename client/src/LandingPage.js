import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getUserbyName } from './api';

const LandingPage = () => {
  const [name, setname] = useState('');
  const [formSubmitted, setformSubmitted] = useState(false);

  if (formSubmitted) {
    return <Redirect to={{ pathname: '/calorie-form', state: { name } }} />;
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (name) {
      setformSubmitted(true);
    }
  };
  return (
    <>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Welcome to Calorie Application</h1>
            <p className='lead'>This project is developed by Anand Gautam</p>
            <form onSubmit={(e) => onFormSubmit(e)}>
              <div>
                <TextField
                  name={name}
                  label='Please enter your name'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <Button
                color='primary'
                variant='contained'
                id='name-submit'
                type='submit'
              >
                SUBMIT
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
