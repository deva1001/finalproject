import React from 'react';

const Home = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h1 style={styles.heading}>Welcome to Our Website</h1>
          <p style={styles.description}>
            Explore our services and learn more about what we offer. Whether you're looking for
            ways to improve your health, find inner peace through meditation, or learn about our
            latest services, we've got you covered.
          </p>
        </div>

        <div style={styles.cardsContainer}>
          <a href="/yoga" style={styles.card}>
            <img
              src="https://img.freepik.com/free-photo/sporty-beautiful-young-woman-taking-professional-yoga-lessons-home_155003-41435.jpg?t=st=1716370926~exp=1716374526~hmac=acf2762e30d5bbd70e93c0364da75e2cffac6a024e4aff220c3bde6d32ccfc3e&w=740"
              alt="Yoga"
              style={styles.cardImage}
            />
            <div style={styles.blur}></div>
          </a>

          <a href="/personalizeddiet" style={styles.card}>
            <img
              //src="https://img.free-photo/healthy-fruit-salad-with-vegetables-pecans_53876-104496.jpg?t=st=1716370994~exp=1716374594~hmac=5d2739d48bc80f84734d4fbd95bf8c7a4f2f55682ad91ac537ceb2a2c2d593d2&w=740"
              src="https://img.freepik.com/free-photo/top-view-mix-vegetables-bowl-with-chicken-drumstick_23-2148369699.jpg?t=st=1744197604~exp=1744201204~hmac=27803b59a14f527515d27ba3fba6c10cf22207a1b1e71aa7e956db2a124298fa&w=826"
              alt="Diet"
              style={styles.cardImage}
            />
            <div style={styles.blur}></div>
          </a>

          <a href="/meditation" style={styles.card}>
            <img
              src="https://img.freepik.com/free-photo/studio-shot-young-fit-woman-doing-yoga-exercises-green-space_155003-14216.jpg?t=st=1716370944~exp=1716374544~hmac=4da2166c63a2d65de03571fa0d0378b24b4bbcec8f1119a23fab22e0e12d3770&w=740"
              alt="Meditation"
              style={styles.cardImage}
            />
            <div style={styles.blur}></div>
          </a>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <a href="/home1" style={styles.getStartedButton}>Get Started</a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    background: `url('https://img.freepik.com/free-photo/healthy-lifestyle-diet-nutrition-concept_53876-104535.jpg?w=1380&t=st=1716376580~exp=1716377180~hmac=f4b0b53805a2b4c8437b6c179cfcf8f104b0e83d647be3cb77c4e6fa4793764b')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    width: '90vw',
    maxWidth: '1100px',
    borderRadius: '1rem',
    padding: '20px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  description: {
    maxWidth: '700px',
    margin: '20px auto',
    fontSize: '18px',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  card: {
    position: 'relative',
    width: '12rem',
    height: '16rem',
    overflow: 'hidden',
    borderRadius: '1rem',
    backgroundColor: '#3d3c3d',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
    textDecoration: 'none',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '1rem',
    zIndex: '0',
    position: 'relative',
  },
  blur: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    filter: 'blur(15px)',
    zIndex: '1',
    borderRadius: '1rem',
  },
  getStartedButton: {
    display: 'inline-block',
    marginTop: '30px',
    padding: '15px 30px',
    backgroundColor: '#FF5733',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: '50px',
    transition: 'background-color 0.3s',
    fontSize: '18px',
  },
};

export default Home;
