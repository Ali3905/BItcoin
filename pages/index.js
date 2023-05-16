import Head from "next/head";
import Header from '../components/header';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Item from '@mui/material/Grid';
import Typo from "../components/customcomponents/Typo";
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Footer from "../components/Footer";
import { SubmitProject } from "../components/WalletConnect/WalletConnect";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HamMenu from "../components/HamMenu";

export default function Home() {
  return (
    <>
      <Head>
        <title className="text-red">chiatothemoon.com</title>
        <meta name="description" content="chiatothemoon.com application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/spacescan-logo.png" />
      </Head>
      <Grid container direction={'column'} alignItems={'flex-start'}>
        <Grid container item xs={12}>
          <Header />
          {/* <HamMenu model={true} setmodel={()=>{}} /> */}
        </Grid>
        <Grid container spacing={3} alignItems="center" direction={"column"} style={{ marginTop: "15%" }}>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <Typo className={styles.GradTxt} >
                Explore Projects building on Chia Blockchain and curated by verified DID profiles
              </Typo>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <Typo className={styles.GradSubTxt}>
                Experience the Future of Chia Blockchain with Projects Verified by DID Profiles for Unmatched Trust and Transparency.
              </Typo>
            </Paper>
          </Grid>
          <Grid container direction='row' columns={20} spacing={1} style={{ marginTop: "2%" }} className={styles.btnGrid}>
            {/* <Grid item xs={8} /> */}
            <Grid item >
              <Link href="/explore?category=all&period=all">
                <Button variant="contained" className='connectwallet' disableElevation >Explore Projects</Button>
              </Link></Grid>
            <Grid item >
              <SubmitProject />
            </Grid>
            {/* <Grid item xs={6} /> */}
          </Grid>
        </Grid>
        <Grid container direction='column' spacing={10} alignItems='center' style={{ marginTop: "7%" }}>
          <Grid item xs={12}>
            <Paper elevation={0}>
              <Typo className={styles.GradSubTxt}>
                🔥 Trending Projects
              </Typo>
            </Paper>
          </Grid>
          <Grid item>
            <Grid container direction='row' columns={24} alignItems='center' className={styles.projGrid}>
              
              <Grid item xs={4}>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <Button style={{ display: "flex", flexDirection: "column" }}>
                      <img className={styles.projImg} src='/images/spacescan.png' />
                      <Item className={styles.projName}>Spacescan</Item>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <Button style={{ display: "flex", flexDirection: "column" }}>
                      <img className={styles.projImg} src='/images/gobiwallet.png' />
                      <Item className={styles.projName}>Gobi Wallet</Item>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <Button style={{ display: "flex", flexDirection: "column" }}>
                      <img className={styles.projImg} src='/images/mintgarden.png' />
                      <Item className={styles.projName}>MintGarden</Item>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction='column' alignItems='center'>
                  <Grid item direction='column'>
                    <Button style={{ display: "flex", flexDirection: "column" }}>
                      <img className={styles.projImg} src='/images/appollo42.png' />
                      <Item className={styles.projName}>Appollo42</Item>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <Button style={{ display: "flex", flexDirection: "column" }}>
                      <img className={styles.projImg} src='/images/tri.png' />
                      <Item className={styles.projName}>Trisolaris</Item>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <Button style={{ display: "flex", flexDirection: "column" }}>
                      <img className={styles.projImg} src="/images/tri.png" />
                      <Item className={styles.projName}>Trisolaris</Item>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid container spacing={2} style={{ marginTop: "5%"}} className={styles.secGrid}>
          <Grid item xs={4} >
            <Grid container direction='column' alignItems='center' spacing={2} className={styles.sec}>
              <Grid item style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <img className={styles.projImg} src='/images/explore.png' />
                <Typo className={styles.projName}>Explorer</Typo>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row", alignSelf:"flex-start", }}>
                  <img className={styles.projImg} src='/images/spacescan.png' />
                  <Typo className={styles.projName}>Spacescan</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/xchscan.png' />
                  <Typo className={styles.projName}>XCH Scan</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/apyvis.png' />
                  <Typo className={styles.projName}>APY Vision</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/nearblocks.png' />
                  <Typo className={styles.projName}>NearBlocks</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row",  }}>
                  <Typo className={styles.projName}>Explore More <NavigateNextIcon/></Typo>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Grid container direction='column' alignItems='center' spacing={2} className={styles.sec}>
              <Grid item style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <img className={styles.projImg} src='/images/nft.png' />
                <Typo className={styles.projName}>NFT</Typo>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/spacescan.png' />
                  <Typo className={styles.projName}>Spacescan</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/xchscan.png' />
                  <Typo className={styles.projName}>XCH Scan</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/apyvis.png' />
                  <Typo className={styles.projName}>APY Vision</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/nearblocks.png' />
                  <Typo className={styles.projName}>NearBlocks</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row",  }}>
                  <Typo className={styles.projName}>Explore More <NavigateNextIcon/></Typo>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Grid container direction='column' alignItems='center' spacing={2} className={styles.sec}>
              <Grid item style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <img className={styles.projImg} src='/images/wallet.png' />
                <Typo className={styles.projName}>Wallet</Typo>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/spacescan.png' />
                  <Typo className={styles.projName}>Spacescan</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/xchscan.png' />
                  <Typo className={styles.projName}>XCH Scan</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/apyvis.png' />
                  <Typo className={styles.projName}>APY Vision</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row" }}>
                  <img className={styles.projImg} src='/images/nearblocks.png' />
                  <Typo className={styles.projName}>NearBlocks</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ display: "flex", flexDirection: "row",  }}>
                  <Typo className={styles.projName}>Explore More <NavigateNextIcon/></Typo>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container alignItems='flex-start' style={{ margin: "10% 5%" }} className={styles.inviteGrid}>
          {/* <Grid item xs={0.5} /> */}
          <Grid item xs={4} minWidth={"30rem"} paddingRight={"6rem"}>
            <Grid container spacing={3} direction='column' alignItems='flex-start' >
              <Grid item>
                <Button className={styles.didProfilebtn}>
                  <Typo className={styles.didProfile}>DID Profile</Typo>
                </Button>
              </Grid>
              <Grid item>
                <Typo className={styles.txtb}>
                  Secure your digital ownership with Chia blockchain&#39;s revolutionary DID standard in Web3
                </Typo>
              </Grid>
              <Grid item className={styles.subTxt}  paddingRight={"4rem"}>
                <Typo>{`Take control of your personal data and enjoy unparalleled privacy and control over your digital identity. Experience the freedom and security of decentralized identity with Chia DID profiles. `}</Typo>
                <Typo style={{ color: '#007d54' }}>Learn more</Typo>
              </Grid>
              <Grid item><Link href="https://www.spacescan.io/myprofile" target="_blank">
                <Button variant="contained" className='connectwallet' disableElevation>Create Your DID</Button></Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} >
            <div className={styles.groupParent}>
              <div className={styles.ellipseParent}>
                <img className={styles.groupChild} alt="" src="/images/people/1.png" />
                <img className={styles.groupItem} alt="" src="/images/people/2.png" />
                <img className={styles.groupInner} alt="" src="/images/people/3.png" />
                <img className={styles.ellipseIcon} alt="" src="/images/people/4.png" />
                <img className={styles.groupChild1} alt="" src="/images/people/5.png" />
                <img className={styles.groupChild2} alt="" src="/images/people/6.png" />
                <img className={styles.groupChild3} alt="" src="/images/people/7.png" />
                <img className={styles.groupChild4} alt="" src="/images/people/8.png" />
                <img className={styles.groupChild5} alt="" src="/images/people/9.png" />
                <img className={styles.groupChild6} alt="" src="/images/people/10.png" />
              </div>
            </div>
          </Grid>
          {/* <Grid item xs={0.5} /> */}
        </Grid>
        <Grid item alignItems='center'>
          <Footer />
        </Grid>
      </Grid>
    </>
  )
}
