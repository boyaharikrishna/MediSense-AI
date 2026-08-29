import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <h3>MENU</h3>

            <ul>

                <li>
                    <Link to="/">
                        🏠 Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/departments">
                        🏥 Departments
                    </Link>
                </li>

                <li>
                    <Link to="/doctors">
                        👨‍⚕️ Doctors
                    </Link>
                </li>

                <li>
                    <Link to="/patients">
                        🧑 Patients
                    </Link>
                </li>

                <li>
                    <Link to="/appointments">
                        📅 Appointments
                    </Link>
                </li>

                <li>
                    <Link to="/medical-records">
                        📋 Medical Records
                    </Link>
                </li>

                <li>
                    <Link to="/prescriptions">
                        💊 Prescriptions
                    </Link>
                </li>

                <li>
                    <Link to="/symptom-checker">
                        🤖 AI Symptom Checker
                    </Link>
                </li>

            </ul>

        </aside>
    );
}

export default Sidebar;