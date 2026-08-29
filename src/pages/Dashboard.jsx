import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getDoctors,
    getPatients,
    getAppointments,
    getMedicalRecords,
    getPrescriptions
} from "../services/api";


function Dashboard() {

    const [stats, setStats] = useState({
        doctors: 0,
        patients: 0,
        appointments: 0,
        medicalRecords: 0,
        prescriptions: 0
    });


    const [recentAppointments, setRecentAppointments] =
        useState([]);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState("");


    useEffect(() => {

        loadDashboardData();

    }, []);



    // ========================================
    // GET ARRAY FROM DIFFERENT API RESPONSES
    // ========================================

    const getArray = (response) => {

        if (Array.isArray(response)) {
            return response;
        }

        if (Array.isArray(response?.data)) {
            return response.data;
        }

        return [];

    };



    // ========================================
    // LOAD DASHBOARD DATA
    // ========================================

    const loadDashboardData = async () => {

        try {

            setLoading(true);

            setError("");


            const results = await Promise.allSettled([

                getDoctors(),

                getPatients(),

                getAppointments(),

                getMedicalRecords(),

                getPrescriptions()

            ]);


            const doctorsResponse =
                results[0].status === "fulfilled"
                    ? results[0].value
                    : [];


            const patientsResponse =
                results[1].status === "fulfilled"
                    ? results[1].value
                    : [];


            const appointmentsResponse =
                results[2].status === "fulfilled"
                    ? results[2].value
                    : [];


            const recordsResponse =
                results[3].status === "fulfilled"
                    ? results[3].value
                    : [];


            const prescriptionsResponse =
                results[4].status === "fulfilled"
                    ? results[4].value
                    : [];


            // Convert responses to arrays

            const doctors =
                getArray(doctorsResponse);


            const patients =
                getArray(patientsResponse);


            const appointments =
                getArray(appointmentsResponse);


            const medicalRecords =
                getArray(recordsResponse);


            const prescriptions =
                getArray(prescriptionsResponse);



            // Update dashboard statistics

            setStats({

                doctors:
                    doctors.length,


                patients:
                    patients.length,


                appointments:
                    appointments.length,


                medicalRecords:
                    medicalRecords.length,


                prescriptions:
                    prescriptions.length

            });



            // Recent 5 appointments

            setRecentAppointments(

                appointments
                    .slice()
                    .reverse()
                    .slice(0, 5)

            );



            // Check if all APIs failed

            const failedRequests =
                results.filter(
                    result =>
                        result.status === "rejected"
                );


            if (
                failedRequests.length === results.length
            ) {

                setError(
                    "Unable to load dashboard data. Please check backend server and API endpoints."
                );

            }


            // Print failed APIs in console

            results.forEach(
                (result, index) => {

                    if (
                        result.status === "rejected"
                    ) {

                        console.error(
                            "Dashboard API failed:",
                            index,
                            result.reason
                        );

                    }

                }
            );


        } catch (error) {

            console.error(
                "Dashboard loading error:",
                error
            );


            setError(
                "Unable to load dashboard data."
            );


        } finally {

            setLoading(false);

        }

    };



    // ========================================
    // LOADING
    // ========================================

    if (loading) {

        return (

            <div className="page-container">

                <h1>
                    Dashboard
                </h1>


                <p>
                    Loading dashboard data...
                </p>

            </div>

        );

    }



    // ========================================
    // DASHBOARD UI
    // ========================================

    return (

        <div className="page-container">


            <h1>
                Dashboard
            </h1>


            <p className="page-subtitle">

                Welcome to MediSense-AI Healthcare Management System

            </p>



            {error && (

                <div className="error-message">

                    {error}

                    <br />

                    <br />

                    <button
                        className="primary-button"
                        onClick={loadDashboardData}
                    >

                        Retry

                    </button>

                </div>

            )}



            {/* ========================================
                DASHBOARD STATISTICS
            ======================================== */}

            <div className="dashboard-grid">


                <Link
                    to="/doctors"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <h3>
                            👨‍⚕️ Total Doctors
                        </h3>


                        <h2>
                            {stats.doctors}
                        </h2>

                    </div>

                </Link>



                <Link
                    to="/patients"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <h3>
                            🧑 Total Patients
                        </h3>


                        <h2>
                            {stats.patients}
                        </h2>

                    </div>

                </Link>



                <Link
                    to="/appointments"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <h3>
                            📅 Total Appointments
                        </h3>


                        <h2>
                            {stats.appointments}
                        </h2>

                    </div>

                </Link>



                <Link
                    to="/medical-records"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <h3>
                            📋 Medical Records
                        </h3>


                        <h2>
                            {stats.medicalRecords}
                        </h2>

                    </div>

                </Link>



                <Link
                    to="/prescriptions"
                    className="dashboard-card-link"
                >

                    <div className="dashboard-card">

                        <h3>
                            💊 Prescriptions
                        </h3>


                        <h2>
                            {stats.prescriptions}
                        </h2>

                    </div>

                </Link>


            </div>
<Link
  to="/symptom-checker"
  className="dashboard-card-link"
>
  <div className="dashboard-card">

    <h3>
      🤖 AI Symptom Checker
    </h3>

    <h2>
      Check Symptoms
    </h2>

    <p>
      Get AI-powered symptom analysis
    </p>

  </div>
</Link>


            {/* ========================================
                RECENT APPOINTMENTS
            ======================================== */}

            <div className="table-card recent-section">


                <h2>
                    📅 Recent Appointments
                </h2>



                <div className="table-wrapper">


                    <table>


                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Doctor
                                </th>

                                <th>
                                    Appointment Date
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>



                        <tbody>


                            {recentAppointments.length > 0 ? (

                                recentAppointments.map(
                                    (appointment) => (

                                        <tr
                                            key={
                                                appointment.id
                                            }
                                        >


                                            <td>

                                                {appointment.id}

                                            </td>



                                            <td>

                                                {
                                                    appointment.patientName ||
                                                    appointment.patient?.name ||
                                                    "-"

                                                }

                                            </td>



                                            <td>

                                                {
                                                    appointment.doctorName ||
                                                    appointment.doctor?.name ||
                                                    "-"

                                                }

                                            </td>



                                            <td>

                                                {
                                                    appointment.appointmentDateTime
                                                        ? new Date(
                                                            appointment.appointmentDateTime
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                        : appointment.appointmentDate ||
                                                        "-"
                                                }

                                            </td>



                                            <td>

                                                {
                                                    appointment.status ||
                                                    "-"
                                                }

                                            </td>


                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>


                                    <td
                                        colSpan="5"
                                        className="no-data"
                                    >

                                        No appointments found

                                    </td>


                                </tr>

                            )}


                        </tbody>


                    </table>


                </div>


            </div>


        </div>

    );

}


export default Dashboard;