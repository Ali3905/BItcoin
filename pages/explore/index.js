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
  const [model, setModel] = useState(true)
  const [M, setM] = useState(false)
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
      console.log('====================================');
      console.log(width);
      console.log('====================================');
      console.log(window.innerHeight, window.innerWidth)
    })
  }, [])
  
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

            <div onClick={()=>{setModel(true)}} className="text-black lg:hidden mr-3">
              {/* <Image src={ShareButton} className="w-9 h-9 border border-black rounded-xl" /> */}
              <img src='data:image/png;base64,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' 
              className="w-6 h-6 border border-gray-300 rounded-lg p-1 " />
            </div>

            

            </div>
            <p className="header-near sm:w-full pr-2">NEAR-based multichain interoperable Octopus Network and Appchains Ecosystems</p> </div>
         
        </div>
        <div onClick={()=>{}} className=" ex mt-3 rounded-md h-9 px-2 py-2 visible lg:hidden text-black justify-between font-semibold flex flex-row items-center">
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
<Col style={{backgroundColor: "#FFFFFF "}} className='hidden lg:visible flex-col justify-start gap-2 rounded-sm'>
{items.map((item) => ( 
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
</Col>

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
                    

                  <button onClick={()=>{setM(prev=> !prev)}} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-black bg-gray-100 hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-gray-200 dark:focus:ring-white-800" type="button">All Time <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 9l-7 7-7-7"></path></svg></button>
{/* <!-- Dropdown menu --> */}
{M &&<div id="dropdownHover" class="z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black">Today</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">This week</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">This Month</a>
      </li>
      {/* <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
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
                      <div className="table-description"><div className="explore-title">{sample.project_id}</div>
                        <p className="explore-text">Most loved Chia explorer for XCH,NFT,CAT and DID. Get the Chia blockchain
                          trend on price,netspace,mempool,address,balance.</p></div>
                      <ul className="explore-tags">
                        {sample.tags.map((tag, index) => (
                          <div className='explore-tag' key={index}>{tag}</div>
                        ))}
                      </ul>
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
