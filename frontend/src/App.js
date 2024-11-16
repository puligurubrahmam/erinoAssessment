import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './Home'
import Contacts from './Contacts'
import UpdateContact from './UpdateContact'

const App = () =>
{
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/contacts" component={Contacts}/>
        <Route exact path="/contacts/update/:id" component={UpdateContact}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App