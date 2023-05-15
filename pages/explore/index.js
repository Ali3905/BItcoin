import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/header";
import { useRouter } from "next/router";
import { Row, Col, Card } from "react-bootstrap";
import { getExploreData } from "../api/data";
import styles1 from "/styles/index.module.css";
import Link from "next/link";
import Footer from "../../components/Footer";
import { Vote } from "../../components/WalletConnect/WalletConnect";
import ShareButton from '../../assets/Buttons1.png'
// import ExpButt from '../../assets/.png'
import Image from "next/image";
import CourseMap from "../../components/ExplloreModel";
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
// import Tailwing from "../../components/Tailwing";
// import StyledMenu from "../../components/ShareModal"


export async function getServerSideProps(context) {
  const { query } = context;
  const { category, period } = query;
  const data = await getExploreData(category, period);
  return {
    props: {
      data: data,
      category: category,
      period: period
    }
  };
}

const Explore = ({ data, category, period }) => {
  const [model, setModel] = useState(false)
  const [M, setM] = useState(false)
  const [explorer, setExplorer] = useState(true)
  const [selectedItem, setSelectedItem] = useState(category || "All Categories");
  const [selectedPeriod, setselectedPeriod] = useState(period || "all");
  const [selectedTab, setselectedTab] = useState("popular");
  const router = useRouter();
  const items = [{ category: "All", tag: "all", subcategories: [] },
  { category: "Wallets", tag: "wallets", subcategories: [] },
  { category: "Explorers", tag: "explorer", subcategories: [] },
  {
    category: "Exchanges", tag: "exchanges", subcategories: [
      { name: "DEX", tag: "exchange,dex" }
    ]
  },
  {
    category: "NFTs", tag: "nft", subcategories: [
      { name: "Marketplace", tag: "nft,marketplace" },
      { name: "Collectibles", tag: "nft,collectibles" },
      { name: "Minters", tag: "nft,minters" }
    ]
  },
  {
    category: "CATs", tag: "cat", subcategories: [
      { name: "Marketplace", tag: "cat,marketplace" },
      { name: "Tokens", tag: "cat,tokens" },
      { name: "Minters", tag: "cat,minters" }
    ]
  },
  {
    category: "Farming", tag: "farming", subcategories: [
      { name: "Pools", tag: "farming,pools" },
      { name: "Plootters", tag: "farming,plotters" }
    ]
  },
  { category: "Tools", tag: "tools", subcategories: [] },
  { category: "DAO", tag: "dao", subcategories: [] },
  { category: "Data", tag: "data", subcategories: [] },
  { category: "Community", tag: "community", subcategories: [] },
  { category: "Videos", tag: "videos", subcategories: [] },
  { category: "Faucets", tag: "faucets", subcategories: [] },
  { category: "Games", tag: "games", subcategories: [] },
  { category: "Dev Tooling", tag: "dev_tooling", subcategories: [] }
  ];

  const tabs = [
    { title: "All Time", eventKey: "all" },
    { title: "Today", eventKey: "daily" },
    { title: "Weekly", eventKey: "weekly" },
    { title: "Monthly", eventKey: "monthly" }
  ];

  function handleItemClick(item, sub) {
    if (sub) {
      setSelectedItem(sub);
      router.push(`/explore?category=${sub}&period=all`);
    } else {
      setSelectedItem(item);
      router.push(`/explore?category=${item}&period=all`);
    }
    setselectedTab("popular");
    setselectedPeriod("all");
  }

  function handleTabSelect(tab) {
    setselectedTab("popular");
    setselectedPeriod(tab);
    router.push(
      `${router.pathname}?category=${selectedItem}&period=${tab}`
    );
  }
  function handleTabClick(tab) {
    setselectedTab(tab);
  }


  useEffect(() => {
    const queryTab = router.query.period;
    const queryCategory = router.query.category;
    if (queryCategory) {
      setSelectedItem(queryCategory)
    }
    if (queryTab) {
      setselectedPeriod(queryTab);
    }
    setselectedTab("popular");
  }, [router.query.category, router.query.period]);


  
  let width = 0
  
  useEffect(()=> {
    window.addEventListener('resize', ()=> {
      width = window.innerWidth
      if(window.innerWidth > 800){
        setExplorer(true)
      }else{
        setExplorer(false)
      }
      })
    // })
  },[])
  
  // const [width, setWidth] = useState(0)
  let r = 0

  return (
    <>
      <Head>
        {/* <StyledMenu /> */}
        <title className="text-red-600">Explore Projects</title>
        <meta name="keyword" content="explore" />
      </Head>
      <Header />
      <div className="explore pt-7 pl-5 sm:pt-8 lg:p-10">
        <div className="header-container" >
          <div>

            <div className="flex flex-row justify-between">


            <h1 className="header-explore font-bold lg:font-bold sm:font-bold">Explorer</h1>

            {/* <div className="w-full bg-red-400"></div> */}

            <div className="header-share">
            <p className="header-shareapp invisible lg:visible">Share this apps</p>
            <div className="header-shareapp1 invisible lg:visible"> <button className={styles1.buttons1}>
              <img
                className={styles1.twitterLogo2429Icon}
                alt=""
                src="/twitterlogo2429.svg"
                width={500}
                height={500}
              />
            </button>
              <button className={styles1.buttons1}>
                <img
                  className={styles1.twitterLogo2429Icon}
                  alt=""
                  src="/discordiconsvgrepocom-1.svg" width={500}
                  height={500}
                />
              </button>
              <button className={styles1.buttons1}>
                <img
                  className={styles1.twitterLogo2429Icon}
                  alt=""
                  src="/linkbold.svg" width={500}
                  height={500}
                />
              </button></div>
          </div>


            <div onClick={()=>{setModel(prev=> !prev)}} className="text-black lg:hidden mr-3" id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-black bg-gray-100 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-gray-200 dark:focus:ring-white-800" type="button">
              {/* <Image src={ShareButton} className="w-9 h-9 border border-black rounded-xl" /> 
              className="w-6 h-6 border border-gray-300 rounded-lg p-1 " />*/}
              <ShareIcon/>
            </div>
          {model &&<div id="dropdownHover1" className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
      <li>
                <button className={styles1.buttons1}>
              <img
                className={styles1.twitterLogo2429Icon}
                alt=""
                src="/twitterlogo2429.svg"
                width={500}
                height={500}
              /><span className="ml-2">Twitter</span>
              </button>
      </li>
      <li>
      <button className={styles1.buttons1}>
                <img
                  className={styles1.twitterLogo2429Icon}
                  alt=""
                  src="/discordiconsvgrepocom-1.svg" width={500}
                  height={500}
                /><span className="ml-2">Discord</span>
              </button>
      </li>
      <li>
      <button className={styles1.buttons1}>
                <img
                  className={styles1.twitterLogo2429Icon}
                  alt=""
                  src="/linkbold.svg" width={500}
                  height={500}
                  
                /><span className="ml-2">Copy Link</span>
              </button>
      </li>
      {/* <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li> */}
    </ul>
</div>}

            

            </div>
            <p className="header-near sm:w-full pr-2">NEAR-based multichain interoperable Octopus Network and Appchains Ecosystems</p> </div>
         
        </div>
        <div onClick={()=>{setExplorer(prev=> !prev)}} className=" ex mt-3 rounded-md h-9 px-2 py-2 visible lg:hidden text-black justify-between font-semibold flex flex-row items-center">
          Explorer
          <div>
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVfULEdWwdYdx3p4XUHxby6nNXGaMtOGZE4mK_xRxTcw&usqp=CAU&ec=48665699"  
          className="w-4 h-4 bg-gray-100 mr-4" />
          </div>
        </div>

        <div className="">
          <Row className="explore-content lg:gap-40" >

           
              {/* {width<1000 ? null  : ( */}
     {explorer && <Col style={{backgroundColor: "#FFFFFF "}} className='lg:visible flex-col justify-start gap-2 rounded-sm explorer-col' onClick={()=>{if(window.innerWidth < 800){
      // console.log(window.innerWidth > "800px")
      setExplorer(prev=> !prev)}}}>
      <CancelIcon className="cancel1"/>
      { items.map((item) => ( 
        <div key={item.category}>
          <div
            className={selectedItem === item.tag ? "activesidebar" : "sidebar"}
            onClick={() => handleItemClick(item.tag)}
          >
            <div className="side-title">{item.category}</div>
          </div>
          {item.subcategories.length > 0 && (
            <div className="subcategories">
              {item.subcategories.map((sub) => (
                <div
                  key={sub.name}
                  className={selectedItem === sub.tag ? "activesidebar-sub" : "sidebar-sub"}
                  onClick={() => handleItemClick(item.tag, sub.tag)}
                >
                  <div className="side-title-sub">{sub.name}</div>
                </div>
              ))}
            </div>
          )}

        </div>
      ))}
      </Col>}

            {/* )} */}
         
            <Col>
              <div className="nav-tab">
                <div className="nav-buttons visible">
                  <div className={selectedTab === 'popular' ? 'activetab' : 'unactivetab'} onClick={() => handleTabClick('popular')}>
                    Popular
                  </div>
                  <div className={selectedTab === 'newest' ? 'activetab' : 'unactivetab'} onClick={() => handleTabClick('newest')}>
                    Newest
                  </div>

                  <div>
                    

                  <button onClick={()=>{setM(prev=> !prev)}} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-black bg-gray-100 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-gray-200 dark:focus:ring-white-800" type="button">All Time <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7"></path></svg></button>
{/* <!-- Dropdown menu --> */}
{M &&<div id="dropdownHover" className="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black">Today</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">This week</a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">This Month</a>
      </li>
      {/* <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li> */}
    </ul>
</div>}


                  </div>

                </div>
                <div >
                  {selectedTab === 'popular' && (
                    <ul id="explore-tabs" className="tabs">
                      {tabs.map((tab) => (
                        <li
                          key={tab.eventKey}
                          className={tab.eventKey === selectedPeriod ? "nav-active" : "nav-unactive"}
                          onClick={() => handleTabSelect(tab.eventKey)}
                        >
                          {tab.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="explore-details">
                {data.data.map((sample, index) => (
                  <div key={index} className="cardgridview">
                    <Link legacyBehavior href={`explore/${sample.project_id}`}>
                      <img className="w-20 h-20 rounded-2xl sm:w-20 sm:h-20 sm:block md:w-20 md:h-20 lg:w-24 lg:h-24"
                        alt=""
                        src={sample.logo}

                        // width={500}
                        // height={500}
                      /></Link>
                    <Link legacyBehavior href={`explore/${sample.project_id}`}><div>
                      <div className="table-description card-div"><div className="explore-title">{sample.project_id}</div>
                      <ul className="explore-tags">
                        {sample.tags.map((tag, index) => (
                          <div className='explore-tag' key={index}>{tag}</div>
                        ))}
                      </ul>
                        <p className="explore-text">Most loved Chia explorer for XCH,NFT,CAT and DID. Get the Chia blockchain
                          trend on price,netspace,mempool,address,balance.</p></div>
                    </div></Link>
                    <div className="card-visit invisible lg:visible">
                      <Vote allVotes={sample.all_votes} />
                      <p className="visitsite">Visit site</p></div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </div>
        {/* <CourseMap model setModel/> */}
      </div>
      {/* <Tailwing /> */}
      <Footer />
    </>
)}
export default Explore;
