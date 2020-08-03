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
            Single point securely hosted software solution to seamlessly integrate disbursal of
            funds and related communication from both the Center and State with respect to Central
            Schemes for each of the Department
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
              Encryption is intended to prevent data from being read or modified by intruders.
              Encrypted Data Flow ensures the data being sent to the database in a secure method and
              is also stored securely. This ensures that data is protected and prevents any misuse.
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
              Receive updates about all the new events and due endeavour on the mail, and same would
              be accessible on the dashboard through notifications.
            </p>
          </div>
          <div className={styles.feature}>
            <Feature3 className={styles.featureLogo} />
            <h3>Seamless communication aross channels</h3>
            <p>
              Channels to communicate seamlessly with authorities of the same and different
              departments and schemes through mail and messages on the dashboard.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
