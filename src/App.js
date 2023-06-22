import React, { useEffect, useState } from "react";
import Select from "react-select";
import CountryRegion from "./CountryRegion";
import "./index.css";

function App() {
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [lga, setLGA] = useState("");
  const [lgas, setLGAs] = useState([]);
  const ZERO = 0;
  let countryRegion = null;

  const getCountryRegionInstance = () => {
    if (!countryRegion) {
      countryRegion = new CountryRegion();
    }
    return countryRegion;
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countries = await getCountryRegionInstance().getCountries();
        setCountries(
          countries.map((country) => ({
            value: country.id,
            label: country.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const states = await getCountryRegionInstance().getStates(country);
        setStates(
          states.map((userState) => ({
            value: userState?.id,
            label: userState?.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (country) {
      getStates();
    }
  }, [country]);

  useEffect(() => {
    const getLGAs = async () => {
      try {
        const lgas = await getCountryRegionInstance().getLGAs(country, state);
        setLGAs(
          lgas?.map((lga) => ({
            value: lga?.id,
            label: lga?.name,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    if (state) {
      getLGAs();
    }
  }, [country, state]);

  const handleCountryChange = (event) => {
    const { value } = event;
    setCountry(value);
  };

  const handleStateChange = (event) => {
    const { value } = event;
    setState(value);
  };

  const handleLGAChange = (event) => {
    const { value } = event;
    setLGA(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "border: 1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "5.91319px",
      fontSize: "1.5rem",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
  };
  return (
    <main>
      <form className="submain-one-form" onSubmit={handleSubmit}>
        <header className="submain-one-form-header">
          <h1>Pick-A-Country</h1>
        </header>
        <Select
          type="text"
          placeholder="Select a country"
          id="name"
          onChange={handleCountryChange}
          options={countries}
          styles={customStyles}
        />
        {states?.length !== ZERO && (
          <Select
            placeholder="Select a state"
            id="name"
            onChange={handleStateChange}
            options={states}
            styles={customStyles}
          />
        )}

        {lgas && lgas?.length !== ZERO && (
          <Select
            placeholder="Select a City"
            id="name"
            onChange={handleLGAChange}
            options={lgas}
            styles={customStyles}
            />
        )}
        {!true && lga}
      </form>
    </main>
  );
}

export default App;
