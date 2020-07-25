import React from "react";
import "./Home.css";
import LogoHead from "../../Components/LogoHead/LogoHead";
import HomeNav from "../../Components/HomeNav/HomeNav";
import { ReactComponent as Feature1 } from "../../Assets/feature1.svg";
import { ReactComponent as Feature2 } from "../../Assets/feature2.svg";
import { ReactComponent as Feature3 } from "../../Assets/feature3.svg";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

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
          <div className="loginLink">
            <Link to="/login">
              <button className="portalBtn">
                VISIT PORTAL <span>&#8594;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="featuresSection">
        <h1 className="featureHead">Features</h1>
        <div className="featuresDiv">
          <div className="feature">
            <Feature1 className="featureLogo" />
            <h3>Encrypted Data Flow</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo
            </p>
          </div>
          <div className="feature">
            <Feature2 className="featureLogo" />
            <h3>
              Notifications
              <br />
              on-the-go
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo
            </p>
          </div>
          <div className="feature">
            <Feature3 className="featureLogo" />
            <h3>Seamless communication aross channels</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
