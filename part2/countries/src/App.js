import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Results = ({countries, clickHandler}) => {
  if (countries.length > 10)
    return (<div>Too many results, be more specific</div>)
  else if (countries.length > 1)
    return (
    <div>
      {countries.map(
        (c) => 
          <div key={c.name}>{c.name} 
            <button onClick={() => clickHandler(c.name)}>
              show
            </button>
          </div>)}
    </div>)
  else if (countries.length > 0) {
    const country = countries[0]

    return (
      <div>
        <h1>{country.name}</h1>
        <img src={country.flag} alt="flag" height="300"/>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>{country.languages.map((lang) => <li key={country.name+lang.name}>{lang.name}</li>)}</ul>
      </div>
    )
  } else return (<div>No results found</div>)
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then((response) => setCountries(response.data))
  }, [])

  const resCountries = countries.filter((c) => searchTerm.length === 0 || c.name.match(new RegExp(`${searchTerm}+`, 'i')))
  return (
    <div>
      Find countries: <input onChange={(event)=>setSearchTerm(event.target.value)}/>
      <Results countries={resCountries} clickHandler={setSearchTerm}/>
    </div>
  );
}

export default App;
