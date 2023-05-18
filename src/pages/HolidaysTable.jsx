import debug from "debug";
import { useEffect, useState } from "react";
import urlcat from "urlcat";
import { SERVER } from "../utils/constants";

const log = debug("holidays:client:components:HolidaysTable");

function HolidaysTable() {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const url = urlcat(SERVER, "/holidays");
      const request = await fetch(url);
      const data = await request.json();
      log("data %o", data);
      setHolidays(data);
    };
    fetchHolidays();
  }, []);

  return (
    <table>
      <caption>Holidays</caption>
      <thead>
        <tr>
          <th>Title</th>
          <th>Likes</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {holidays.map((holiday) => (
          <tr key={holiday._id}>
            <td>{holiday.title}</td>
            <td>{holiday.likes}</td>
            <td>
              <button>+1</button>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HolidaysTable;
