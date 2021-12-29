import React, {Component} from 'react'
import {Container, Image, Button, Menu} from 'semantic-ui-react';
import {Link, BroswerRouter as Router,Switch,Route} from "react-router-dom";
import fire from './config/fire.js';
import "firebase/auth";
import firebase from "firebase/app";

const MenuClass = () =>{
  return (
    <div>
      <nav>
        <Menu size='large' fixed='top' inverted>
          <Container>
            <Link to='/Home'>
            <Menu.Item as='a' header>같이가요</Menu.Item>
            </Link>
            <Link to='/Home'>
              <Menu.Item as='a' style={{ marginLeft: '5em' }}>홈</Menu.Item>
            </Link>
            <Link to = '/Find'>
              <Menu.Item as='a'>국내동행찾기</Menu.Item>
            </Link>
            <Link to = '/AfterTravel'>
              <Menu.Item as='a'>여행후기</Menu.Item>
            </Link>
            <Link to = '/FreeBoard'>
              <Menu.Item as='a'>자유게시판</Menu.Item>
            </Link>
            <Link to = '/FaqLayout'>
              <Menu.Item as='a'>이용FAQ</Menu.Item>
            </Link>
            <Link to = '/SendMail'>
              <Menu.Item as='a'>문의 및 신고</Menu.Item>
            </Link>
            <Menu.Item>
              <Button onClick={ () =>{
                firebase.auth().signOut();
                }}>LOGOUT
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </nav>
    </div>
  );
}

export default MenuClass;
