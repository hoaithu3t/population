import React, { useState, useEffect } from "react";
import { getCities } from "./api/cities";
import PopulationChart from "./components/populationChart";
import "./App.css";

const App = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    getCities().then((res) => setCities(res.result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [indexChecked, setIndexChecked] = useState(0);

  const handleChange = (i) => {
    indexChecked === i ? setIndexChecked(null) : setIndexChecked(i);
  };

  return (
    <div id="app">
      <h1 className="title">人口構成関係データを図表</h1>
      <div className="cities">
        <h3>都道府県</h3>
        <form className="form-checkbox">
          {cities?.map((el, i) => (
            <div className="item-checkbox" key={`item-checkbox_${i}`}>
              <label>
                <input
                  name={`isGoing_${i}`}
                  type="checkbox"
                  checked={indexChecked === i}
                  onChange={() => handleChange(i)}
                />
                {el.prefName}
              </label>
            </div>
          ))}
        </form>
      </div>

      {indexChecked !== null && cities !== null && (
        <PopulationChart
          nameProvince={cities[indexChecked]?.prefName}
          index={indexChecked}
        />
      )}
    </div>
  );
};

export default App;
