import axios from 'axios';

export const getUserbyName = async (formData) => {
  //   console.log(formData);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/users/user', formData, config);
    // console.log('RESPONSE=>', res.data);
    if (res.data.name)
      sessionStorage.setItem('userData', JSON.stringify(res.data));
    else
      sessionStorage.setItem('userData', JSON.stringify({ name: 'invalid' }));

    return res.data;
  } catch (error) {
    console.log('ERROR=>', error);
  }
};
export const getTDEE = async (formData) => {
  //   console.log(formData);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/users', formData, config);
    // console.log('RESPONSE=>', res.data);
    return res.data;
  } catch (error) {
    console.log('ERROR=>', error);
  }
};
