import { useState, useEffect, useMemo } from "react";
import { startCase } from "lodash";
import { Button, Tabs, Tab } from "react-bootstrap";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./App.css";

import { ClueStarts } from "../common/ClueStarts";
import { Lights } from "../common/Lights";
import { Letters } from "../common/Letter";
import { Transits } from "../common/Transits";

import { EditClues } from "./EditClues";
import { EditLights } from "./EditLights";
import { StateSetter } from "./Helpers";
import { Grid, displayGrid } from "./Grid";

type HomeProps = { name: string };

const Home = ({ name }: HomeProps) => (
  <header className="App-header">
    <h1>{startCase(name)}</h1>
    <Button variant="secondary" href={`https://github.com/dbaynard/${name}`}>
      <FontAwesomeIcon icon={faGithub} />
    </Button>
  </header>
);

const useRouterLocation = (): [string, StateSetter<string>] => {
  const history = useHistory();
  const [key, setKey] = useState<string>(history.location.pathname);

  useEffect(() => {
    if (history.location.pathname !== key) history.push(key);
  }, [history, key]);

  useEffect(() => {
    history.listen((location) => setKey(location.pathname));
  }, [history]);

  return [key, setKey];
};

const Tabbed = ({ name }: HomeProps) => {
  const [key, setKey] = useRouterLocation();

  const size = 15n;
  const [lights, setLights] = useState<Lights | null>(null);
  const [clueStarts, setClueStarts] = useState<ClueStarts | null>(null);
  const [letters, setLetters] = useState<Letters | null>(null);

  const grid = useMemo<Grid>(() => {
    return displayGrid(size, lights, clueStarts);
  }, [size, lights, clueStarts]);

  const [transits, setTransits] = useState<Transits | null>(null);

  const commonProps = { size, lights, setLights, grid, letters };
  const lightsProps = { setClueStarts };
  const cluesProps = { setLetters, clueStarts, transits, setTransits };

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k ?? "/")}>
      <Tab eventKey="/" title="Home">
        <Home {...{ name }} />
      </Tab>
      <Tab eventKey="/lights" title="Edit Lights">
        <EditLights {...commonProps} {...lightsProps} />
      </Tab>
      <Tab eventKey="/clues" title="Edit Clues">
        <EditClues {...commonProps} {...cluesProps} />
      </Tab>
    </Tabs>
  );
};

const App = () => {
  const name = "crosswrd";
  return (
    <div className="App">
      <Router>
        <Tabbed {...{ name }} />
      </Router>
    </div>
  );
};

export default App;
