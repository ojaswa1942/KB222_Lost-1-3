import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import LogoHead from "../../Components/LogoHead/LogoHead";
import HomeNav from "../../Components/HomeNav/HomeNav";
import { ReactComponent as Feature1 } from "../../assets/feature1.svg";
import { ReactComponent as Feature2 } from "../../assets/feature2.svg";
import { ReactComponent as Feature3 } from "../../assets/feature3.svg";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.home}>
        <div className={styles.homeHeader}>
          <LogoHead />
          <HomeNav />
        </div>
        <div className={styles.homeBody}>
          <h1>
            Seamless <span className={styles.green}>Disbursal</span>
            <br /> for <span className={styles.green}>Streamlined</span> Government
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo
          </p>
          <div className={styles.loginLink}>
            <Link to="/login">
              <button type="button" className={styles.portalBtn}>
                VISIT PORTAL <span>&#8594;</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.featuresSection}>
        <h1 className={styles.featureHead}>Features</h1>
        <div className={styles.featuresDiv}>
          <div className={styles.feature}>
            <Feature1 className={styles.featureLogo} />
            <h3>Encrypted Data Flow</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo
            </p>
          </div>
          <div className={styles.feature}>
            <Feature2 className={styles.featureLogo} />
            <h3>
              Notifications
              <br />
              on-the-go
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo
            </p>
          </div>
          <div className={styles.feature}>
            <Feature3 className={styles.featureLogo} />
            <h3>Seamless communication aross channels</h3>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
