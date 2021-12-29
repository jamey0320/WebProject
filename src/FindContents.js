/* eslint-disable no-undef */
import React, { Component ,useState ,useEffect} from 'react';
import {Container, Divider, Dropdown, Grid, Header, Image, Button,
  List,  Menu,  Segment , Input} from 'semantic-ui-react'
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import Geocode from "react-geocode";
import fire from './config/fire';
import mapStyles from "./mapStyles";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

Geocode.setApiKey('AIzaSyCJW0JE2A5pXGeZcSRxELosyWoFmJPBCWA');





function FindContents() {
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCJW0JE2A5pXGeZcSRxELosyWoFmJPBCWA',
    libraries,
  });
   const [title,setTitle] = useState([]);
  const [selected, setSelected] = React.useState(null);
   const urlname1 = window.location.pathname;
   var urlname = urlname1.replace('/', '');
   console.log(urlname);


   const mapRef = React.useRef();
      const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;


      }, []);
   const mapContainerStyle = {
     height: "60vh",
     width: "600px",
     marginLeft : "50px",
     marginTop : "25px",
   };
   const options = {
     styles: mapStyles,
     disableDefaultUI: true,
     zoomControl: true,
   };
   const center = {
     lat: 36.621159,
     lng: 127.074172,
   };







     useEffect(()=>{

       var userId = fire.auth().currentUser.uid;
       var query = fire.database().ref('동행게시판');

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
          <Grid>
          <Grid.Row>
          <Grid.Column width={8}>
        <Container text style={{ marginTop: '7em'}}>
          <Header as='h1'>
            글 정보
          </Header>
          <div>

          <table class="ui celled table">
            <thead>
              <tr>
                <th>제목 : {item.title}</th>
                {
                  console.log(item.markers)
                }
                <th className="right aligned">작성자 : {item.email}</th>
              </tr>
              <tr>
                <th colspan="2" className="right aligned">작성일시 : {item.writeDate}</th>
              </tr>
              <tr>
                <th colspan="2">내용 : {item.contents}</th>
              </tr>
              <tr>
                <th colspan="2">여행지 목록
                <br/>
                <ul>
                {item.tags.map((tag, index) =>(
                  <li key = {index} style={{listStyleType : "decimal"}}>

                  <span>{tag}</span>
                  <i id ="column"></i>
                  </li>
                ))}
                  </ul>
                </th>
              </tr>
            </thead>
          </table>
          <br/>
          <Link to = '/Find'>
            <Button style={{ marginTop: '1em' }} className="ui blue button">
              동행찾기로 가기
            </Button>
          </Link>

          </div>
        </Container>
        </Grid.Column>
        <Grid.Column width ={4} style={{marginTop :'7em'}} >
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={7}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {item.markers.map((marker ,index) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              label = {`${index+1}`}
              onClick={() => {
                setSelected(marker);
              }}


            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>
                  {selected.location}
                </h2>

              </div>
            </InfoWindow>
          ) : null}

          <div>
          </div>
        </GoogleMap>
        </Grid.Column>

        </Grid.Row>
        </Grid>

      )
      })}
      </div>







    );


}

export default FindContents;
