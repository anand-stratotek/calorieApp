import React from 'react';
import LandingPage from './LandingPage';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CalorieForm from './CalorieForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    width: '100%',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <Router>
        <>
          <div className={classes.root}>
            <main className={classes.main}>
              <Switch>
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/calorie-form' component={CalorieForm} />
              </Switch>
            </main>
          </div>
          {/* <Footer /> */}
        </>
      </Router>
    </div>
  );
}

export default App;
