import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Image, Container, Table } from "react-bootstrap";

import countries from "./countries.json";
import Graph from "./Graph";

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("United States");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://corona.lmao.ninja/v2/countries/${country}?yesterday&strict&query`
        );
        let currentData = {
          cases: res.data.cases,
          deaths: res.data.deaths,
          recovered: res.data.recovered,
          pop: res.data.population,
          flag: res.data.countryInfo.flag,
        };
        setData(currentData);
      } catch (err) {
        console.log(err);
        alert("No data available.");
      }
    };

    getData();
  }, []);

  const getDataByCountry = async (val) => {
    try {
      const response = await axios.get(
        `https://corona.lmao.ninja/v2/countries/${val}?yesterday&strict&query`
      );
      let currentData = {
        cases: response.data.cases,
        deaths: response.data.deaths,
        recovered: response.data.recovered,
        pop: response.data.population,
        flag: response.data.countryInfo.flag,
      };
      setData(currentData);
    } catch (err) {
      console.log(err);
      alert("No data available.");
    }
  };
  return (
    <>
      <Container>
        <Row className="main-heading">
          <Col>
            <h1>HabteJ Covid-19</h1>
            <h2>Tracking Dashboard</h2>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-content-center">
          <Image
            className="mb-0"
            src={"./assets/images/c19.png"}
            alt="covid19"
            height="200px"
            width="200px"
          />
          {data.flag && (
            <Image
              id="flag"
              className="mt-5 mx-2"
              src={data.flag}
              alt="flag"
              height="100px"
              width="200px"
            />
          )}
        </Row>

        <Row className="d-flex align-items-center justify-content-center">
          <Col md={10}>
            <Table variant="dark" striped>
              <thead>
                <tr>
                  <th>Population</th>
                  <th>Total Cases</th>
                  <th>Total Deaths</th>
                  <th>Total Recovered</th>
                </tr>
              </thead>
              <tbody>
                {data.cases && (
                  <tr>
                    <td>{data ? data.pop.toLocaleString() : "-"}</td>
                    <td>{data ? data.cases.toLocaleString() : "-"}</td>
                    <td>{data ? data.deaths.toLocaleString() : "-"}</td>
                    <td>{data ? data.recovered.toLocaleString() : "-"}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <select
              className="d-block w-75 mx-auto px-1 py-2"
              onChange={(e) => {
                getDataByCountry(e.target.value);
                setCountry(e.target.value);
              }}
            >
              {countries.map((c, index) => (
                <option key={index} value={c.code} name={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row className="mt-4">
          <Graph caseData={data} />
        </Row>
      </Container>
    </>
  );
}

export default App;
