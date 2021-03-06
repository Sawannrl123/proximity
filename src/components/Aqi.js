import React, { useState, useEffect, useCallback } from "react";
import { AqiChart } from "../components";
import { buildAqiColor, timeAgo } from "../utils";

const Aqi = () => {
  const [airAqiData, setAirAqiData] = useState(null);
  const [webSocket, setWs] = useState(null);

  const connect = useCallback(() => {
    let timeout = 250;
    const ws = new WebSocket("wss://city-ws.herokuapp.com/‌");
    let connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket app component");
      setWs(ws);
      timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    ws.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data && Array.isArray(data)) {
        const newData = data.reduce((initial, current) => {
          current.timestamp = new Date();
          initial[current.city] = current;
          return initial;
        }, {});
        setAirAqiData((a) => (a ? { ...a, ...newData } : newData));
      }
    };

    // websocket onclose event listener
    ws.onclose = (e) => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (timeout + timeout) / 1000
        )} second.`,
        e.reason
      );

      timeout = timeout + timeout; //increment retry interval
      connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      ws.close();
    };
  }, []); // eslint-disable-line

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  const check = useCallback(() => {
    if (!webSocket || webSocket.readyState === WebSocket.CLOSED) connect(); //check if websocket instance is closed, if so call `connect` function.
  }, [connect, webSocket]);

  useEffect(() => {
    connect();
  }, [connect]);

  const renderChildren = () => {
    if (airAqiData === null) return <p className="noContent">Loading...</p>;
    const cities = Object.keys(airAqiData);
    if (cities.length === 0) return <p className="noContent">No Data Found.</p>;
    return (
      <div className="tableWrapper">
        <table cellPadding="0" cellSpacing="0" border="0" className="apiTable">
          <thead>
            <tr>
              <td>City</td>
              <td>Current AQI</td>
              <td>Last Updated</td>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => {
              const cityData = airAqiData[city];
              return (
                <tr
                  key={city}
                  style={{ backgroundColor: buildAqiColor(cityData.aqi) }}
                >
                  <td>{cityData.city}</td>
                  <td>{cityData.aqi.toFixed(2)}</td>
                  <td>{timeAgo(cityData.timestamp)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="chartContainer">
      {renderChildren()}
      {airAqiData && <AqiChart aqiData={airAqiData} />}
    </div>
  );
};

export default Aqi;
