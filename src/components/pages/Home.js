import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

export default function Home() {
  console.log("test home: ", process.env.DICTIONARY_API_KEY);
  return (
    <div className="home-container">
      <section className="top-background">
        <header>
          <div className="organization-name">
            <a href="#">Catagraph</a>
          </div>

          <div className="nav-links">
            <div className="nav-link">
              <NavLink to="/about">About</NavLink>
            </div>
            <div className="news nav-link">
              <NavLink to="/editor">Editor</NavLink>
            </div>
            <div className="readme nav-link">
              <NavLink to="/groups">Groups</NavLink>
            </div>
          </div>
        </header>

        <section className="headline">
          <div className="headline-a">YOUR STORY</div>
          <h1 className="headline-b">is waiting for you.</h1>
          <div className="cta-btn nav-link">
            <NavLink to="/about">Learn More</NavLink>
          </div>
        </section>
      </section>

      <section className="hero-section">
        <h1 className="hero-headline">
          A place with tools for drafting and focus
        </h1>
        <p className="hero-body">
          It can be difficult to get going on an idea, and difficult to connect
          with others who share your goal. Get started, and build your story one
          step at a time. Using the editing tools and the group pages, you can
          write as much or as little as you want, as often as you like. Then,
          share your work with others in fragments, or build your fragments into
          larger sections.
        </p>
      </section>

      <section className="grid-items">
        <div className="grid-item">
          <img
            className="grid-image"
            src="https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8am91cm5hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <div className="grid-text">
            <h2 className="grid-text-title">Editor</h2>
            <p className="grid-text-body">
              Simple, with common wrting tools in one place so you can focus.
            </p>
            <div className="cta-btn nav-link">
              <NavLink to="/about">Learn More</NavLink>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className="grid-text">
            <h2 className="grid-text-title">Groups</h2>
            <p className="grid-text-body">
              Start a group, to share and improve your work. Writing is best
              when it's shared.
            </p>
            <div className="cta-btn nav-link">
              <NavLink to="/about">Learn More</NavLink>
            </div>
          </div>
          <img
            className="grid-image"
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9vayUyMGdyb3VwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
      </section>
      {/* <section className="signup-section">
        <h1 className="signup-headline">Subscribe</h1>
        <p className="signup-body">
          Sign up with your email address to receive news and updates.
        </p>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="email-input form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <div className="cta-btn nav-link">
            <a href="#">Subscribe!</a>
          </div>
        </div>
      </section> */}

      <footer>
        <div className="contact">
          123 Some Street, New York NY | (555) 555-5555 | email@email.com
        </div>
        <div className="social-links">
          <a className="social-link" href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a className="social-link" href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a className="social-link" href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
        <p>© 2022 Cartagraph</p>
      </footer>
    </div>
  );
}
