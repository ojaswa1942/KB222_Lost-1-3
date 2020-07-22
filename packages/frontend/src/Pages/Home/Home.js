import React from "react";
import "./Home.css";
import LogoHead from "../../Components/LogoHead/LogoHead";
import HomeNav from "../../Components/HomeNav/HomeNav";
import {ReactComponent as Feature1} from '../../Assets/feature1.svg'

const Home = () => {
  return (
    <div className="homePage">
      <div className="home">
        <div className="homeHeader">
          <LogoHead />
          <HomeNav />
        </div>
        <div className="homeBody">
          <h1>
            Seamless <span className="green">Disbursal</span>
          </h1>
          <h1>
            for <span className="green">Streamlined</span> Government
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo
          </p>
          <button className="portalBtn">
            VISIT PORTAL <span>&#8594;</span>
          </button>
        </div>
      </div>
      <div className="featuresDiv">
        <h1 className="featureHead">Features</h1>
        <div>
          <div className="feature">
            <Feature1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
