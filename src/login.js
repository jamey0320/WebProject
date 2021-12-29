import React, { Component } from 'react'
import fire from './config/fire';
import Sign from './SignUp';
import {Button, Form, Grid, Header, Image, Segment, Input} from 'semantic-ui-react';
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
class Login extends Component{
  constructor(props)
  {
    super(props);

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state ={
      email : "",
      password : ""
    }


  }
  login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
      console.log(u);

    }).catch((err)=>{
      console.log(err);
    })
  }



  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(user=>
    {
      if(user){
        this.handleSignup(this.state.email);
      }



    }).catch((err)=>
    {
    console.log(err);
    });
  }

    handleSignup( useremail){
      var userId = fire.auth().currentUser;
      fire.database().ref('users/' + userId.uid).set({
        email : useremail
      });
    }


  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value

    })
  }


  render(){


    return(

      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              국내여행 동행 구할 땐! "같이가요"
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                type="email"
                id="email"
                name ="email"
                onChange = {this.handleChange}
                value = {this.state.email}
                />

                <Form.Input
                  fluid icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type = "password"
                  id = "password"
                  name = "password"
                  onChange={this.handleChange}
                  value = {this.state.password}
                />

                <Button onClick={this.login} color='teal' fluid size='large'>
                  로그인
                </Button>
              </Segment>
            </Form>

            <Button onClick = {this.signup} color='teal' fluid size='large'>
              회원가입
            </Button>

          </Grid.Column>
        </Grid>

      </div>

    )
  }
}
export default Login;
