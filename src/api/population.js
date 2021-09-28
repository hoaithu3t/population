import axios from "axios";

const headers = {
  "X-API-KEY": "TABE2AtgLv2Xt3vh17ZvKDUOiQgV3Y1c9d7biOsg",
};

export const getPopulations = (prefCode) =>
  axios
    .get(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers,
      }
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
