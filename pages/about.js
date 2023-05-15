import Header from "../components/header";
import Footer from "../components/Footer";
import styles from "../styles/about.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.frameGroup}>
            <div className={styles.meetTheTeamParent}>
              <b className={styles.meetTheTeam}>MEET THE TEAM</b>
              <div className={styles.meetOurIncredible}>
                Meet our incredible team of experts! We are the tribe of
                passionate professional who are all United by a shared goal.We
                come from all corners of the globe — 🐨🥝🦁⛄️🍔 — but the magic
                happens in 🇦🇺 Toronto and 🇺🇸 US.
              </div>
            </div>
            <div className={styles.profileParent}>
              <div className={styles.profile}>
                <div className={styles.profileInner}>
                  <img
                    className={styles.frameChild}
                    alt=""
                    src="/rectangle-38@2x.png"
                  />
                </div>
                <img className={styles.profileA} alt="" />
                <div className={styles.profilepicAparent}>
                  <div className={styles.profilepicA}></div>
                  <div className={styles.profilepicA1}></div>
                </div>
              </div>
              <img
                className={styles.groupChild}
                alt=""
                src="/rectangle-49@2x.png"
              />
              <div className={styles.profile1}>
                <div className={styles.profileInner}>
                  <img
                    className={styles.frameChild}
                    alt=""
                    src="/rectangle-381@2x.png"
                  />
                </div>
                <img className={styles.profileA} alt="" />
                <div className={styles.profilepicBparent}>
                  <div className={styles.profilepicA}></div>
                  <div className={styles.profilepicA1}></div>
                </div>
              </div>
              <div className={styles.profile2}>
                <div className={styles.profileInner}>
                  <img
                    className={styles.frameChild}
                    alt=""
                    src="/rectangle-382@2x.png"
                  />
                </div>
                <img className={styles.profileA} alt="" />
                <div className={styles.profilepicAparent}>
                  <div className={styles.profilepicA}></div>
                  <div className={styles.profilepicA1}></div>
                </div>
              </div>
              <img
                className={styles.groupItem}
                alt=""
                src="/rectangle-42@2x.png"
              />
              <img
                className={styles.groupChild}
                alt=""
                src="/rectangle-49@2x.png"
              />
              <img
                className={styles.rectangleIcon}
                alt=""
                src="/rectangle-50@2x.png"
              />
              <img
                className={styles.groupChild1}
                alt=""
                src="/rectangle-50@2x.png"
              />
              <img
                className={styles.groupChild2}
                alt=""
                src="/rectangle-46@2x.png"
              />
              <img
                className={styles.groupChild3}
                alt=""
                src="/rectangle-43@2x.png"
              />
              <a className={styles.rectangleA} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
