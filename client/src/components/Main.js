import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Feed from './Feed';
import Explore from './Explore';

const Main = (props) => {
  const { podcasts, handleSearch} = props;
  return (
    <main>
      <Switch>
        <Route exact path='/' render={ (props) => 
          ( <Feed podcasts={podcasts} /> ) 
        } />
        <Route path='/explore' render={ (props) => 
          ( <Explore podcasts={podcasts} handleSearch={handleSearch} /> ) 
        } />
      </Switch>
    </main>
  )
}

export default Main;