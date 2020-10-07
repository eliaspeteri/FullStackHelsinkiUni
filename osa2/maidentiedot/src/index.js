import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Country = (props) => {
  return(
    <div>
    <h1>
      {props.data.name}
    </h1>
    <p>
      capital {props.data.capital} <br />
      population {props.data.population}
    </p>
    <h2>
      languages
    </h2>
    <ul>
      <li>{props.data.languages[0].name}</li>
    </ul>
    <img src={props.data.flag} />
    </div>
  )
}


const Countries = (props) => {
  let item = props.countries.find(item => item.name == props.search)
  console.log(item);
  
  // if(props.countries.length > 10)
  // {
  //   return(
  //     <div>
  //       Too many matches, specify another filter
  //     </div>
  //   )
  // }  
  // else if (props.countries.length <= 10)
  // {
  //   return(
  //   <div>
  //     {
  //     props.countries.map(country =>
  //       <Country key={country.name} data={country} />
  //     )}
  //   </div>
  // )}
   if (item != undefined)
  {
    return (
    <div>
      {
        <Country key={item.name} data={item} />
      }
    </div>)
  }
  else {
    return(
      <div>
        No matches, specify another filter
      </div>
    )
  }

  }



const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('Promise fulfilled') 
      setCountries(response.data)
    })
  }

const handleSearchChange = (event) => {
  setNewSearch(event.target.value)
}

useEffect(hook,[])

  return(
  <div>
    find countries <input value={newSearch} onChange={handleSearchChange}/>
    <Countries countries={countries} search={newSearch} />
  </div>)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);