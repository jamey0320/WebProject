import React, { Component ,useState, useEffect } from 'react';
import {Comment, Container, Header, Image, Button, Form} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

import fire from './config/fire';

function BoardRead() {

   const [title,setTitle] = useState([]);
   const [contents,setContents] = useState([]);
   const [writeDate, setDate] = useState([]);
   const [email, setEmail] = useState([]);
   const [key, setKey] = useState([]);
   const [comments,setComments] = useState([]);
   const [writeDatec, setDatec] = useState([]);
   const [emailc, setEmailc] = useState([]);
   const urlname1 = window.location.pathname;
   var urlname = urlname1.replace('/', '');
   console.log(urlname);
   var [commentstext , setCommentstext] = useState("");

   const commentsHandler = (e) =>
   {
      e.preventDefault();
       setCommentstext(e.target.value);
   }

   const saveData = (e)  =>
   {
    e.preventDefault();

     if(commentstext ==='')
     {

     }
     else {
       var comments = commentstext;
       var today = new Date();
       var year = today.getFullYear(); // 년도
       var month = today.getMonth() + 1;  // 월
       var date = today.getDate();  // 날짜
       var writeDate = year + "-" + month + "-" + date
       var userId = fire.auth().currentUser;
       fire.database().ref('자유게시판/'+urlname).push().set({
         emailc : userId.email,
         comments : comments,
         writeDatec : writeDate
       });
       setCommentstext('');

     }
   }

   React.useEffect(() =>{


    var userId = fire.auth().currentUser.uid;

    var query = fire.database().ref('자유게시판');

    const loadingListener =  query.once("value" , snapshot =>
        {

        setTitle([]);
        setContents([]);
        setDate([]);
        setEmail([]);
        setKey([]);  
          snapshot.forEach(function(childSnapshot)
          {

          if(urlname == childSnapshot.val().key) {


          setTitle(title => [...title, childSnapshot.val(),]);
          setContents(contents => [...contents, childSnapshot.val(),]);
          setDate(writeDate => [...writeDate,childSnapshot.val(),]);
          setEmail(email => [...email,childSnapshot.val(),]);
          setKey(key => [...key,childSnapshot.val(),]);
        }
          }
        );
       });
     },[]);

     React.useEffect(() =>{


      var userId = fire.auth().currentUser.uid;

      var query = fire.database().ref('자유게시판/'+urlname);

      const loadingListenerc =  query.once("value" , snapshot =>
          {
            setComments([]);
            setDatec([]);
            setEmailc([]);
            snapshot.forEach(function(childSnapshot)
            {
            setComments(comments => [...comments, childSnapshot.val(),]);
            setDatec(writeDatec => [...writeDatec,childSnapshot.val(),]);
            setEmailc(emailc => [...emailc,childSnapshot.val(),]);
            }
          );
         });
       },[]);



    return(

      <div>
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>
            글 정보
          </Header>
          <div>
          {title.map((item) =>{

            return(
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
        )
        })}
  <Comment.Group>
    <Header as='h3' dividing>
      댓글
    </Header>
    {comments.map((item) =>{
      return(
    <Comment>
      <Comment.Content>
        <Comment.Author as='a'>{item.emailc}</Comment.Author>
        <Comment.Metadata>
          <div>{item.writeDatec}</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>{item.comments}</p>
        </Comment.Text>
      </Comment.Content>
    </Comment>
  )
  })}
    <Form reply>
      <Form.TextArea id ="commentsarea" onChange = {commentsHandler}/>
      <Button onClick={saveData} content='댓글 달기' labelPosition='left' icon='edit' primary />
    </Form>
    </Comment.Group>


          <Link to = '/FreeBoard'>
            <Button style={{ marginTop: '1em' }} className="ui blue button">
              자유게시판으로 가기
            </Button>
          </Link>

          </div>
        </Container>
      </div>

    );


}

export default BoardRead;
