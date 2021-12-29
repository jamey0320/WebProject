import React, { Component, useState } from 'react';
import ReactDom from 'react-dom';
import fire from './config/fire';
import Homepage from "./Homepage.js";
import MenuClass from "./MenuClass.js";
import Find from "./Find.js";
import FindWrite from "./FindWrite.js";
import AfterTravel from "./AfterTravel.js";
import ATWrite from "./AfterTravelWrite.js";
import ATRead from "./AfterTravelRead.js";
import FreeBoard from "./FreeBoard.js";
import FaqLayout from "./FaqLayout.js";
import FaqOne from "./FaqOne.js";
import FaqTwo from "./FaqTwo.js";
import SendMail from "./SendMail.js";
import BoardWrite from "./BoardWrite.js";
import BoardRead from "./BoardRead.js";
import SignUp from './SignUp.js';
import App from './App.js';
import GoogleMaps from './GoogleMap.js';
import FindContents from './FindContents.js';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";


import {Link, BrowserRouter as Router, Route, Redirect} from "react-router-dom";

function Home(){
  const [freeboard , setFreeBoard] = useState([]);
  const [aftertravel, setAfterTravel] = useState([]);
  const [find, setFind] = useState([]);

  const [userUid, setUid] = useState([]);
const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCJW0JE2A5pXGeZcSRxELosyWoFmJPBCWA',
    libraries,
  });
  const ff = fire.auth().onAuthStateChanged(function(user){
    if(user)
    {
        setUid(user.uid);
    }
    else {

    }
  });


  React.useEffect(() =>{



    console.log(userUid); // 이게 userUid야 이거 가지고 사용해

    const loadingFind = fire.database().ref('동행게시판').on("value" , async (snapshot) =>
        {
          setFind([]);
          await snapshot.forEach(function(childSnapshot)
          {
            setFind(data =>
              [...data,
                {
                title : childSnapshot.val().title,
                key : childSnapshot.val().key
                }
              ]);
          }
        );

         });

         const loadingFreeBoard = fire.database().ref('자유게시판').on("value" , snapshot =>
             {
               snapshot.forEach(function(childSnapshot)
               {
                 setFreeBoard(data =>
                   [...data,
                     {
                     title : childSnapshot.val().title,
                     key : childSnapshot.val().key,
                     }
                   ]);
               }
             );
              }
            );

            const loadingAfterTravel = fire.database().ref('여행후기').on("value" , snapshot =>
                {
                  snapshot.forEach(function(childSnapshot)
                  {
                    setAfterTravel(data =>
                      [...data,
                        {
                        title : childSnapshot.val().title,
                        key : childSnapshot.val().key,
                        }
                      ]);
                  }
                );
                 }
               );


      return () => {
            fire.database().ref('여행후기').off('value', loadingAfterTravel);
            fire.database().ref('자유게시판').off('value', loadingFreeBoard);
            fire.database().ref('동행게시판').off('value', loadingFind);
          };



    },[]);




    return(
      <Router>
        <div classname= "topMenu">
          <MenuClass />
          <Route exact path ="/Home" component ={Homepage} />
          <Redirect to ="/Home" />
          <Route path ="/Find" component ={Find} />
          <Route path ="/FindWrite" component = {FindWrite} />
          <Route path ="/GoogleMap" component = {GoogleMaps} />
          <Route path ="/AfterTravel" component = {AfterTravel} />
          <Route path ="/FreeBoard" component = {FreeBoard} />
          <Route path ="/BoardWrite" component ={BoardWrite} />
          <Route path ="/FaqLayout" component ={FaqLayout} />
          <Route path ="/FaqOne" component ={FaqOne} />
          <Route path ="/FaqTwo" component ={FaqTwo} />
          <Route path ="/SendMail" component ={SendMail} />
          <Route path ="/ATWrite" component = {ATWrite} />


              {aftertravel.map((item) =>{
                return(
              <Route path ={'/'+item.key} component = {ATRead} />
            )
          })}
            {freeboard.map((item) =>{
              return(
            <Route path ={'/'+item.key} component = {BoardRead} />
          )
        })}
          {find.map((item) =>{
          return(
        <Route path ={'/'+item.key} component = {FindContents} />
      )
      })}
        </div>
      </Router>
  );
}

export default Home;
