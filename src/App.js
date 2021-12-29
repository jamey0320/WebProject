import React, {Component} from 'react';
import {Button, Progress, Input, Image, Comment, Form, Header} from 'semantic-ui-react';

//import Menu from "./menu.js"
import fire from './config/fire';
import Login from './login';
import Home from './Home';
import Menu from './menu.js';
import FaqLayout from './FaqLayout.js'
import BoardWrite from './BoardWrite.js'
import SignUp from './SignUp.js'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
class App extends Component{

  constructor(props)
  {
    super(props);
    this.state = {
      user : {}
    }
  }


  componentDidMount(){
    this.authListner();
  }
  authListner(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else {
        this.setState({ user : null })

      }
    })
  }



  render()
  {
    return (

      <div className="App">
        {

           this.state.user ?  (<Home/>) : (<Login/>)
       }

      </div>







           );
  }

}
export default App;
