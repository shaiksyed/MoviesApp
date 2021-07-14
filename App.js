import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import './App.css'
import HomeMovie from './components/HomeMovie'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/movie/:id" component={HomeMovie} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
