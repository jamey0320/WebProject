import React, { Component ,useState ,useEffect} from 'react';
import {Container, Header, Image, Button} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

import fire from './config/fire';





function AfterTravelRead(props) {

   const [title,setTitle] = useState([]);
   const [contents,setContents] = useState([]);
   const [writeDate, setDate] = useState([]);
   const [email, setEmail] = useState([]);
   const [key, setKey] = useState([]);
   const [url, setUrl] = useState([]);
   const urlname1 = window.location.pathname;
   var urlname = urlname1.replace('/', '');
   console.log(urlname);





     useEffect(()=>{

       var userId = fire.auth().currentUser.uid;
       var query = fire.database().ref('여행후기');

       const loadingListener =  query.on("value" , snapshot =>
           {
             snapshot.forEach(function(childSnapshot)
             {
             if(urlname == childSnapshot.val().key) {
             setTitle(title => [...title, childSnapshot.val(),]);

           }
             }
           );


          });


     },[]);






    return(
      <div>
      {title.map((item) =>{
        return(
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>
            글 정보
          </Header>
          <div>
          <table class="ui celled table">
            <thead>
              <tr>
                <th>제목 : {item.title}</th>
                <th className="right aligned">작성자 : {item.email}</th>
              </tr>
              <tr>
                <th colspan="2" className="right aligned">작성일시 : {item.writeDate}</th>
              </tr>
              <tr>
                <th colspan="2">내용 : {item.contents}</th>
              </tr>
            </thead>
          </table>
          <img class="ui centered medium image" src={item.url} />
          <br/>
          <Link to = '/AfterTravel'>
            <Button style={{ marginTop: '1em' }} className="ui blue button">
              여행후기로 가기
            </Button>
          </Link>

          </div>
        </Container>
      )
      })}
      </div>

    );


}

export default AfterTravelRead;
