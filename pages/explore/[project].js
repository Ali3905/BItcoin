import styles from "/styles/project.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from 'react';
import Header from "../../components/header";
import { getDIDInfo, getExploreProject } from "../api/data";
import { Vote } from "../../components/WalletConnect/WalletConnect";
import Footer from "../../components/Footer";


export async function getServerSideProps(context) {
  const { query } = context;
  const { project } = query;
  const data = await getExploreProject(project);
  // console.log(data);
  const teams = await getDIDInfo(data.data.teams);
  // console.log('didResponse>>',teams.data);
  return {
    props: {
      data: data.data,
      project: project,
      teams: teams.data
    }
  };
}
const Project = ({ data, project, teams }) => {
  let previewImage = data && data.screens && data.screens.length > 0 ? data.screens[0] : null;
  const [selectedImage, setSelectedImage] = useState(previewImage); // Set the first image as the default preview image
  const [showButtons, setShowButtons] = useState(false);
  const message = "Check out this cool website built with Next.js! #Nextjs #webdevelopment";

  // Create the Twitter share URL with pre-populated message
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;

  const handleShareClick = () => {
    setShowButtons(!showButtons);
  };
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  function copyToClipboard(text) {
    // Create a new textarea element to hold the text to be copied
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Append the textarea to the document body
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the document body
    document.body.removeChild(textarea);
  }

  const messaged = "Check out this cool website built with Next.js! #Nextjs #webdevelopment";

  // Replace with your own Discord webhook URL
  const webhookUrl = "https://discord.com/api/webhooks/your-webhook-url-here";

  // Create the Discord webhook payload with pre-populated message
  const payload = {
    content: messaged
  };

  // Define the fetch options for sending the webhook
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };
  const sendWebhook = async () => {
    try {
      const response = await fetch(webhookUrl, fetchOptions);
      console.log('Discord webhook sent successfully');
    } catch (err) {
      console.error('Failed to send Discord webhook: ', err);
    }
  };

  return (<>
    <Head>
      <title>{project}</title>
      <meta name="keyword" content={project} />
    </Head>
    <Header />
    <div className={styles.frame1}>
      <img
        className={styles.image1}
        alt=""
        src={data.logo}
        width={500}
        height={500}
      />
      <div className={styles.frame2}>
        <div className={styles.header1}>{project}</div>
        <div className={styles.description}>{data.tagline}</div>
        <div className={styles.social}>
          {data.social.twitter && (<Link href={data.social.twitter} target="_blank" rel="noopener noreferrer"><div className={styles.buttons1}>  <img
            className={styles.logo1}
            alt=""
            src="/twitterlogo2429.svg"
            width={500}
            height={500}
          />
            <img
              className={styles.logo1}
              alt=""
              height={500}
            />
          </div></Link>)}
          {data.social.discord && (<Link href={data.social.discord} target="_blank" rel="noopener noreferrer"> <p className={styles.socialName} >Discord</p></Link>)}
        </div>
      </div>
    </div>
    <div className={styles.frame3}>
      <div className={styles.frame4}>
        <Vote allVotes={data.all_votes} />
        <Link href={data.social.website} target="_blank"><button className={styles.visit}>
          Visit</button></Link>
      </div>
      <div className={styles.share}>
        <div className={styles.report}><img
          className={styles.sharelogo}
          alt=""
          src="/report.svg" width={500}
          height={500}
        />Report Project</div>
        <div className={styles.Share} onClick={handleShareClick}><img
          className={styles.sharelogo}
          alt=""
          src="/share1.svg" width={500}
          height={500}
        />Share</div>
        {showButtons && (
          <div className={styles.shareButtons}>
            <Link href={tweetUrl} target="_blank" rel="noopener noreferrer">
              <div className={styles.sharesocial}>  <img
                className={styles.sharelogo}
                alt=""
                src="/twitterlogo2429.svg"
                width={500}
                height={500}
              /> <p className={styles.sharetext}>Twitter</p>
              </div></Link>
            <div className={styles.sharesocial}>  <img
              className={styles.sharelogo}
              alt=""
              src="/copylink.svg"
              width={500}
              height={500}
            /> <p className={styles.sharetext} onClick={copyToClipboard(data.project_id)}>Copy Link</p>
            </div>

          </div>
        )}
      </div>
    </div >
    <div className={styles.images}>
      {selectedImage && (
        <div className={styles.preview}>
          <img src={selectedImage} alt="Preview" className={styles.preview}
          />
        </div>
      )}
      <div className={styles.imagelist}>
        {data.screens && data.screens.map((imageUrl, index) => (
          <div key={index} onClick={() => handleImageClick(imageUrl)}>
            <img src={imageUrl} alt={`Image ${index}`} className={styles.image} />
          </div>
        ))}
      </div>

    </div>
    <div className={styles.describe}>
      <p className={styles.describeText}>{data.description}</p>
      <div className={styles.tagbox}><ul className={styles.tags}>
        {data.tags.map((tag, index) => (
          <div className={styles.tag} key={index}> <Link legacyBehavior href={`/explore?category=${tag}&period=all`}>{tag}</Link></div>
        ))}
      </ul>
      </div>
    </div>
    <div className={styles.team}>
      <div className={styles.meettab}>
        <p className={styles.meettheteam}>Meet the Team</p>
        <div className={styles.viewall}>View All</div>
      </div>
      <ul className={styles.teamlist}>
        {teams.data && teams.data.map((team, index) => (
          <div key={index} className={styles.teamview}>
            <img src={team.profile_url} alt="profile" className={styles.profileimg} />
            <div className={styles.name}>{team.name}</div>
            {team.social && team.social.twitter && (
              <p className={styles.twittername}>@{team.social.twitter}</p>
            )}
          </div>
        ))}
      </ul>

    </div>
    <div className={styles.upvotedprofiles}>
      <div className={styles.meettab}>
        <p className={styles.meettheteam}>Recent Upvoted Profiles</p>
        <div className={styles.viewall}>View All</div>
      </div>
      <ul className={styles.teamlist}>
        {teams && teams.data && teams.data.map((team, index) => (
          <div key={index} className={styles.teamview}>
            <img src={team.profile_url} alt="profile" className={styles.profileimg} />
            <div className={styles.name}>{team.name}</div>
            {team.social && team.social.twitter && (
              <p className={styles.twittername}>@{team.social.twitter}</p>
            )}
          </div>
        ))}
      </ul><div className={styles.footer}><Footer /></div>
    </div>
  </>
  )
}

export default Project