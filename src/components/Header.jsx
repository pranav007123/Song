import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <>
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://w7.pngwing.com/pngs/687/570/png-transparent-song-music-music-producer-so-long-others.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Songs
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header