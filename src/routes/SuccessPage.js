import React from 'react';
import Image from 'react-bootstrap/Image'

export default class SuccessPage extends React.Component {
  render() {
    return (
      <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', flexDirection: 'column', marginTop: "3rem"}} className="App">
        <Image style={{height: '200px'}} src="https://cdn.pixabay.com/photo/2013/07/13/10/27/hand-157251_1280.png" />
        <span style={{fontWeight: "bold", color: "black", fontSize: "2rem", marginTop: "3rem"}}>Your Cloud Storage Order Process Has Been Successfully Completed</span>
      </div>
    );
  }
}