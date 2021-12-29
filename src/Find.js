import React, { Component,useState } from 'react';
import {Card, Icon, Container, Divider, Dropdown, Grid, Header, Image, Button,
  List,  Menu,  Segment, Pagination} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import FindWrite from "./FindWrite.js"
import {storage, fire} from './config/fire';

function Find(){
  const [userdata , setUserData] = useState([]);
  const [flag, setflag] = useState(false);
React.useEffect(() =>{


  var userId = fire.auth().currentUser;

  var query = fire.database().ref('동행게시판');

  const loadingListener = query.on("value" , async (snapshot) =>
      {
        setUserData([]);
        await snapshot.forEach(function(childSnapshot)
        {


          setUserData(data =>
            [...data,
              {
              title : childSnapshot.val().title,
              contents : childSnapshot.val().contents,
              writeDate : childSnapshot.val().writeDate,
              email :childSnapshot.val().email,
              userId : childSnapshot.val().userId,
              markers :childSnapshot.val().markers,
              tags : childSnapshot.val().tags,
              key : childSnapshot.val().key
              }
            ]);


        }
      );

       });

    return () => {
          query.off('value', loadingListener);
        };

  },[]);


return (

<div>
  <Container text style={{ marginTop: '7em' }}>
    <Header as='h1'>국내동행찾기
    <Link to='/FindWrite'>
      <Button style={{ marginLeft: '31em' }} className="ui blue button">
        글쓰기
      </Button>
      </Link>
    </Header>
    <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th className="right aligned">날짜</th>
        </tr>
      </thead>
      <tbody>
      {userdata.map((item) =>{
        return(

        <tr>
        <td fix width="55%"><Link to={'/'+item.key}>{item.title}</Link></td>
        <td width="20%"><Link to={'/'+item.key}>{item.email}</Link></td>
        <td className="right aligned"><Link to={'/'+item.key}>{item.writeDate}</Link></td>
        </tr>
      )
    })}
    </tbody>
    </table>
  </div>

</Container>
</div>

)
}
export default Find;
