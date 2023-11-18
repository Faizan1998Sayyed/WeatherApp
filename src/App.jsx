import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/Card/Card";
import "./App.css";
import CardTitle from "./components/CardTitle/CardTitle";
import useStore from "./hooks/useStore";

const App = () => {
  const { data: datas } = useStore();

  console.log(datas);

  return (
    <>
      <Navbar />
      <main className="body-wrapper">
        <Header />
        <div className="weather-title-card-wrapper">
          <CardTitle />
          <div className="weather-card-wrapper">
            {/* <Card weatherType="snowy" /> */}
            {datas.map((data, index) => (
              <Card
                key={index}
                weatherType="snowy"
                date={data.date}
                humidity={data.humidity}
                highTemperature={data.highTemperature}
                lowTemperature={data.lowTemperature}
                sunriseTime={data.sunriseTime}
                sunsetTime={data.sunsetTime}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
