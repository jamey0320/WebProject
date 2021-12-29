import React from "react";
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
import {Card, Icon, Container, Divider, Dropdown, Grid, Header, Image, Button,
  List,  Menu,  Segment, Pagination, Table} from 'semantic-ui-react';
import {Link,BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

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
export default function App(){
  const libraries = ["places"];
  const { isLoaded, loadError  } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCJW0JE2A5pXGeZcSRxELosyWoFmJPBCWA',
    libraries,

  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [location, setLocation] = React.useState([]);
  const [tags , setTags] = React.useState([]);


const removeTags = indexToRemove =>{
  setTags(tags.filter((_,index) => index !== indexToRemove));
  setMarkers(markers.filter((_,index)=> index !== indexToRemove));
}

function addTags(event, response)
{

  if(event.domEvent.type === 'click')
  {

    setTags((current) =>[...current,response.results[0].formatted_address]);
  }
};


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
      addTags(e, response);



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



  return (




    <Grid>
    <Grid.Row>
      <Grid.Column width={9}>
      <h1>
        Bears{" "}
        <span role="img" aria-label="tent">
          ⛺️
        </span>
      </h1>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={7}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker ,index) => (
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

        <div>
        </div>
      </GoogleMap>
    </Grid.Column>
    <Grid.Column width={4}>
      <div className="arrayLo">

      <div>
      <h1>여행지 목록  <Link to ={{pathname : `FindWrite`, query:{markers , tags }}}><Button>저장</Button></Link><Link to ='FindWrite'><Button>뒤로가기</Button></Link> </h1>
      </div>

        <ul>
        {tags.map((tag, index) =>(
          <li key = {index} style={{listStyleType : "decimal"}}>

          <span>{tag}</span>
          <i id ="column" onClick={() => removeTags(index)}>       close</i>
          </li>
        ))}

          </ul>
      </div>
      </Grid.Column>
      </Grid.Row>
      </Grid>




  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.png" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 10,
    },
  });



  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
