import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main/main';
import Moviments from './pages/Moviments/moviments';
import NewMoviment from './pages/NewMoviment/NewMovient';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path= "/" exact component={Main}/>
                <Route path= "/moviments" component={Moviments}/>
                <Route path= "/newmoviment" component={NewMoviment}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;