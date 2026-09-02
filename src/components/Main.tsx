import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import profilePhoto from '../assets/images/1646230339245.jpg';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profilePhoto} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/yorsh-cordova" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/jorge-cordova-zamora-0266b067/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Jorge Cordova</h1>
          <p>SRE </p>

          <div className="mobile_social_icons">
            <a href="https://github.com/yorsh-cordova" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/jorge-cordova-zamora-0266b067/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;