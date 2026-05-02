import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import Plan from '../components/Plan.jsx';

function Home() {
  return (
    <div style={{ backgroundColor: "#0f172a" }}> {/* Change color here */}
      <Nav />

      <section className="Hero" style={{ textAlign: "center", padding: "50px" }}>
        <h1 className="welcome" style={{color: "white"}}>
          Your Journey to <span>Healthier Living</span> Starts Here
        </h1>

        <p className='welcomP' style={{color: "white"}}>
          AI-powered calorie tracking and personalized nutrition plans.
        </p>
      </section>

      <section id="pricing" className="plans-container">
        <h1 className="title" style={{color: "white"}}>
          Simple, Transparent <span>Pricing</span>
        </h1>

        <div className="plans">
          <Plan
            name="Monthly"
            price={29}
            duration="month"
            features={[
              "AI Calorie Tracking",
              "Basic Meal Plans",
              "Community Access",
              "Weekly Reports"
            ]}
          />

          <Plan
            name="Seasonal"
            price={69}
            duration="3 months"
            popular={true}
            features={[
              "Everything in Monthly",
              "1 Nutritionist Session",
              "Custom Meal Plans",
              "Priority Support",
              "Advanced Analytics"
            ]}
          />

          <Plan
            name="Ramadan Special"
            price={49}
            duration="month"
            features={[
              "Iftar & Suhoor Plans",
              "Fasting Nutrition Guide",
              "AI Tracking",
              "Daily Tips",
              "Community Group"
            ]}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;