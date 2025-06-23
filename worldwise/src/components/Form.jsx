// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [mapLat, mapLng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const { createCity, isLoading } = useCities();
  const navigation = useNavigate();

  useEffect(
    function () {
      if (!mapLat || !mapLng) {
        return;
      }
      async function fetchCityData() {
        setIsLoadingGeocoding(true);
        try {
          setGeocodingError("");
          const response = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await response.json();
          if (!data.countryCode) {
            throw new Error("City not found for the given coordinates");
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode || ""));
        } catch (error) {
          console.error(error);
          setGeocodingError(error.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [mapLat, mapLng]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    if (!cityName || !country) {
      return;
    }

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };
    await createCity(newCity);
    navigation("/app/cities");
  }

  if (!mapLat || !mapLng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
