import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import './NavBar.css'

class NavBar extends Component {
<<<<<<< HEAD
    render() {
        return (
            <div className='nav_container'>
                <div className="nav_container_left">
                    <Link className="nav_container_left_logo_button" to="/"><h1>Quizzer</h1></Link>
                    <Button className="nav_container_left_createquiz_button">
                        <span className="createquiz_button_plussign">&#x2795;</span>
                        <span className="createquiz_button_text">Create Quiz</span>
                    </Button>
                </div>
                <div className="nav_container_right">
                    <Button className="nav_container_right_login_button">Log in</Button>
                    <Button className="nav_container_right_signup_button" color="info">Sign up</Button>
                </div>
            </div>
        )
    }
=======
  render () {
    return (
      <div className='nav-container'>
        <div className='home-group'>
          <Link className='home-button' to='/'><h1>Quizzer</h1></Link>
          <Button className='create-quiz'>
            <span className='plus' role='img' aria-label='Create Quiz'>&#x2795;</span>
            <span className='text'>Create Quiz</span>
          </Button>
        </div>
        <div className='button-group'>
          <Button className='login'>Log in</Button>
          <Button className='signup' color='info'>Sign up</Button>
        </div>
      </div>
    )
  }
>>>>>>> e9b2305907eb6f4a0b9df9fe6b880c666e97c2c8
}

export default NavBar
