import { Link } from "react-router-dom";

function Home() {

    return (

        <div className="home-page">

            {/* HERO SECTION */}

            <section className="home-hero">

                <div className="hero-content">

                    <div className="hero-icon">
                        🏥
                    </div>

                    <h1>
                        MediSense<span>-AI</span>
                    </h1>

                    <h2>
                        Healthcare Management System
                    </h2>

                    <p>
                        Smart healthcare management for doctors,
                        patients, appointments, medical records
                        and prescriptions.
                    </p>

                    <Link
                        to="/dashboard"
                        className="home-dashboard-btn"
                    >
                        🚀 Open Dashboard
                    </Link>

                </div>

            </section>


            {/* FEATURES */}

            <section className="features-section">

                <div className="features-title">

                    <span>
                        ✨
                    </span>

                    <h2>
                        Our Features
                    </h2>

                    <p>
                        Everything you need to manage your healthcare system
                    </p>

                </div>


                <div className="features-grid">


                    {/* DEPARTMENTS */}

                    <Link
                        to="/departments"
                        className="feature-card departments-card"
                    >

                        <div className="feature-icon">
                            🏢
                        </div>

                        <h3>
                            Departments
                        </h3>

                        <p>
                            Manage hospital departments
                        </p>

                        <span className="explore-text">
                            Explore →
                        </span>

                    </Link>


                    {/* DOCTORS */}

                    <Link
                        to="/doctors"
                        className="feature-card doctors-card"
                    >

                        <div className="feature-icon">
                            👨‍⚕️
                        </div>

                        <h3>
                            Doctors
                        </h3>

                        <p>
                            Manage doctor information
                        </p>

                        <span className="explore-text">
                            Explore →
                        </span>

                    </Link>


                    {/* PATIENTS */}

                    <Link
                        to="/patients"
                        className="feature-card patients-card"
                    >

                        <div className="feature-icon">
                            🧑
                        </div>

                        <h3>
                            Patients
                        </h3>

                        <p>
                            Manage patient information
                        </p>

                        <span className="explore-text">
                            Explore →
                        </span>

                    </Link>


                    {/* APPOINTMENTS */}

                    <Link
                        to="/appointments"
                        className="feature-card appointments-card"
                    >

                        <div className="feature-icon">
                            📅
                        </div>

                        <h3>
                            Appointments
                        </h3>

                        <p>
                            Manage appointments easily
                        </p>

                        <span className="explore-text">
                            Explore →
                        </span>

                    </Link>


                    {/* MEDICAL RECORDS */}

                    <Link
                        to="/medical-records"
                        className="feature-card records-card"
                    >

                        <div className="feature-icon">
                            📋
                        </div>

                        <h3>
                            Medical Records
                        </h3>

                        <p>
                            View and manage medical records
                        </p>

                        <span className="explore-text">
                            Explore →
                        </span>

                    </Link>


                    {/* PRESCRIPTIONS */}

                    <Link
                        to="/prescriptions"
                        className="feature-card prescriptions-card"
                    >

                        <div className="feature-icon">
                            💊
                        </div>

                        <h3>
                            Prescriptions
                        </h3>

                        <p>
                            Manage patient prescriptions
                        </p>

                        <span className="explore-text">
                            Explore →
                        </span>

                    </Link>


                    {/* AI SYMPTOM CHECKER */}

                    <Link
                        to="/symptom-checker"
                        className="feature-card ai-feature"
                    >

                        <div className="feature-icon">
                            🤖
                        </div>

                        <h3>
                            AI Symptom Checker
                        </h3>

                        <p>
                            Get AI-powered symptom analysis
                        </p>

                        <span className="explore-text">
                            Check Now →
                        </span>

                    </Link>


                </div>

            </section>

        </div>

    );

}

export default Home;