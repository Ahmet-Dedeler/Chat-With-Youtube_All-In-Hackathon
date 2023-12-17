import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Assuming you have installed the 'react-icons' library

const Header = () => {
  const goToGitHub = () => {
    window.location.href = 'https://github.com/arhaamwanii/Talk-to-Youtube-Video'; // Replace with your GitHub repository URL
  };

  return (
    <div  style={headerStyle}className='text-green-500'>
      <div style={leftSideStyle}>
        <img src="youtubegreenlogo.png" style={image} alt="logo for youtube but it is green" />
        <span style={text}> Chat with YT </span>
      </div>
      <div>
        MLH <span style={{color: 'white'}}> - Open Source Hackathon</span> 
      </div>
      <div style={rightSideStyle} onClick={goToGitHub}>
        <span style={sourceCodeStyle}>Source Code → </span>
        <FaGithub size={24} />
      </div>
    </div>
  );
};

// Styling for the header and its components
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  background: '#333',
  color: '',
  borderRadius: '7px'
};

const leftSideStyle = {
  fontWeight: 'bold',
  display: 'flex',
  alignitems: 'center',
  justifyContent: 'center',
  gap: '10px'
};
const image = {
  height : '35px'
}
const text = {
  marginTop : '5px'
}

const rightSideStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  color: 'white'
};

const sourceCodeStyle = {
  marginRight: '8px',
};

export default Header;
