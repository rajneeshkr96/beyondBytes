import React from 'react'

const FooterNav = () => {
    return (
        <div className="main">
            <div>
                <center>
                    <h1>Bottom Navigation Bar</h1>
                </center>
            </div>
            <div className="bottom-nav">
                <div className="nav-slot bg-white round-top-left">
                    <a
                        href="https://wa.me/6285804233884"
                        target="_blank"
                        className="nav-link"
                        style={{ color: "#075e54" }}
                    >
                        <i className="fa-brands fa-whatsapp" />
                    </a>
                </div>
                <div className="nav-slot bg-white">
                    <a
                        href="#features"
                        target="_blank"
                        className="nav-link"
                        style={{ color: "#964d4d" }}
                    >
                        <i className="fa-solid fa-list-tree" />
                    </a>
                </div>
                <div className="nav-slot curve">
                    <a
                        href="tel:+62858-0423-3884"
                        target="_blank"
                        role="button"
                        className="floating-button"
                    >
                        <i className="fa-duotone fa-phone" />
                    </a>
                </div>
                <div className="nav-slot bg-white">
                    <a
                        href="#testimoni"
                        className="nav-link"
                        title="Testimoni"
                        style={{ color: "#4b5da1" }}
                    >
                        <i className="fa-duotone fa-comments" />
                    </a>
                </div>
                <div className="nav-slot bg-white round-top-right">
                    <a
                        href="https://maps.app.goo.gl/RMJ3kXzhUH6YKXrt7"
                        target="_blank"
                        className="nav-link"
                        title="Lokasi pada peta"
                        style={{ color: "#4a80f5" }}
                    >
                        <i className="fa-duotone fa-map-location-dot" />
                    </a>
                </div>
            </div>
        </div>

    )
}

export default FooterNav
