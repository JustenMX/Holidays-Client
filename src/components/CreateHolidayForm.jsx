import debug from "debug";
import { useEffect, useState } from "react";
import urlcat from "urlcat";

const log = debug("holidays:client:components:CreateHolidayForm");
const SERVER = import.meta.env.VITE_SERVER;

const fetchCountries = async () => {
  const request = fetch;
};

function CreateHolidayForm() {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const url = urlcat(SERVER, "/countries");
      const request = await fetch(url);
      const data = await request.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const handleCreate = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    console.log(elements);

    const holiday = {
      title: elements.title.value,
      likes: elements.likes.valueAsNumber,
      active: elements.active.checked,
      celebrated: elements.countries.value,
    };
    log("holiday %o", holiday);

    const url = urlcat(SERVER, "/holidays");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(holiday),
    })
      .then((response) => response.json())
      .then((data) => {
        log("result %o", data);
        if (data.msg === "Too many") {
          setStatus("Too many");
        } else {
          setStatus("OK");
        }
      });
  };

  return (
    <form onSubmit={handleCreate}>
      <fieldset>
        <legend>Holiday</legend>
        <label>
          Title: <input name="title" defaultValue="National Day" />
        </label>
        <br />
        <label>
          Likes: <input name="likes" type="number" defaultValue={10} />
        </label>
        <br />
        <label>
          Active: <input name="active" type="checkbox" />
        </label>
        <br />
        <label>
          Countries:
          <select name="countries">
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.title}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <button>Create</button>
      <span>{status} </span>
    </form>
  );
}

export default CreateHolidayForm;
