import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';

function Home() {
  return (
    <>
      <Nav />

      <section className="Hero" style={{ textAlign: "center", padding: "50px" }}>
        <h1 className="welcome">
  Your Journey to <span>Healthier Living</span> Starts Here
</h1>

        <p className='welcomP'>
          AI-powered calorie tracking and personalized nutrition plans.
        </p>
      </section>

      <Footer />
    </>
  );
}

export default Home;