import React, { useEffect, useState } from "react";

export default function States(){
    const [countries,setCountries] = useState([]);
    const [states,setStates] = useState([]);
    const [cities,setCities] = useState([]);
    const [selectedState,setSelectedState] = useState("")
    const [selectedCountry,setSelectedCountry] = useState("")
    const [selectedCity,setSelectedCity] = useState("")
    const [message,setMessage] = useState("")
    useEffect(()=>{
       const fetchCountries = async ()=>{
        try {
            const res = await fetch("https://crio-location-selector.onrender.com/countries");
            const data = await res.json();
            console.log(data)
            setCountries(data)
        } catch (error) {
            console.error("failed to fetch countries:",error)
        }
       }
       fetchCountries();
    },[])

    useEffect(()=>{
        const fetchStates = async ()=>{
            try {
                const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
                const data = await res.json();
                setStates(data)
            } catch (error) {
                console.error("failed to fetch countries:",error)
            }
           }
           fetchStates();
    },[selectedCountry])

    useEffect(()=>{
        const fetchCities = async ()=>{
            try {
                const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
                const data = await res.json();
                setCities(data)
            } catch (error) {
                console.error("failed to fetch countries:",error)
            }
           }
           fetchCities();
    },[selectedState,selectedCountry])

    const handleCityChange = (e) => {
        const city = e.target.value; // Get the selected city
        setSelectedCity(city); // Update the city state
        if (city && selectedCountry && selectedState) {
          setMessage(`You selected ${city}, ${selectedState}, ${selectedCountry}`);
        }
      };
      
    return (
        <div>
            <h1>Select Location</h1>
            <select
            value={selectedCountry}
            onChange={(e)=>{setSelectedCountry(e.target.value)}}
            >
                <option value="" disabled>Select a Country</option>
                {
                    countries.map((country)=>{
                       return(<option value={country}>{country}</option>) 
                    })
                }
            </select>
            <select
            value={selectedState}
            onChange={(e)=>{setSelectedState(e.target.value)}}
            disabled={!selectedCountry}
            >
                <option value="" disabled>Select State</option>
                {
                    states.map((state)=>{
                       return(<option value={state}>{state}</option>) 
                    })
                }
            </select>
            <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
            >
                <option value="" disabled>Select City</option>
                {
                    cities.map((state)=>{
                       return(<option value={state}>{state}</option>) 
                    })
                }
            </select>
            {message && <p>{message}</p>}
        </div>
    )
}