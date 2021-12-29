import React, { Component, useState } from 'react';
import {Container, Divider, Dropdown, Grid, Header, Image, Button,
  List,  Menu,  Segment , Input} from 'semantic-ui-react'
import fire from './config/fire';
import Find from "./Find.js";
import GoogleMaps from './GoogleMap.js';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import Geocode from "react-geocode";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

import { Link,BrowserRouter as Router,Switch,Route,Redirect, useHistory  } from "react-router-dom";
Geocode.setApiKey('AIzaSyCJW0JE2A5pXGeZcSRxELosyWoFmJPBCWA');

const mapContainerStyle = {
  height: "75vh",
  width: "700px",
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

function FindWrite(props){
const libraries = ["places"];
  const history = useHistory();
  var [titletext, setTitletext ] = useState("");
  var [contentstext , setContentstext] = useState("");
  const language =["ko"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCJW0JE2A5pXGeZcSRxELosyWoFmJPBCWA',
    libraries,

  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [location, setLocation] = React.useState([]);
  const [tags , setTags] = React.useState([]);




function getGeo(e){


  Geocode.fromLatLng( e.latLng.lat(), e.latLng.lng()).then( response =>
    {
      setMarkers((current) => [
        ...current,
        {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          time: new Date(),
          location : response.results[0].formatted_address,

        },
      ]);

    });

};

const onMapClick = React.useCallback((e) => {

  getGeo(e);


}, []);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;


  }, []);


  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";



  const titleHandler = (e) =>
  {
     e.preventDefault();
    setTitletext(e.target.value);

  }
  const contentsHandler = (e) =>
  {
     e.preventDefault();
      setContentstext(e.target.value);
  }

  const saveData = (e)  =>
  {
   e.preventDefault();

    if(titletext === '' || contentstext ==='')
    {

    }
    else {

      var title = titletext;
      var contents = contentstext;
      var today = new Date();
      var year = today.getFullYear(); // 년도
      var month = today.getMonth() + 1;  // 월
      var date = today.getDate();  // 날짜
      var writeDate = year + "-" + month + "-" + date
      var userId = fire.auth().currentUser;


      fire.database().ref('동행게시판').push().set({
        userId : userId.uid,
        email : userId.email,
        title : title,
        contents : contents,
        writeDate : writeDate,
        tags : props.location.query.tags,
        markers : props.location.query.markers,
      });

      setTitletext('');
      setContentstext('');
      history.push('/Find')

    }

    var query = fire.database().ref('동행게시판');

    const upListener = query.on("value" , snapshot =>
        {
          snapshot.forEach(function(childSnapshot)
          {
            fire.database().ref('동행게시판/' + childSnapshot.key).update({
              key : childSnapshot.key
            });
          }
        );


       });
       return () => {
             query.off('value', upListener);
           };

  }


    return (
      <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
      <div>

      <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>국내동행찾기 글쓰기 (구글맵을 먼저 첨부)</Header>
      <div class ='ui form'>
      <div class="field">
      <h3 style={{ marginTop: '1em' }}>제목</h3>
      <Input fluid id = "titlearea" onChange ={titleHandler}></Input>
      </div>
      <div class="field">
      <h3 style={{ marginTop: '1em' }}>내용
      <Link to ={{pathname : `GoogleMap`, query : {titletext,contentstext}}}>
      <Button style={{ marginLeft: '39em' }}>구글맵첨부</Button></Link></h3>

      <textarea id ="contentsarea" rows='20' onChange = {contentsHandler}></textarea>

      </div>

      </div>
      <h3>여행지 목록 </h3>

      { props.location.query ? (


                  <div>
                  <ul>
                  {props.location.query.tags.map((tag, index) =>(
                    <li key = {index} style={{listStyleType : "decimal"}}>

                    <span>{tag}</span>
                    <i id ="column">      </i>
                    </li>
                  ))}
                    </ul>
                    <Button.Group>
                    <Button onClick={saveData} style={{ marginTop: '1em' }} positive>Save</Button>

                    <Button.Or style={{ marginTop: '1em' }} />

                    <Link to='/Find'>
                    <Button style={{ marginTop: '1em' }}>Cancel</Button>
                    </Link>
                    </Button.Group>
                  </div>
        ) : null}



      </Container>

      </div>
      </Grid.Column>

<Grid.Column width={4} >
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
      { props.location.query ? (

<div>
       <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >

      {
        props.location.query.markers.map((marker,index)=>
        (
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
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}

      </GoogleMap>


  </div>

    ) : null}


    </Grid.Column>
    </Grid.Row>

      </Grid>

    );



}
export default FindWrite;
