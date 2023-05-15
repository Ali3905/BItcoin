import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Logo from "../components/logo";
import SearchBar from "./searchBar";
import { SubmitProject, WalletConnect } from './WalletConnect/WalletConnect';
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import styles from'../styles/Home.module.css'
import HamMenu from "./HamMenu";
import Ham from '../assets/Buttons.png'
import Image from "next/image";
import DehazeIcon from '@mui/icons-material/Dehaze';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

export default function Header({ postion }) {

    const [positin, setP] = useState(postion || 'fixed');
    const [model , setModel ] = useState(false)
    const [drop, setDrop] = useState(false)
    return (

        // <Grid container className='header' position={positin}>
        //     <Grid item lg={2}>
        //         <Logo />
        //     </Grid>
        //     <Grid item lg={5}>
        //         <SearchBar />
        //     </Grid>

        //     <div className={`${styles.menu_icon}`} onClick={()=>{}}>
        //     {/* <p className={click1 ? "fas fa-times z-20" : "fas fa-bars bg-transparent"} /> */}
        //     {/* <AiOutlineMenu className={true ? "hidden" : "block text-white m-4"} />
        //     <AiOutlineClose className={true? "block text-white m-4" : "hidden "} /> */}
        //   </div>
            
        //     <Grid item lg={5}>
        //         <Box display={'flex'} justifyContent="flex-end" alignItems={'center'} >
        //             <SubmitProject />
        //             <WalletConnect />
        //         </Box>
        //     </Grid>
        // </Grid>

        <>
      

        <div className="lg:justify-between" style={{display:"flex", flex:"row", width:"100%", justifyContent:"space-between", marginTop:"2px", marginBottom:"2px", PaddingLeft:"20px", paddingRight:"20px", alignItems:"center" }}  >

            {/* <div style={{display:"flex", flex:"row"}}> */}
            <div>
            <Logo />
            </div>

            <div className="invisible lg:visible" style={{width:"500px"}}>
            <SearchBar />
            </div>

            {/* </div> */}

            <div className="invisible lg:visible flex flex-row">
            <SubmitProject />
            <WalletConnect />
            </div>

            <div onClick={()=>{setModel(true)}} className="text-black visible lg:hidden mr-3">
            <DehazeIcon className={styles.hammMenu}/>
                {/* <Image src={Ham} className="w-10 h-8 border border-black rounded-lg mr-2" /> */}
            </div>
            {model && <div className={styles.dropdown}>
                {/* <Logo className={styles.logoOnDrop}/> */}
                <CancelIcon className={styles.cancel} onClick={()=>{setModel(false)}}/>
                <SearchIcon className={styles.search} />
            <SubmitProject />
            <WalletConnect />
            </div>}



        </div>
            <div style={{backgroundColor:"grey", height:"0.5px", width:"100%"}}></div>
            {/* <HamMenu model={model} setmodel={setModel} /> */}

            </>

    )

};
