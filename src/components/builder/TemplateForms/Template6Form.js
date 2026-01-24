import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMagic, FaSpinner, FaMusic, FaVideo, FaMicrophone, 
  FaCamera, FaPlay, FaSpotify, FaSoundcloud, FaYoutube,
  FaInstagram, FaTwitter, FaFacebook, FaHeadphones, FaMixcloud,
  FaDrum, FaGuitar, FaVolumeUp, FaRecordVinyl, FaWaveSquare,FaPhone
} from 'react-icons/fa';
import { improveWithAI } from '../../../utils/aiHelper';
import BackButton from '../../common/BackButton';
import EmailJSSetup from '../../common/EmailJSSetup';
import './TemplateForms.css';
import DeploymentService from '../../../utils/deploymentService';

const Template6Form = () => {
  const navigate = useNavigate();
  const [aiLoading, setAiLoading] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Artist/Musician Info
    artistName: 'DJ Nova Wave',
    tagline: 'Electronic Music Producer & Sound Designer',
    specialty: 'Melodic Techno & Ambient Soundscapes',
    location: 'Berlin, Germany',
    email: 'nova@electronicbeats.com',
    phone: '+49 123 456 789',
    bio: `Electronic music producer and sound designer crafting immersive 
          sonic experiences through melodic techno and ambient soundscapes.`,
    
    // Artist Social Links
    spotify: 'https://spotify.com',
    soundcloud: 'https://soundcloud.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    mixcloud: 'https://mixcloud.com',
    
    // Artist Stats
    stats: {
      followers: '50K+',
      tracks: '200+',
      streams: '5M+'
    },
    
    // Featured Tracks
    tracks: [
      {
        title: 'Midnight Drive',
        genre: 'Melodic Techno',
        duration: '6:24',
        bpm: 124,
        key: 'A Minor',
        plays: '250K+',
        link: '#',
        featured: true
      },
      {
        title: 'Starlight Echoes',
        genre: 'Ambient',
        duration: '8:12',
        bpm: 90,
        key: 'C Major',
        plays: '180K+',
        link: '#'
      }
    ],
    
    // Albums/EPs
    albums: [
      {
        title: 'Neon Dreams',
        type: 'EP',
        year: '2023',
        tracks: 5,
        platforms: ['Spotify', 'Apple Music', 'Bandcamp'],
        link: '#',
        coverColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }
    ],
    
    // Live Performances
    performances: [
      {
        venue: 'Berghain, Berlin',
        date: 'June 15, 2024',
        type: 'Club Night',
        setTime: '4 Hours',
        lineup: ['DJ Nova Wave', 'Techno Titans'],
        featured: true
      },
      {
        venue: 'Fabric, London',
        date: 'May 20, 2024',
        type: 'Festival',
        setTime: '3 Hours',
        lineup: ['Various Artists']
      }
    ],
    
    // Equipment & Software
    equipment: {
      hardware: ['Pioneer DJM-900NXS2', 'CDJ-3000', 'Moog Subsequent 37', 'Roland TR-8S'],
      software: ['Ableton Live 11', 'Serato DJ Pro', 'Native Instruments', 'Splice'],
      controllers: ['Pioneer DDJ-1000', 'Native Instruments Maschine']
    },
    
    // Genres
    genres: ['Melodic Techno', 'Ambient', 'Deep House', 'Progressive'],
    
    // Services
    services: [
      {
        title: 'Music Production',
        icon: 'music',
        description: 'Custom tracks, sound design, mixing & mastering',
        price: 'Starting at $500'
      },
      {
        title: 'DJ Sets',
        icon: 'headphones',
        description: 'Live performances, club nights, private events',
        price: 'Starting at $1000'
      },
      {
        title: 'Sound Design',
        icon: 'wave',
        description: 'Custom soundscapes, audio branding, foley',
        price: 'Starting at $300'
      }
    ],
    
    // Collaborations
    collaborations: [
      {
        artist: 'Techno Titans',
        project: 'Neon Dreams Remix EP',
        year: '2023',
        link: '#'
      }
    ],
    
    // Upcoming Events
    events: [
      {
        date: '2024-08-15',
        venue: 'Amsterdam Dance Event',
        location: 'Amsterdam, NL',
        type: 'Conference & Performance'
      }
    ],
    
    // Press & Recognition
    press: [
      {
        source: 'Mixmag',
        quote: 'DJ Nova Wave creates immersive soundscapes that transport listeners.',
        date: 'May 2024'
      }
    ],
    
    // EmailJS Configuration
    emailjs: {
      serviceId: '',
      templateId: '',
      userId: '',
      contactEmail: 'nova@electronicbeats.com'
    },
    
    // Booking Form Fields
    bookingFields: [
      'Event Type',
      'Date & Time',
      'Venue Size',
      'Budget Range',
      'Special Requests'
    ],
    
    // Deployment
    deployment: {
      platform: 'vercel',
      customDomain: '',
      username: 'djnova'
    }
  });

  // AI Improvement for Artist content
  const handleAIImprovement = async (field, index = null) => {
    setAiLoading({ [field]: true });
    
    try {
      let improvedText;
      const context = `Music Artist portfolio, specializing in ${formData.specialty}`;
      
      if (index !== null) {
        if (field === 'tracks') {
          improvedText = await improveWithAI('musicProject', formData.tracks[index].title, 6, {
            name: formData.artistName,
            title: formData.tagline
          });
          
          const newTracks = [...formData.tracks];
          newTracks[index].title = improvedText;
          setFormData({...formData, tracks: newTracks});
        }
        else if (field === 'bio') {
          improvedText = await improveWithAI('artistBio', formData.bio, 6, {
            name: formData.artistName,
            genre: formData.genres[0]
          });
          setFormData({...formData, bio: improvedText});
        }
      } else {
        improvedText = await improveWithAI(field, formData[field], 6, {
          name: formData.artistName,
          title: formData.tagline
        });
        setFormData({...formData, [field]: improvedText});
      }
      
      document.getElementById('ai-success').style.display = 'block';
      setTimeout(() => {
        document.getElementById('ai-success').style.display = 'none';
      }, 3000);
    } catch (error) {
      console.error('AI improvement failed:', error);
    } finally {
      setAiLoading({ [field]: false });
    }
  };

  // Add Track
  const addTrack = () => {
    setFormData(prev => ({
      ...prev,
      tracks: [...prev.tracks, {
        title: 'New Track',
        genre: 'Genre',
        duration: '0:00',
        bpm: 120,
        key: 'C Major',
        plays: '0',
        link: '#'
      }]
    }));
  };

  // Add Performance
  const addPerformance = () => {
    setFormData(prev => ({
      ...prev,
      performances: [...prev.performances, {
        venue: 'New Venue',
        date: '2024-01-01',
        type: 'Performance',
        setTime: '1 Hour',
        lineup: ['Artist']
      }]
    }));
  };

  // Add Service
  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, {
        title: 'New Service',
        icon: 'music',
        description: 'Service description',
        price: 'Starting at $0'
      }]
    }));
  };

	// Remove track
