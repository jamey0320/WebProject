import React, { Component ,useState } from 'react';
import {Card, Icon, Container, Divider, Dropdown, Grid, Header, Image, Button,
  List,  Menu,  Segment, Pagination, Table} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import fire from './config/fire';

function Homepage(){

  const [freeboard , setFreeBoard] = useState([]);
  const [aftertravel, setAfterTravel] = useState([]);
  const [find, setFind] = useState([]);
  var email;
  var userId = fire.auth().currentUser;
  if (userId != null) {
    var email = userId.email;
  }
  React.useEffect(() =>{


    var userId = fire.auth().currentUser;

    var query = fire.database().ref('동행게시판').limitToLast(5);

    const loadingFind = query.on("value" , async (snapshot) =>
        {
          setFind([]);
          await snapshot.forEach(function(childSnapshot)
          {
            setFind(data =>
              [...data,
                {
                title : childSnapshot.val().title,
                writeDate : childSnapshot.val().writeDate,
                email :childSnapshot.val().email,
                key : childSnapshot.val().key
                }
              ]);
          }
        );

         });

      return () => {
            query.off('value', loadingFind);
          };

    },[]);
  React.useEffect(() =>{


  var userId = fire.auth().currentUser;

  var query = fire.database().ref('자유게시판').limitToLast(5);

  const loadingFreeBoard = query.on("value" , snapshot =>
      {
        snapshot.forEach(function(childSnapshot)
        {
          setFreeBoard(data =>
            [...data,
              {
              title : childSnapshot.val().title,
              writeDate : childSnapshot.val().writeDate,
              email :childSnapshot.val().email,
              userId : childSnapshot.val().userId,
              key : childSnapshot.val().key,
              }
            ]);
        }
      );
       }
     );

    return () => {
          query.off('value', loadingFreeBoard);
        };
  },[]);

  React.useEffect(() =>{


  var userId = fire.auth().currentUser;

  var query = fire.database().ref('여행후기').limitToLast(5);

  const loadingAfterTravel = query.on("value" , snapshot =>
      {
        snapshot.forEach(function(childSnapshot)
        {
          setAfterTravel(data =>
            [...data,
              {
              title : childSnapshot.val().title,
              writeDate : childSnapshot.val().writeDate,
              email :childSnapshot.val().email,
              userId : childSnapshot.val().userId,
              key : childSnapshot.val().key,
              }
            ]);
        }
      );
       }
     );

    return () => {
          query.off('value', loadingAfterTravel);


        };
  },[]);

  return (
<div class ='ui form' style={{ marginTop: '8em', marginLeft: '2em' }}>
<Grid>
<Grid.Row>
<Grid.Column width={3}>
  <div>
      <div class="ui link cards">
        <div class="card">
          <div class="content">
            <div class="header">{email}님 <br />어서오세요!</div>
            <div class="meta">
              <a>회원</a>
            </div>
            <div class="description">
              같이가요에 오신것을 환영합니다.
            </div>
          </div>
        </div>
    </div>
  </div>
  </Grid.Column>
  <Grid.Column width={9}>
  <Header as='h2'>국내동행찾기 최근 글</Header>
  <Table celled selectable>
      <Table.Body>
      {find.map((item) =>{
        return(

        <Table.Row>
          <Table.Cell><Link to={'/'+item.key}>{item.title}</Link></Table.Cell>
          <Table.Cell><Link to={'/'+item.key}>{item.writeDate}</Link></Table.Cell>
        </Table.Row>
      )
    })}
      </Table.Body>
    </Table>
    <Header as='h2'>여행후기 최근 글</Header>
    <Table celled selectable>
        <Table.Body>
          {aftertravel.map((item) =>{
            return(

            <Table.Row>
              <Table.Cell><Link to={'/'+item.key}>{item.title}</Link></Table.Cell>
              <Table.Cell><Link to={'/'+item.key}>{item.writeDate}</Link></Table.Cell>
            </Table.Row>
          )
        })}
        </Table.Body>
      </Table>
      <Header as='h2'>자유게시판 최근 글</Header>
      <Table celled selectable>
          <Table.Body>
            {freeboard.map((item) =>{
              return(
              <Table.Row>
              <Table.Cell><Link to={'/'+item.key}>{item.title}</Link></Table.Cell>
              <Table.Cell><Link to={'/'+item.key}>{item.writeDate}</Link></Table.Cell>
              </Table.Row>
            )
          })}
          </Table.Body>
        </Table>
  </Grid.Column>
  </Grid.Row>
  </Grid>
  </div>
  );
}
export default Homepage;
