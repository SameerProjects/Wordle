import React, { Component } from 'react';

class Header extends Component {


    render() {
       return (
        <div>
        <div style={{fontSize:'50px'}}>WORDLE<br/></div>
        <div style={{color:'red'}}>{this.props.headerMessage}</div>
        </div>
       )


    }

}

export default Header;