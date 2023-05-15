import { useState, useEffect } from 'react';
import Header from "../components/header";
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { submitProject, getDid } from "./api/data";
import styles from "/styles/submit.module.css";
import { Grid } from "@mui/material";
import { Row, Col } from 'react-bootstrap';
import Footer from "../components/Footer";

const initialFormData = {
  project_id: '',
  tagline: '',
  social: {
    website: "",
    twitter: "",
    discord: ""
  },
  description: '',
  tags: [],
  did_id: 'did',
  owner_id: '12345677',
  teams: []
};

const tagsOptions = [
  "cat",
  "marketplace",
  "explorer",
  "wallet",
  "nft"
];

export default function MyForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamInfo, setTeamInfo] = useState([]);
  const [isSocialLinksOpen, setIsSocialLinksOpen] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ title: "", url: "" });
  const [socialLinks, setSocialLinks] = useState([]);
  const [iconUrl, setIconUrl] = useState('');
  const [iconType, setIconType] = useState("");
  const [base64Icon, setBase64Icon] = useState('');
  const [iconName, setIconName] = useState(false);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const isEmpty = (value) => value.trim() === '';
  const isFormValid = !isEmpty(formData.project_id) && !isEmpty(formData.tagline) && !isEmpty(formData.social.website) && !isEmpty(formData.description) && formData.tags.length > 0 && iconName;
  const errorMessage = 'Please fill out the ';

  const handleAddTeam = () => {
    if (newTeamName) {
      setFormData({
        ...formData,
        teams: [...formData.teams, newTeamName]
      });
      setNewTeamName("");
    }
  };

  const handleRemoveTeam = (index) => {
    setFormData({
      ...formData,
      teams: formData.teams.filter((team, i) => i !== index)
    });
  };

  const handleTeamNameChange = (e) => {
    setNewTeamName(e.target.value);
  };

  const handleTwitterChange = (e) => {
    setFormData({
      ...formData,
      social: { ...formData.social, twitter: e.target.value }
    });
  };

  const handleDiscordChange = (e) => {
    setFormData({
      ...formData,
      social: { ...formData.social, discord: e.target.value }
    });
  };
  const handleTagChange = (event) => {
    const selectedTag = event.target.value;
    if (!formData.tags.includes(selectedTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, selectedTag],
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((tag) => tag !== tagToRemove)
    }));
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const handleAddSocialLink = () => {
    setIsSocialLinksOpen(true);
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    const preview = URL.createObjectURL(file);
    const base64 = await getBase64Image(file);
    const updatedImages = [...images];
    updatedImages[index] = { file, preview, base64 };
    setImages(updatedImages);
  };

  const getBase64Image = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result.replace('data:', '').replace(/^.+,/, '');
        resolve(base64Image);
      };
    });
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIconName(e.target.files[0].name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setIconUrl(reader.result);

      setBase64Icon(reader.result.replace('data:', '').replace(/^.+,/, ''));
    };
    setIconType(file.type);
    reader.readAsDataURL(file);
  };
  const handleCancelAddSocialLink = () => {
    setIsSocialLinksOpen(false);
    setNewSocialLink({ title: "", url: "" });
  };

  const handleSaveSocialLink = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      social: {
        ...prevFormData.social,
        [newSocialLink.title.toLowerCase()]: newSocialLink.url,
      },
    }));
    setIsSocialLinksOpen(false);
    setSocialLinks([...socialLinks, newSocialLink]);
    setNewSocialLink({ title: "", url: "" });
  };

  const handleNewSocialLinkTitleChange = (e) => {
    setNewSocialLink((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleNewSocialLinkUrlChange = (e) => {
    setNewSocialLink((prev) => ({ ...prev, url: e.target.value }));
  };
  const handleDeleteImage = (index) => {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      const info = [];
      for (const team of formData.teams) {
        const data = await getDid(team);
        info.push(data.data);
      }
      setTeamInfo(info);
    };
    fetchData();
  }, [formData]);

  const handleSubmit = async (event) => {
    setNextClicked(true); ;
    event.preventDefault();
    if (isFormValid) {
      setIsSubmitting(true)
      const result = await submitProject(formData);
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        let file = image.file;
        const base64 = await getBase64Image(file);
        let type = file.type;
        let name = file.name;
        try {
          const response = await fetch('https://api.chiatothemoon.com/upload-previews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              mime: `${type}`,
              owner_id: "12345677",
              project_id: `${formData.project_id}`,
              image_name: `${name}`,
              image: `base64,${base64}`
            })
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }

      const response = await fetch('https://api.chiatothemoon.com/upload-logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mime: `${iconType}`,
          owner_id: "12345677",
          project_id: `${formData.project_id}`,
          image_name: `${iconName}`,
          image: `base64,${base64Icon}`
        })
      });
      const data = await response.json();
      console.log(data);
      console.log(result);
      if (result.updated == "Success" && data.status == "success") {
        router.push({
          pathname: '/explore/' + formData.project_id,
        });
      }
    }
    else {
      alert("Please fill the mandatory fields")
    }
  };

  return (
    <>
      <Head>
        <title>Submit Project</title>
        <meta name="keyword" content="Submit Project" />
      </Head>
      <Header />
      <Row className={styles.container}>
        <Row className={styles.submitdescription}>
          <div className={styles.submitheading}>Submit a chia project</div>
          <div className={styles.submitheadline}>Found a chia project you want everyone to know about? Made one yourself and want to share it with the community? You&#39;re in the right place.</div>
        </Row>
        <Row>
          <form onSubmit={handleSubmit} className={styles.formSubmit}>
            <label className={styles.projectForm}>
              <Row className={styles.projectName}>Project Name</Row>
              <Row > <input className={styles.projectInput}
                type="text"
                value={formData.project_id}
                placeholder="Your Project Name"
                onChange={(e) =>
                  setFormData({ ...formData, project_id: e.target.value })
                }
              /></Row>
            </label>
            {nextClicked && isEmpty(formData.project_id) && <span className={styles.errorMessage}>{errorMessage}project name</span>}
            <label className={styles.projectForm}>
              <Row className={styles.projectName}>Tagline</Row>
              <Row > <input className={styles.projectInput}
                type="text"
                value={formData.tagline}
                placeholder='A one sentence description of the project'
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
              /></Row>
            </label>
            {nextClicked && isEmpty(formData.tagline) && (
              <span className={styles.errorMessage}>
                {errorMessage}tagline
              </span>
            )}
            <Row className={styles.webCategory}>
              <Col>
                <label className={styles.projectForm}>
                  <Row className={styles.projectName}>Website Link</Row>
                  <input className={styles.projectInputWeb}
                    type="text"
                    value={formData.social.website}
                    placeholder='https://example.com'
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        social: { ...formData.social, website: e.target.value }
                      })
                    }
                  />
                </label>
                {nextClicked && isEmpty(formData.social.website) && (
                  <span className={styles.errorMessage}>
                    {errorMessage}website
                  </span>
                )}
              </Col>
              <Col>
                <label className={styles.projectForm}>
                  <Row className={styles.projectName}>Tag(Max. of 5 Tags)</Row>
                  <select onChange={handleTagChange} className={styles.projectWebInput}>
                    {tagsOptions.map((tag) => (
                      <option key={tag} value={tag} className={styles.webTag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                  {formData.tags.map((tag) => (
                    <span key={tag} className={styles.tagbox}>
                      <div className={styles.tags}> {tag}</div>
                      <button className={styles.tagRemoveButton} onClick={() => handleRemoveTag(tag)}>x</button>
                    </span>
                  ))}
                </label>
                {
                  nextClicked && formData.tags.length === 0 && (
                    <span className={styles.errorMessage}>
                      Choose any one tag
                    </span>
                  )}</Col>
            </Row>
            <label className={styles.projectForm}>
              <Row className={styles.projectName}>Description</Row>
              <Row > <input className={styles.projectDesInput}
                type="text"
                placeholder="A description of the Project"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              /></Row>
            </label>
            {nextClicked && isEmpty(formData.description) && (
              <span className={styles.errorMessage}>
                {errorMessage}description
              </span>
            )}
            <Row className={styles.uploadbox}>
              <Row className={styles.logohead}>
                <Row className={styles.yourlogo}>Your Logo</Row>
                <Row className={styles.logodes}>Let’s make sure people can find your project easily.</Row>
              </Row>
              <Col className={styles.iconAdd}>
                {iconUrl ? (
                  <img src={iconUrl} className={styles.Icon} alt="Uploaded Image" />
                ) : (
                  <img src="/empty-image.svg" className={styles.Icon} width={200} height={200} alt="Placeholder Image" />
                )}
                <Row className={styles.upload}>
                  <Row className={styles.logodes2}>Image file must be max 160x160px / at an aspect ratio of ~1:1, max 5MB.</Row>
                  <Row >
                    <label htmlFor="icon-upload">
                      <text className={styles.uploadbutton} > Upload Image</text>
                    </label><input type="file"
                      id="icon-upload" style={{ display: 'none' }} accept="image/*"
                      onChange={handleIconChange} /></Row>
                  {nextClicked && !iconName && (
                    <span className={styles.errorMessage}>
                      Upload Icon
                    </span>
                  )}
                </Row>
              </Col>
              <Row className={styles.screenshotbox}>
                <Row className={styles.screenshot}>
                  <text className={styles.screenshotheading}>Screenshots</text>
                  <text className={styles.screenshotdes}>Upload at lease one Image</text>
                </Row >
                <Row className={styles.uploadimage}>
                  <img src="/empty-image.svg" className={styles.Imagebox} alt="Upload Image" />
                  <Row className={styles.imagedes}>1270x760px or higher recommended, max. 5MB each. The first image will be used as preview.</Row>
                  <label htmlFor="image-upload">
                    <text className={styles.browsefile} > Browse File</text>
                  </label>
                </Row>
              </Row>
              <div className={styles.previewimagebox}>
                {images.map((image, index) => (
                  <div key={index}>
                    <div className={styles.xbutton} onClick={() => handleDeleteImage(index)}><img className={styles.xbuttonimg} src="/xbutton.svg" width={200} height={200} /> </div>
                    <img className={styles.imagepreview} src={image.preview} width={200} height={200} />
                  </div>
                ))}
                {images.length < 0 && (
                  <label htmlFor={`image-upload-${images.length}`} className={styles.addImageButton}>
                    <img className={styles.imagepreview} src="/plusbox.svg" width={200} height={200} />
                  </label>
                )}
                {[...Array(5 - images.length)].map((_, index) => (
                  <label htmlFor={`image-upload-${images.length + index}`} key={index} className={styles.addImageButton}>
                    {index === 0 ? <img className={styles.imagepreview} src="/plusbox.svg" width={200} height={200} /> : <img className={styles.imagepreview} src="/emptybox.svg" width={200} height={200} />}
                  </label>
                ))}
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    id={`image-upload-${index}`}
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                ))}
              </div>
            </Row>

            <Row className={styles.socialcontainer}>
              <Row className={styles.sociallinks}>Social Links</Row>
              <Row className={styles.inputbox}>
                <Row className={styles.label}>Twitter</Row>
                <Row>  <input className={styles.input} type="text" placeholder="https://twitter.com/Project" onChange={handleTwitterChange} /></Row>
              </Row>
              <Row className={styles.inputbox}>
                <Row className={styles.label}>Discord (Optional)</Row>
                <Row> <input className={styles.input} type="text" placeholder="https://discord.com/invite/Project" onChange={handleDiscordChange} /></Row>
              </Row>
              <Row onClick={handleAddSocialLink} className={styles.otherurl}>{!isSocialLinksOpen && (<>+ Add Other URL</>
              )}</Row>
              <Row>{isSocialLinksOpen && (
                <Row className={styles.linkbox}>
                  <Row className={styles.urlbox}>
                    <Row className={styles.label}  >Link Title</Row>
                    <Row ><input className={styles.urlinput}
                      type="text"
                      placeholder="github"
                      value={newSocialLink.title}
                      onChange={handleNewSocialLinkTitleChange}
                    /></Row>
                  </Row>
                  <Row className={styles.urlbox}>
                    <Row className={styles.label}  >URL</Row>
                    <Row >
                      <input className={styles.urlinput}
                        type="text"
                        placeholder="https://github.com/Project"
                        value={newSocialLink.url}
                        onChange={handleNewSocialLinkUrlChange}
                      /></Row>
                  </Row>
                  <Row className={styles.urlbuttonbox}>
                    <Row className={styles.urlbuttoncancel} onClick={handleCancelAddSocialLink}>Cancel</Row>
                    <Row className={styles.urlbuttonadd} onClick={handleSaveSocialLink}>Add link</Row>
                  </Row>
                </Row>
              )}</Row>
              {socialLinks.length > 0 && (
                <ul className={styles.inputlinks}>
                  {socialLinks.map((link, index) => (
                    <li key={index}>
                      {link.title}: {link.url}
                    </li>
                  ))}
                </ul>
              )}
              <Row className={styles.sociallinks}>Team DID Profile(Optional)</Row>
              <Row className={styles.inputbox}>
                <Row className={styles.label}>Team Did Profile</Row>
                <Row className={styles.addteam}>
                  <input type="text" className={styles.inputdid} value={newTeamName} placeholder='Enter did address ' onChange={handleTeamNameChange} />
                  <div className={styles.addteambutton} onClick={handleAddTeam}>+ Add Members</div></Row>
                <Row className={styles.teamlist}>
                  {formData.teams.map((team, index) => (
                    <Row key={index} className={styles.teamlistbox}>
                      {teamInfo && teamInfo[index] && (
                        <Row className={styles.teamdisplay}> <img src={teamInfo[index].profile_url} alt="profile" className={styles.profileimg}
                        /><Col className={styles.teamdetails}><p className={styles.teamhead}>{teamInfo[index].name}</p>
                            <p className={styles.teamtwitter}>@</p></Col></Row>
                      )}
                      <Row className={styles.remove} onClick={() => handleRemoveTeam(index)}>Remove</Row>
                    </Row>
                  ))}
                </Row>
              </Row>
            </Row>
            <Row className={styles.button}>
              <Link href="/"> <button type="button" onClick={handleCancel} className={styles.cancel}>
                Cancel
              </button></Link><button type="submit" disabled={isSubmitting} className={styles.nextImage}> 
              {isSubmitting ? <div class="spinner">
                <div class="dot1"></div>
                <div class="dot2"></div>
                <div class="dot3"></div>
              </div>
                : 'Submit'}</button>
            </Row>
          </form>
        </Row>
      </Row><Footer />
    </>
  );
}