const removeTrack = (index) => {
  if (formData.tracks.length <= 1) {
    alert('You need at least one track');
    return;
  }
  
  if (window.confirm('Delete this track?')) {
    const newTracks = [...formData.tracks];
    newTracks.splice(index, 1);
    setFormData({...formData, tracks: newTracks});
  }
};

// Remove performance
const removePerformance = (index) => {
  if (formData.performances.length <= 1) {
    alert('You need at least one performance');
    return;
  }
  
  if (window.confirm('Delete this performance?')) {
    const newPerfs = [...formData.performances];
    newPerfs.splice(index, 1);
    setFormData({...formData, performances: newPerfs});
  }
};

// Remove service
const removeService = (index) => {
  if (formData.services.length <= 1) {
    alert('You need at least one service');
    return;
  }
  
  if (window.confirm('Delete this service?')) {
    const newServices = [...formData.services];
    newServices.splice(index, 1);
    setFormData({...formData, services: newServices});
  }
};

  // Generate Portfolio - UPDATED VERSION
  const generatePortfolio = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data matching template structure
      const portfolioData = {
        ...formData,
        templateId: 6,
        createdAt: new Date().toISOString(),
        // Ensure all required fields are present
        name: formData.artistName,
        title: formData.tagline
      };
      
      localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
      
      // Navigate to deployment guide instead
      navigate('/deploy-guide');
      
    } catch (error) {
      console.error('Error preparing portfolio:', error);
      alert('Error preparing portfolio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="template-form template6-form">
      <BackButton text="← Back to Preview" />
      
      <div className="form-header">
        <h1><FaMusic /> Music Artist Portfolio Setup</h1>
        <p>Showcase your music, performances, and artistic journey</p>
      </div>

      <div id="ai-success" className="ai-success-message">
        ✨ Music content improved with AI!
      </div>

      {/* ARTIST PROFILE */}
      <div className="form-section">
        <h2><FaMusic /> Artist Profile</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Artist Name *</label>
            <input
              type="text"
              value={formData.artistName}
              onChange={(e) => setFormData({...formData, artistName: e.target.value})}
              placeholder="DJ Nova Wave"
            />
          </div>
          
          <div className="form-group">
            <label>Artist Tagline *</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              placeholder="Electronic Music Producer & Sound Designer"
            />
          </div>
          
          <div className="form-group">
            <label>Music Specialty</label>
            <input
              type="text"
              value={formData.specialty}
              onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              placeholder="Melodic Techno & Ambient Soundscapes"
            />
          </div>
          
          <div className="form-group full-width">
            <label>
              Artist Bio *
              <button 
                type="button"
                className="ai-improve-btn"
                onClick={() => handleAIImprovement('bio')}
                disabled={aiLoading.bio}
              >
                {aiLoading.bio ? <FaSpinner className="spinner" /> : <FaMagic />}
                Improve with AI
              </button>
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              placeholder="Describe your music style, influences, and artistic journey..."
            />
          </div>
        </div>
      </div>

      {/* ARTIST STATS */}
      <div className="form-section">
        <h2><FaVolumeUp /> Artist Statistics</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Followers</label>
            <input
              type="text"
              value={formData.stats.followers}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, followers: e.target.value}
              })}
              placeholder="50K+"
            />
          </div>
          
          <div className="form-group">
            <label>Total Tracks</label>
            <input
              type="text"
              value={formData.stats.tracks}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, tracks: e.target.value}
              })}
              placeholder="200+"
            />
          </div>
          
          <div className="form-group">
            <label>Total Streams</label>
            <input
              type="text"
              value={formData.stats.streams}
              onChange={(e) => setFormData({
                ...formData, 
                stats: {...formData.stats, streams: e.target.value}
              })}
              placeholder="5M+"
            />
          </div>
        </div>
      </div>

      {/* SOCIAL LINKS */}
      <div className="form-section">
        <h2><FaHeadphones /> Music Platforms</h2>
        <div className="form-grid">
          <div className="form-group">
            <label><FaSpotify /> Spotify</label>
            <input
              type="url"
              value={formData.spotify}
              onChange={(e) => setFormData({...formData, spotify: e.target.value})}
              placeholder="https://spotify.com/artist"
            />
          </div>
          
          <div className="form-group">
            <label><FaSoundcloud /> SoundCloud</label>
            <input
              type="url"
              value={formData.soundcloud}
              onChange={(e) => setFormData({...formData, soundcloud: e.target.value})}
              placeholder="https://soundcloud.com"
            />
          </div>
          
          <div className="form-group">
            <label><FaYoutube /> YouTube</label>
            <input
              type="url"
              value={formData.youtube}
              onChange={(e) => setFormData({...formData, youtube: e.target.value})}
              placeholder="https://youtube.com/channel"
            />
          </div>
          
          <div className="form-group">
            <label><FaMixcloud /> Mixcloud</label>
            <input
              type="url"
              value={formData.mixcloud}
              onChange={(e) => setFormData({...formData, mixcloud: e.target.value})}
              placeholder="https://mixcloud.com"
            />
          </div>
          
          <div className="form-group">
            <label><FaInstagram /> Instagram</label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              placeholder="https://instagram.com"
            />
          </div>
          
          <div className="form-group">
            <label><FaTwitter /> Twitter</label>
            <input
              type="url"
              value={formData.twitter}
              onChange={(e) => setFormData({...formData, twitter: e.target.value})}
              placeholder="https://twitter.com"
            />
          </div>
        </div>
      </div>

      {/* FEATURED TRACKS */}
      <div className="form-section">
        <h2><FaPlay /> Featured Tracks</h2>
        
      {formData.tracks.map((track, index) => (
  <div key={index} className="track-form">
    <div className="card-header">
      <h3>Track {index + 1}</h3>
      <button 
        type="button"
        className="remove-btn"
        onClick={() => removeTrack(index)}
        disabled={formData.tracks.length <= 1}
      >
        🗑️ Remove
      </button>
    </div>
    
    <div className="form-grid">
      <div className="form-group">
        <label>
          Track Title *
          <button 
            type="button"
            className="ai-improve-btn"
            onClick={() => handleAIImprovement('tracks', index)}
            disabled={aiLoading.tracks}
          >
            {aiLoading.tracks ? <FaSpinner className="spinner" /> : <FaMagic />}
            Improve with AI
          </button>
        </label>
        <input
          type="text"
          value={track.title}
          onChange={(e) => {
            const newTracks = [...formData.tracks];
            newTracks[index].title = e.target.value;
            setFormData({...formData, tracks: newTracks});
          }}
          placeholder="Midnight Drive"
        />
      </div>
      
      <div className="form-group">
        <label>Genre</label>
        <input
          type="text"
          value={track.genre}
          onChange={(e) => {
            const newTracks = [...formData.tracks];
            newTracks[index].genre = e.target.value;
            setFormData({...formData, tracks: newTracks});
          }}
          placeholder="Melodic Techno"
        />
      </div>
      
      <div className="form-group">
        <label>Duration</label>
        <input
          type="text"
          value={track.duration}
          onChange={(e) => {
            const newTracks = [...formData.tracks];
            newTracks[index].duration = e.target.value;
            setFormData({...formData, tracks: newTracks});
          }}
          placeholder="6:24"
        />
      </div>
      
      <div className="form-group">
        <label>BPM</label>
        <input
          type="number"
          value={track.bpm}
          onChange={(e) => {
            const newTracks = [...formData.tracks];
            newTracks[index].bpm = parseInt(e.target.value) || 120;
            setFormData({...formData, tracks: newTracks});
          }}
          placeholder="124"
        />
      </div>
      
      <div className="form-group">
        <label>Key</label>
        <select
          value={track.key}
          onChange={(e) => {
            const newTracks = [...formData.tracks];
            newTracks[index].key = e.target.value;
            setFormData({...formData, tracks: newTracks});
          }}
        >
          <option value="C Major">C Major</option>
          <option value="A Minor">A Minor</option>
          <option value="G Major">G Major</option>
          <option value="E Minor">E Minor</option>
          <option value="D Major">D Major</option>
          <option value="B Minor">B Minor</option>
          <option value="F Major">F Major</option>
          <option value="D Minor">D Minor</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Plays/Streams</label>
        <input
          type="text"
          value={track.plays}
          onChange={(e) => {
            const newTracks = [...formData.tracks];
            newTracks[index].plays = e.target.value;
            setFormData({...formData, tracks: newTracks});
          }}
          placeholder="250K+"
        />
      </div>
      
      <div className="form-group">
        <label>Track Link</label>
        <input
          type="url"
          value={track.link}
          onChange={(e) => {
            const newTracks = [...formData.tracks];
            newTracks[index].link = e.target.value;
            setFormData({...formData, tracks: newTracks});
          }}
          placeholder="https://link-to-track.com"
        />
      </div>
      
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={track.featured}
            onChange={(e) => {
              const newTracks = [...formData.tracks];
              newTracks[index].featured = e.target.checked;
              setFormData({...formData, tracks: newTracks});
            }}
          />
          Featured Track
        </label>
      </div>
    </div>
  </div>
))}
        
        <button className="add-bullet-btn" onClick={addTrack}>
          <FaMusic /> Add Another Track
        </button>
      </div>

      {/* ALBUMS & EPS */}
      <div className="form-section">
        <h2><FaRecordVinyl /> Albums & EPs</h2>
        
        {formData.albums.map((album, index) => (
          <div key={index} className="album-form">
            <h3>Album/EP {index + 1}</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={album.title}
                  onChange={(e) => {
                    const newAlbums = [...formData.albums];
                    newAlbums[index].title = e.target.value;
                    setFormData({...formData, albums: newAlbums});
                  }}
                  placeholder="Neon Dreams"
                />
              </div>
              
              <div className="form-group">
                <label>Type</label>
                <select
                  value={album.type}
                  onChange={(e) => {
                    const newAlbums = [...formData.albums];
                    newAlbums[index].type = e.target.value;
                    setFormData({...formData, albums: newAlbums});
                  }}
                >
                  <option value="EP">EP</option>
                  <option value="Album">Album</option>
                  <option value="Single">Single</option>
                  <option value="Mixtape">Mixtape</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Release Year</label>
                <input
                  type="text"
                  value={album.year}
                  onChange={(e) => {
                    const newAlbums = [...formData.albums];
                    newAlbums[index].year = e.target.value;
                    setFormData({...formData, albums: newAlbums});
                  }}
                  placeholder="2023"
                />
              </div>
              
              <div className="form-group">
                <label>Number of Tracks</label>
                <input
                  type="number"
                  value={album.tracks}
                  onChange={(e) => {
                    const newAlbums = [...formData.albums];
                    newAlbums[index].tracks = parseInt(e.target.value) || 1;
                    setFormData({...formData, albums: newAlbums});
                  }}
                  placeholder="5"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Available Platforms (comma separated)</label>
                <input
                  type="text"
                  value={album.platforms.join(', ')}
                  onChange={(e) => {
                    const newAlbums = [...formData.albums];
                    newAlbums[index].platforms = e.target.value.split(',').map(p => p.trim());
                    setFormData({...formData, albums: newAlbums});
                  }}
                  placeholder="Spotify, Apple Music, Bandcamp"
                />
              </div>
              
              <div className="form-group">
                <label>Album Link</label>
                <input
                  type="url"
                  value={album.link}
                  onChange={(e) => {
                    const newAlbums = [...formData.albums];
                    newAlbums[index].link = e.target.value;
                    setFormData({...formData, albums: newAlbums});
                  }}
                  placeholder="https://link-to-album.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIVE PERFORMANCES */}
      <div className="form-section">
        <h2><FaMicrophone /> Live Performances</h2>
        
       {formData.performances.map((performance, index) => (
  <div key={index} className="performance-form">
    <div className="card-header">
      <h3>Performance {index + 1}</h3>
      <button 
        type="button"
        className="remove-btn"
        onClick={() => removePerformance(index)}
        disabled={formData.performances.length <= 1}
      >
        🗑️ Remove
      </button>
    </div>
    
    <div className="form-grid">
      <div className="form-group">
        <label>Venue *</label>
        <input
          type="text"
          value={performance.venue}
          onChange={(e) => {
            const newPerfs = [...formData.performances];
            newPerfs[index].venue = e.target.value;
            setFormData({...formData, performances: newPerfs});
          }}
          placeholder="Berghain, Berlin"
        />
      </div>
      
      <div className="form-group">
        <label>Date</label>
        <input
          type="text"
          value={performance.date}
          onChange={(e) => {
            const newPerfs = [...formData.performances];
            newPerfs[index].date = e.target.value;
            setFormData({...formData, performances: newPerfs});
          }}
          placeholder="June 15, 2024"
        />
      </div>
      
      <div className="form-group">
        <label>Type</label>
        <select
          value={performance.type}
          onChange={(e) => {
            const newPerfs = [...formData.performances];
            newPerfs[index].type = e.target.value;
            setFormData({...formData, performances: newPerfs});
          }}
        >
          <option value="Club Night">Club Night</option>
          <option value="Festival">Festival</option>
          <option value="Concert">Concert</option>
          <option value="Private Event">Private Event</option>
          <option value="Radio Show">Radio Show</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Set Duration</label>
        <input
          type="text"
          value={performance.setTime}
          onChange={(e) => {
            const newPerfs = [...formData.performances];
            newPerfs[index].setTime = e.target.value;
            setFormData({...formData, performances: newPerfs});
          }}
          placeholder="4 Hours"
        />
      </div>
      
      <div className="form-group full-width">
        <label>Lineup (comma separated)</label>
        <input
          type="text"
          value={performance.lineup.join(', ')}
          onChange={(e) => {
            const newPerfs = [...formData.performances];
            newPerfs[index].lineup = e.target.value.split(',').map(a => a.trim());
            setFormData({...formData, performances: newPerfs});
          }}
          placeholder="DJ Nova Wave, Techno Titans"
        />
      </div>
      
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={performance.featured}
            onChange={(e) => {
              const newPerfs = [...formData.performances];
              newPerfs[index].featured = e.target.checked;
              setFormData({...formData, performances: newPerfs});
            }}
          />
          Featured Performance
        </label>
      </div>
    </div>
  </div>
))}
        
        <button className="add-bullet-btn" onClick={addPerformance}>
          <FaMicrophone /> Add Another Performance
        </button>
      </div>

      {/* EQUIPMENT & GENRES */}
      <div className="form-section">
        <h2><FaGuitar /> Equipment & Genres</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Music Genres (comma separated)</label>
            <input
              type="text"
              value={formData.genres.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                genres: e.target.value.split(',').map(g => g.trim())
              })}
              placeholder="Melodic Techno, Ambient, Deep House"
            />
          </div>
          
          <div className="form-group">
            <label>Hardware Equipment</label>
            <input
              type="text"
              value={formData.equipment.hardware.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                equipment: {...formData.equipment, hardware: e.target.value.split(',').map(h => h.trim())}
              })}
              placeholder="Pioneer DJM-900NXS2, CDJ-3000, Moog"
            />
          </div>
          
          <div className="form-group">
            <label>Software & DAWs</label>
            <input
              type="text"
              value={formData.equipment.software.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                equipment: {...formData.equipment, software: e.target.value.split(',').map(s => s.trim())}
              })}
              placeholder="Ableton Live 11, Serato DJ Pro"
            />
          </div>
          
          <div className="form-group">
            <label>Controllers</label>
            <input
              type="text"
              value={formData.equipment.controllers.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                equipment: {...formData.equipment, controllers: e.target.value.split(',').map(c => c.trim())}
              })}
              placeholder="Pioneer DDJ-1000, Maschine"
            />
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="form-section">
        <h2><FaDrum /> Artist Services</h2>
        
       {formData.services.map((service, index) => (
  <div key={index} className="service-form">
    <div className="card-header">
      <h3>Service {index + 1}</h3>
      <button 
        type="button"
        className="remove-btn"
        onClick={() => removeService(index)}
        disabled={formData.services.length <= 1}
      >
        🗑️ Remove
      </button>
    </div>
    
    <div className="form-grid">
      <div className="form-group">
        <label>Service Title *</label>
        <input
          type="text"
          value={service.title}
          onChange={(e) => {
            const newServices = [...formData.services];
            newServices[index].title = e.target.value;
            setFormData({...formData, services: newServices});
          }}
          placeholder="Music Production"
        />
      </div>
      
      <div className="form-group">
        <label>Icon</label>
        <select
          value={service.icon}
          onChange={(e) => {
            const newServices = [...formData.services];
            newServices[index].icon = e.target.value;
            setFormData({...formData, services: newServices});
          }}
        >
          <option value="music">Music</option>
          <option value="headphones">Headphones</option>
          <option value="wave">Wave</option>
          <option value="mixer">Mixer</option>
          <option value="vinyl">Vinyl</option>
        </select>
      </div>
      
      <div className="form-group full-width">
        <label>Description</label>
        <textarea
          value={service.description}
          onChange={(e) => {
            const newServices = [...formData.services];
            newServices[index].description = e.target.value;
            setFormData({...formData, services: newServices});
          }}
          rows={2}
          placeholder="Describe what this service includes..."
        />
      </div>
      
      <div className="form-group">
        <label>Price Range</label>
        <input
          type="text"
          value={service.price}
          onChange={(e) => {
            const newServices = [...formData.services];
            newServices[index].price = e.target.value;
            setFormData({...formData, services: newServices});
          }}
          placeholder="Starting at $500"
        />
      </div>
    </div>
  </div>
))}

        <button className="add-bullet-btn" onClick={addService}>
          <FaDrum /> Add Another Service
        </button>
      </div>

      {/* EMAILJS & DEPLOYMENT */}
      <div className="form-section">
        <h2>Contact & Launch</h2>
        <EmailJSSetup />
        
        <div className="form-grid">
          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="artist@email.com"
            />
          </div>
          
          <div className="form-group">
            <label><FaPhone /> Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Berlin, Germany"
            />
          </div>
          
          <div className="form-group">
            <label>Portfolio Username</label>
            <input
              type="text"
              value={formData.deployment.username}
              onChange={(e) => setFormData({
                ...formData, 
                deployment: {...formData.deployment, username: e.target.value}
              })}
              placeholder="djnova"
            />
            <small>Will create: username-musicportfolio.vercel.app</small>
          </div>
        </div>
        
        <div className="deployment-preview">
          <h4>Your Music Portfolio URL:</h4>
          <div className="url-display">
            {formData.deployment.customDomain || 
             `https://${formData.deployment.username || 'music'}-musicportfolio.vercel.app`}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="form-actions">
       <button 
  className="preview-btn"
  onClick={() => {
    localStorage.setItem('portfolio_data', JSON.stringify({
      ...formData,
      templateId: 3
    }));
    navigate('/preview/3'); // CHANGE TO PREVIEW PAGE
  }}
>
  Preview Music Artist Portfolio
</button>

        
        <button 
          className="generate-btn"
          onClick={generatePortfolio}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spinner" /> : '🎵 Launch Music Portfolio'}
        </button>
      </div>
    </div>
  );
};

export default Template6Form;