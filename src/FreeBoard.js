import React, { Component ,useState } from 'react';
import {Container, Header, Image, Button} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

import fire from './config/fire';
function FreeBoard(){

   const [title,setTitle] = useState([]);
   const [contents,setContents] = useState([]);
   const [writeDate, setDate] = useState([]);
   const [email, setEmail] = useState([]);
   const [key, setKey] = useState([]);




   React.useEffect(() =>{
    var userId = fire.auth().currentUser.uid;

    var query = fire.database().ref('자유게시판');

    const loadingListener = query.on("value" , snapshot =>
        {
          setTitle([]);
    
          snapshot.forEach(function(childSnapshot)
          {
          console.log(childSnapshot);
          setTitle(title => [...title, childSnapshot.val(),]);
          setContents(contents => [...contents, childSnapshot.val(),]);
          setDate(writeDate => [...writeDate,childSnapshot.val(),]);
          setEmail(email => [...email,childSnapshot.val(),]);
          setKey(key => [...key,childSnapshot.val(),]);
          }
        );


       });
       return () => {
             query.off('value', loadingListener);
           };
     },[]);




    return(
      <div>
        <Container text style={{ marginTop: '7em' }}>
          <Header as='h1'>
            자유게시판
            <Link to='/BoardWrite'>
              <Button style={{ marginLeft: '33em' }} className="ui blue button">
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
            {title.map((item) =>{
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

    );


}

export default FreeBoard;
