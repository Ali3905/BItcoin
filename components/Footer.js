import { Grid } from "@mui/material";
import styles from "../styles/footer.module.css";
import Typo from "./customcomponents/Typo";
import Logo from "../components/logo"
import { useEffect, useState } from "react";

const Footer = () => {
    const [copy, setCopy] = useState(false)
    useEffect(()=> {
        window.addEventListener('resize', ()=> {
          if(window.innerWidth > 800){
            setCopy(false)
            // }
          }else{
            setCopy(true)
          }
          })
          if(window.innerWidth > 800){
            setCopy(false)
          }else{
            setCopy(true)
          }
        // })
      },[])
    return (
        <Grid container alignItems='center' className='sitefooter'>
            <Grid item className={styles.footerTxt}>
                <Grid container className={styles.footerContainer}>
                    <Grid item xs={4} container rowSpacing={0.5} className={styles.smContainer}>
                        <Grid container direction='column' alignItems='flex-start' spacing={2}>
                            <Grid item>
                                <Logo />
                            </Grid>
                            <Grid item>
                                <Typo className={styles.txt}>
                                    Chiatothemoon is your go-to destination for everything related to
                                    Chia, the innovative blockchain and cryptocurrency platform.
                                    Curated selection of Projects, events, news, articles, tutorials
                                    help you stay up-to-date in the Chia ecosystem.
                                </Typo>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justify='center' spacing={2}>
                                    <Grid item>
                                        <img className={styles.Logo} alt="" src="/images/twitterlogo.png" />
                                    </Grid>
                                    <Grid item>
                                        <img className={styles.Logo} alt="" src="/images/discordlogo.png" />
                                    </Grid>
                                    <Grid item>
                                        <img className={styles.Logo} alt="" src="/images/share.png" />
                                    </Grid>
                                </Grid>
                            </Grid>
                           { !copy && <Grid item>
                            <Typo className={styles.txt}>Copyright © 2023 - spacescan.io</Typo>
                            </Grid>}
                        </Grid>
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={2} container rowSpacing={0.5} alignItems="flex-start" className={styles.smContainer}>
                        <Grid item xs={12}>
                            <Typo className={styles.headTxt}>About</Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}>What is chia to the moon?</Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>Meet the team</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>Contributors</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>Partners</a></Typo>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} container rowSpacing={0.5} alignItems="flex-start" className={styles.smContainer}>
                        <Grid item xs={12}>
                            <Typo className={styles.headTxt}>Explore</Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>NFT</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>Explorer</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>Wallet</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>Markets</a></Typo>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} container rowSpacing={0.5} alignItems="flex-start" className={styles.smContainer}>
                        <Grid item xs={12}>
                            <Typo className={styles.headTxt}>Learn</Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>What is chia?</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>What is chia DID profile?</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>What is chia NFT standard?</a></Typo>
                        </Grid>
                        <Grid item xs={12}>
                            <Typo className={styles.txt}><a>Develop in chia</a></Typo>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <img src="../images/line.png" />
            </Grid>
            <Grid item justify="center" >
                <Typo className={styles.headText}>Made with 💚 by <a>Spacescan.io</a></Typo>
                {copy && <Typo className={styles.txt1}>Copyright © 2023 - spacescan.io</Typo>}
            </Grid>
        </Grid>
    );
};

export default Footer;
