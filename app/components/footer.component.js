import React from 'react';

class Footer extends React.Component {
  render() {
    return(
      <div className='footer'>
        <p>Love from<img src='public/img/logo.png' className='logo'></img></p>
        &
        <img src='public/img/soundcloud.png' className='soundcloud'></img>
      </div>
    )
  }

}

export default Footer
