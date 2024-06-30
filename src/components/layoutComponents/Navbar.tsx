import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="nav">
        <div className="menu-btn">
          <p>menu</p>
        </div>
        <div className="logo">
          <a href="#">BiyondBytes</a>
        </div>
        <div className="local-time">
          <p>12:00</p>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
