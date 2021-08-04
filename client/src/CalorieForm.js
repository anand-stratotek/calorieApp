import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import activityData from './activityData.json';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getTDEE, getUserbyName } from './api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CalorieForm = ({ location }) => {
  const classes = useStyles();
  const nameRecieved = location?.state?.name;
  const nameFromSession = JSON.parse(sessionStorage.getItem('userData'));
  //   console.log('NAME FROM SESSION=>', nameFromSession);
  //   console.log(activityData);
  const initialState = {
    weight: '',
    activityLevel: '',
    bodyFat: '',
  };

  const [formData, setformData] = useState(initialState);
  const { activityLevel, bodyFat, weight } = formData;
  const [recievedData, setrecievedData] = useState(null);

  //   console.log('FORMDATA=>', formData);
  const onCalorieFormSubmit = (e) => {
    e.preventDefault();
    const dataRecieved = getTDEE({
      name: nameRecieved,
      activityLevel,
      bodyFat: bodyFat / 100,
      weight,
    }).then((data) =>
      // console.log(data)
      setrecievedData(data)
    );
    // console.log('FORM SUBMITTED=>', dataRecieved);
  };

  useEffect(() => {
    const user = getUserbyName({ name: nameRecieved }).then((data) => {
      if (data) {
        // console.log(data);
        setrecievedData(data);
        setformData({
          activityLevel: data?.activityLevel,
          bodyFat: data?.bodyFat * 100,
          weight: data?.weight,
        });
      }
    });
  }, []);

  return (
    <div className='form-container'>
      <div className='x-med'>
        Know your TDEE status by entering the data in form
      </div>
      <div className='form'>
        <form onSubmit={(e) => onCalorieFormSubmit(e)}>
          <div className='item'>
            <div className='label-text'>Please Enter your weight(kgs):</div>
            <TextField
              name='weight'
              value={weight}
              label='Weight(Kgs)'
              type='number'
              onChange={(e) =>
                setformData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className='item'>
            <div className='label-text'>Please Enter your Body Fat%:</div>
            <TextField
              name='bodyFat'
              value={bodyFat}
              label='Body Fat(%)'
              type='number'
              onChange={(e) =>
                setformData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className='item'>
            <div className='label-text'>Please Select the activityLevel:</div>
            <FormControl className={classes.formControl}>
              <InputLabel>Activity Level</InputLabel>
              <Select
                value={activityLevel}
                name='activityLevel'
                onChange={(e) =>
                  setformData({ ...formData, [e.target.name]: e.target.value })
                }
              >
                {activityData.map((activity) => (
                  <MenuItem value={activity?.value}>{activity.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            color='primary'
            variant='contained'
            id='name-submit'
            type='submit'
            className='calorie-submit'
          >
            SUBMIT
          </Button>
        </form>
      </div>

      {recievedData && (
        <div className='result-box'>
          <div>
            <div>
              <strong>Result(TDEE):</strong> {recievedData?.tdee}
            </div>
            <div>
              <strong>Result(BMR):</strong> {recievedData?.bmr}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieForm;
