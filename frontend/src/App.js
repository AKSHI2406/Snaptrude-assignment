import logo from "./logo.svg";
import "./App.css";
// import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./components/Map/Map";
import { APIProvider, Map as Gmaps } from "@vis.gl/react-google-maps";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <>
    <MainPage />
    </>
  );
}

export default App;
