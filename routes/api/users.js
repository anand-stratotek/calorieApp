const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const Users = require('../../models/Users');
const router = express.Router();

//@route  POST api/user
//@desc   Register User
//@access Public

router.post('/', async (req, res) => {
  const { name, activityLevel, weight, bodyFat } = req.body;
  // console.log(req.body);

  try {
    //See if user exists
    let user = await Users.findOne({ name });
    // console.log('USER=>', user);

    /*
    TDEE= Activity Level factor * BMR
		   
    Activity Level Factor:
    
    1.2==>Sedentary
    1.375=> Lightly active
    1.55=> Moderately Active
    1.725=>Very Active
    1.9=> For extra active
      
    BMR=>21.6 X (weight - (Body Fat% * Weight))+370
*/

    const bmr = 21.6 * (weight - bodyFat * weight) + 370;
    const tdee = bmr * activityLevel;

    if (user) {
      user = new Users({
        name,
        activityLevel,
        weight,
        bodyFat,
        bmr,
        tdee,
      });
      return res.send(user);
    }

    user = new Users({
      name,
      activityLevel,
      weight,
      bodyFat,
      bmr,
      tdee,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/user
//@desc   Register User
//@access Public

router.post('/user', async (req, res) => {
  const { name } = req.body;
  // console.log(req.body);

  try {
    //See if user exists
    let user = await Users.findOne({ name });
    // console.log('USER=>', user);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
