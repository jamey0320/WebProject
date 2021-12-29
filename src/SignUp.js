import React, { Component } from 'react'
import fire from './config/fire';
import {Button, Form, Grid, Header, Image, Segment, Input} from 'semantic-ui-react';
class Signup extends Component{

  constructor(props)
  {
    super(props);

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state ={
      email : "",
      password : "",
      nickname : ""
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
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password, this.state.nickname).then(user=>
    {
      if(user){
        this.handleSignup(this.state.email, this.state.nickname);
      }



    }).catch((err)=>
    {
    console.log(err);
    });
  }

    handleSignup( useremail, usernickname){
      var userId = fire.auth().currentUser;
      fire.database().ref('users/' + userId.uid).set({
        email : useremail,
        nickname : usernickname
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
              <Image src='/logo.png' /> Log-in to your account
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

                <Form.Input
                fluid icon='nickname'
                iconPosition='left'
                placeholder='닉네임을 입력해주세요'
                type="text"
                id = "text"
                name ="text"
                onChange = {this.handleChange}
                value = {this.state.nickname}
                />

                <Button onClick={this.login} color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Button onClick = {this.signup} color='teal' fluid size='large'>
              Sign Up
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Signup;
