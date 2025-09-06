import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './MyPage.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import img1 from '../images/1.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import img4 from '../images/4.png';
import img5 from '../images/5.png';
import img6 from '../images/6.png';
import img7 from '../images/7.png';
import img8 from '../images/8.png';
import img9 from '../images/9.png';
import img10 from '../images/10.png';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDest, setSelectedDest] = useState(null);

  const trendingDestinations = [
    { name: 'Manipur', image: img6 },
    { name: 'Goa', image: img7 },
    { name: 'Shillong', image: img9 },
    { name: 'Kerala', image: img8 },
    { name: 'Rishikesh', image: img10 },
    { name: 'Darjeeling', image: img1 },
    { name: 'Jaipur', image: img2 },
    { name: 'Leh', image: img3 },
    { name: 'Sikkim', image: img4 },
    { name: 'Coorg', image: img5 },
  ];

  const destinationImages = {
    Manipur: img6,
    Goa: img7,
    Shillong: img9,
    Kerala: img8,
    Rishikesh: img10,
    Darjeeling: img1,
    Jaipur: img2,
    Leh: img3,
    Sikkim: img4,
    Coorg: img5,
  };

  const sampleItineraries = {
  Manipur: `
Day 1:
- Arrival at Manali, check-in at hotel
- Evening stroll at Mall Road
- Dinner at local restaurant

Day 2:
- Solang Valley: Adventure activities like paragliding and zorbing
- Visit Hidimba Temple
- Photography session at Old Manali

Day 3:
- Rohtang Pass excursion (if weather permits)
- Local sightseeing & shopping
- Evening relaxation at hot springs

Day 4:
- Leisure morning at the hotel
- Departure
`,

Goa: `
Day 1:
- Arrival at Goa, check-in at beach resort
- Relax at Baga Beach
- Sunset cruise

Day 2:
- Explore Fort Aguada and Chapora Fort
- Water sports at Calangute Beach
- Local seafood dinner

Day 3:
- Visit Old Goa Churches (Basilica of Bom Jesus, Se Cathedral)
- Explore Panaji markets and streets
- Evening beach party or sunset yoga

Day 4:
- Leisure morning
- Departure
`,

Shillong: `
Day 1:
- Arrival at Shimla, check-in at hotel
- Evening walk on Mall Road
- Local shopping & street food tasting

Day 2:
- Kufri adventure park and horse riding
- Visit Jakhoo Temple
- Sunset photography at Ridge

Day 3:
- Day trip to Chail Palace
- Explore local cafes and bookstores
- Evening relaxation

Day 4:
- Morning nature walk
- Departure
`,

Rishikesh: `
Day 1:
- Arrival at Rishikesh, check-in at riverside camp
- Ganga Aarti at Triveni Ghat
- Evening meditation session

Day 2:
- Adventure activities: White-water rafting and bungee jumping
- Visit Beatles Ashram
- Yoga & wellness workshop

Day 3:
- Explore Laxman Jhula and Ram Jhula
- Local shopping & café hopping
- Optional river kayaking

Day 4:
- Morning yoga session
- Departure
`,

Kerala: `
Day 1:
- Arrival in Kochi, check-in at backwater resort
- Explore Fort Kochi & Jew Town
- Kathakali performance in the evening

Day 2:
- Houseboat cruise through Alleppey backwaters
- Village tour and local food tasting
- Evening relaxation on boat

Day 3:
- Visit Munnar tea plantations
- Trekking and waterfall photography
- Evening leisure

Day 4:
- Morning visit to local spice markets
- Departure
`,
  Darjeeling: `
Day 1:
- Arrival in Darjeeling, check-in at hotel with mountain view
- Relax and enjoy local tea at a nearby café
- Evening stroll at Chowrasta and Mall Road

Day 2:
- Sunrise at Tiger Hill for Kanchenjunga view
- Visit Ghoom Monastery and Batasia Loop
- Explore Darjeeling Himalayan Railway (Toy Train ride)
- Evening shopping for local handicrafts

Day 3:
- Trekking at Happy Valley Tea Estate
- Visit Peace Pagoda at Japanese Temple
- Photography at Observatory Hill
- Optional local cooking class in the evening

Day 4:
- Leisure morning, visit local bakeries
- Departure
`,

Sikkim: `
Day 1:
- Arrival in Gangtok, check-in at hotel
- Evening stroll at MG Marg for shopping and local snacks
- Relax and enjoy scenic views of the Himalayas

Day 2:
- Visit Rumtek Monastery and Enchey Monastery
- Cable car ride over Gangtok city
- Explore local art galleries and street markets

Day 3:
- Full-day excursion to Tsomgo Lake and Baba Mandir
- Optional yak ride at the lake
- Evening relaxation at hotel or local café

Day 4:
- Visit Tashi View Point for sunrise
- Departure
`
};

  useEffect(() => {
    const fetchRecommendations = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!userId) return;

      try {
        const res = await fetch(`http://localhost:5001/api/recommendations/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setUser(data.user);
        setRecommendations(data.recommendations);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mypage-container">
      <h1>Welcome, {user.name}!</h1>
      <h2>Trending Destinations:</h2>
      <Slider {...sliderSettings}>
        {trendingDestinations.map((dest, index) => (
          <div key={index} className="trending-slide">
            <img src={dest.image} alt={dest.name} />
            <h3>{dest.name}</h3>
          </div>
        ))}
      </Slider>

      <h2>✨ Personalized Recommendations for You</h2>
    <p className="ai-text">Based on your preferences, our AI travel assistant suggests these destinations just for you!</p>

      {recommendations.length === 0 ? (
        <p>No recommendations match your preferences yet.</p>
      ) : (
        <div className="destinations-grid">
          {recommendations.map((dest, i) => (
            <div key={i} className="destination-card" onClick={() => setSelectedDest(dest)}>
  <div className="ai-badge">AI</div>
  <img src={destinationImages[dest.name] || 'https://via.placeholder.com/300x200'} alt={dest.name} />
  <h3>{dest.name}</h3>
              <p><strong>Type:</strong> {dest.type}</p>
              <p><strong>Weather:</strong> {dest.weather}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedDest && (
        <div className="modal-overlay" onClick={() => setSelectedDest(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedDest(null)}>×</button>
            <img src={destinationImages[selectedDest.name] || 'https://via.placeholder.com/400x250'} alt={selectedDest.name} />
            <h2>{selectedDest.name}</h2>
            <p><strong>Smart Itinerary Generated by AI:</strong></p>
            <pre>{sampleItineraries[selectedDest.name]}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
