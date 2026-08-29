import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Prescriptions from "./pages/Prescriptions";
import SymptomChecker from "./pages/SymptomChecker";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* HOME PAGE */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* DEPARTMENTS */}

                <Route
                    path="/departments"
                    element={<Departments />}
                />


                {/* DOCTORS */}

                <Route
                    path="/doctors"
                    element={<Doctors />}
                />


                {/* PATIENTS */}

                <Route
                    path="/patients"
                    element={<Patients />}
                />


                {/* APPOINTMENTS */}

                <Route
                    path="/appointments"
                    element={<Appointments />}
                />


                {/* MEDICAL RECORDS */}

                <Route
                    path="/medical-records"
                    element={<MedicalRecords />}
                />


                {/* PRESCRIPTIONS */}

                <Route
                    path="/prescriptions"
                    element={<Prescriptions />}
                />


                {/* AI SYMPTOM CHECKER */}

                <Route
                    path="/symptom-checker"
                    element={<SymptomChecker />}
                />


                {/* INVALID ROUTES */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;