import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import  Home from './pages/Home';
import Contato from './pages/Contato';
import About from './pages/About';

function Routes(){
    return(
        <BrowserRouter>
        <Switch>
        <Route path="/Home" element={<Home />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/About" element={<About />} />
        </Switch>

        </BrowserRouter>
    )

}