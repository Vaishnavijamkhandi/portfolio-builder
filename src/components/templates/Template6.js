// src/components/templates/Template6.js
import React, { useState, useEffect } from "react";
import "./TemplateStyle.css";
import emailjs from '@emailjs/browser';
import { 
  FaMusic, FaPlay, FaPause, FaVolumeUp, FaHeadphones,
  FaSpotify, FaSoundcloud, FaYoutube, FaInstagram,
  FaTwitter, FaFacebook, FaCalendarAlt, FaMapMarkerAlt,
  FaMicrophone, FaDrum, FaGuitar, FaRecordVinyl
} from 'react-icons/fa';

const Template6 = () => {
  // Load user data
  const [userData, setUserData] = useState(null);
  const [contactForm, setContactForm] = useState({ 
    name: '', 
    email: '', 
    message: '',
    eventType: '',
    budget: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.templateId === 6 || data.templateId === undefined) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailjsConfig = userData?.emailjs || {};
    
    if (emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.userId) {
      emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
          event_type: contactForm.eventType,
          budget: contactForm.budget,
          to_email: emailjsConfig.contactEmail || userData?.email
        },
        emailjsConfig.userId
      )
      .then(() => alert('Booking inquiry sent successfully!'))
      .catch(() => alert('Failed to send message.'));
    } else {
      alert(`Booking inquiry would be sent to: ${emailjsConfig.contactEmail || userData?.email || 'your email'}`);
    }
    
    setContactForm({ name: '', email: '', message: '', eventType: '', budget: '' });
  };

  // Use user data or defaults
  const data = userData || {
    artistName: 'DJ Nova Wave',
    tagline: 'Electronic Music Producer & Sound Designer',
    email: 'nova@electronicbeats.com',
    phone: '+49 123 456 789',
    location: 'Berlin, Germany',
    bio: 'Electronic music producer and sound designer crafting immersive sonic experiences.',
    stats: { followers: '50K+', tracks: '200+', streams: '5M+' },
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    youtube: 'https://youtube.com',
    tracks: [
      {
        title: 'Midnight Drive',
        genre: 'Melodic Techno',
        duration: '6:24',
        plays: '250K+',
        link: '#',
        featured: true
      }
    ],
    performances: [
      {
        venue: 'Berghain, Berlin',
        date: 'June 15, 2024',
        type: 'Club Night',
        featured: true
      }
    ],
    genres: ['Melodic Techno', 'Ambient', 'Deep House']
  };

  const [playingTrack, setPlayingTrack] = useState(null);

  return (
    <div className="template6">
      {/* Navigation */}
      <nav className="music-nav">
        <div className="nav-brand">
          <FaMusic className="brand-icon" />
          <span className="brand-name">{data.artistName?.toUpperCase() || 'ARTIST'}</span>
        </div>
        <div className="nav-links">
          <a href="#music">MUSIC</a>
          <a href="#performances">SHOWS</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
        <button className="nav-booking">BOOK NOW</button>
      </nav>

      {/* Hero with Visualizer */}
      <section className="music-hero">
        <div className="hero-bg">
          <div className="audio-visualizer">
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} className="visualizer-bar"></div>
            ))}
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-text">{data.artistName}</span>
            <br />
            <span className="hero-subtext">{data.tagline}</span>
          </h1>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">{data.stats?.followers || '50K+'}</div>
              <div className="stat-label">FOLLOWERS</div>
            </div>
            <div className="stat">
              <div className="stat-number">{data.stats?.tracks || '200+'}</div>
              <div className="stat-label">TRACKS</div>
            </div>
            <div className="stat">
              <div className="stat-number">{data.stats?.streams || '5M+'}</div>
              <div className="stat-label">STREAMS</div>
            </div>
          </div>
          <div className="hero-platforms">
            {data.spotify && (
              <a href={data.spotify} className="platform-btn">
                <FaSpotify /> Spotify
              </a>
            )}
            {data.soundcloud && (
              <a href={data.soundcloud} className="platform-btn">
                <FaSoundcloud /> SoundCloud
              </a>
            )}
            {data.youtube && (
              <a href={data.youtube} className="platform-btn">
                <FaYoutube /> YouTube
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      <section id="music" className="tracks-section">
        <div className="container">
          <h2 className="section-title">FEATURED TRACKS</h2>
          <div className="tracks-grid">
            {data.tracks?.map((track, index) => (
              <div key={index} className={`track-card ${track.featured ? 'featured' : ''}`}>
                <div className="track-info">
                  <div className="track-header">
                    <button 
                      className="play-btn"
                      onClick={() => setPlayingTrack(playingTrack === index ? null : index)}
                    >
                      {playingTrack === index ? <FaPause /> : <FaPlay />}
                    </button>
                    <div>
                      <h3>{track.title}</h3>
                      <p className="track-genre">{track.genre}</p>
                    </div>
                  </div>
                  <div className="track-meta">
                    <span className="duration">{track.duration}</span>
                    <span className="plays">{track.plays} plays</span>
                  </div>
                </div>
                <div className="track-wave">
                  <div className="wave-container">
                    {Array.from({length: 60}).map((_, i) => (
                      <div key={i} className="wave-bar"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Shows */}
      <section id="performances" className="shows-section">
        <div className="container">
          <h2 className="section-title">UPCOMING SHOWS</h2>
          <div className="shows-list">
            {data.performances?.map((show, index) => (
              <div key={index} className={`show-card ${show.featured ? 'featured' : ''}`}>
                <div className="show-date">
                  <FaCalendarAlt />
                  <span>{show.date}</span>
                </div>
                <div className="show-info">
                  <h3>{show.venue}</h3>
                  <p className="show-type">{show.type}</p>
                </div>
                <button className="ticket-btn">GET TICKETS</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">ABOUT THE ARTIST</h2>
          <div className="about-content">
            <p className="artist-bio">{data.bio}</p>
            <div className="artist-genres">
              <h3>GENRES</h3>
              <div className="genres-list">
                {data.genres?.map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Booking */}
      <section id="contact" className="booking-section">
        <div className="container">
          <h2 className="section-title">BOOKING & CONTACT</h2>
          <div className="booking-grid">
            <div className="contact-info">
              <h3>For Bookings & Inquiries</h3>
              <div className="contact-details">
                <div className="detail">
                  <FaHeadphones />
                  <div>
                    <strong>Management</strong>
                    <p>{data.artistName || 'Artist Name'}</p>
                  </div>
                </div>
                <div className="detail">
                  <FaMicrophone />
                  <div>
                    <strong>Email</strong>
                    <p>{data.email}</p>
                  </div>
                </div>
                <div className="detail">
                  <FaMapMarkerAlt />
                  <div>
                    <strong>Based In</strong>
                    <p>{data.location}</p>
                  </div>
                </div>
              </div>
              <div className="social-links">
                {data.instagram && (
                  <a href={data.instagram} className="social-link">
                    <FaInstagram />
                  </a>
                )}
                {data.twitter && (
                  <a href={data.twitter} className="social-link">
                    <FaTwitter />
                  </a>
                )}
                {data.facebook && (
                  <a href={data.facebook} className="social-link">
                    <FaFacebook />
                  </a>
                )}
              </div>
            </div>
            
            <form className="booking-form" onSubmit={handleSubmit}>
              <h3>Send Booking Request</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <select 
                  value={contactForm.eventType}
                  onChange={(e) => setContactForm({...contactForm, eventType: e.target.value})}
                  required
                >
                  <option value="">Event Type</option>
                  <option value="Club Night">Club Night</option>
                  <option value="Festival">Festival</option>
                  <option value="Private Event">Private Event</option>
                  <option value="Radio Show">Radio Show</option>
                </select>
              </div>
              <div className="form-group">
                <select 
                  value={contactForm.budget}
                  onChange={(e) => setContactForm({...contactForm, budget: e.target.value})}
                  required
                >
                  <option value="">Budget Range</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $20,000">$5,000 - $20,000</option>
                  <option value="$20,000+">$20,000+</option>
                </select>
              </div>
              <div className="form-group">
                <textarea 
                  placeholder="Tell us about your event..." 
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                SEND REQUEST
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="music-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <FaMusic className="footer-icon" />
              <div>
                <h4>{data.artistName}</h4>
                <p>Music Producer & DJ</p>
              </div>
            </div>
            <div className="footer-links">
              <p>&copy; {new Date().getFullYear()} {data.artistName}. All music rights reserved.</p>
              <p>All tracks available on major streaming platforms</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Template6;