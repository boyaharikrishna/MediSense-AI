import { useEffect, useState } from "react";
import {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient,
    updatePatientStatus
} from "../services/api";

function Patients() {

    const [patients, setPatients] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ================================
    // LOAD PATIENTS
    // ================================

    const loadPatients = async () => {

        try {

            setLoading(true);
            setError("");

            const result = await getPatients();

            setPatients(result.data || []);

        } catch (err) {

            console.error(err);

            setError("Unable to load patients.");

        } finally {

            setLoading(false);

        }
    };


    // ================================
    // INITIAL LOAD
    // ================================

    useEffect(() => {

        loadPatients();

    }, []);


    // ================================
    // CLEAR FORM
    // ================================

    const clearForm = () => {

        setName("");
        setEmail("");
        setPhone("");
        setGender("");
        setDateOfBirth("");

        setEditingId(null);

    };


    // ================================
    // CREATE / UPDATE PATIENT
    // ================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (
            !name.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !gender ||
            !dateOfBirth
        ) {

            alert(
                "Please fill all required fields."
            );

            return;
        }


        const patientData = {

            name: name.trim(),

            email: email.trim(),

            phone: phone.trim(),

            gender: gender,

            dateOfBirth: dateOfBirth,

            active: true

        };


        try {

            if (editingId !== null) {

                await updatePatient(
                    editingId,
                    patientData
                );

                alert(
                    "Patient updated successfully."
                );

            } else {

                await createPatient(
                    patientData
                );

                alert(
                    "Patient created successfully."
                );

            }


            clearForm();

            await loadPatients();

        } catch (err) {

            console.error(err);

            alert(
                editingId !== null
                    ? "Failed to update patient."
                    : "Failed to create patient."
            );

        }

    };


    // ================================
    // EDIT PATIENT
    // ================================

    const handleEdit = (patient) => {

        setEditingId(patient.id);

        setName(patient.name || "");

        setEmail(patient.email || "");

        setPhone(patient.phone || "");

        setGender(patient.gender || "");

        setDateOfBirth(
            patient.dateOfBirth || ""
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ================================
    // DELETE PATIENT
    // ================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this patient?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            await deletePatient(id);

            alert(
                "Patient deleted successfully."
            );

            await loadPatients();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to delete patient."
            );

        }

    };


    // ================================
    // ACTIVATE / DEACTIVATE
    // ================================

    const handleStatus = async (
        id,
        currentStatus
    ) => {

        try {

            await updatePatientStatus(
                id,
                !currentStatus
            );

            await loadPatients();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to update patient status."
            );

        }

    };


    // ================================
    // UI
    // ================================

    return (

        <div className="patient-page">

            <h1>Patients</h1>

            <p className="page-description">
                Manage hospital patients
            </p>


            {/* =====================================
                ADD / EDIT PATIENT
            ===================================== */}

            <div className="department-form-card">

                <h2>

                    {editingId !== null
                        ? "Edit Patient"
                        : "Add Patient"}

                </h2>


                <form onSubmit={handleSubmit}>


                    {/* Patient Name */}

                    <div className="form-group">

                        <label>
                            Patient Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter patient name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Email */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Phone */}

                    <div className="form-group">

                        <label>
                            Phone
                        </label>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Gender */}

                    <div className="form-group">

                        <label>
                            Gender
                        </label>

                        <select
                            value={gender}
                            onChange={(e) =>
                                setGender(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="MALE">
                                Male
                            </option>

                            <option value="FEMALE">
                                Female
                            </option>

                            <option value="OTHER">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Date of Birth */}

                    <div className="form-group">

                        <label>
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) =>
                                setDateOfBirth(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="primary-button"
                    >

                        {editingId !== null
                            ? "Update Patient"
                            : "+ Add Patient"}

                    </button>


                    {/* Cancel */}

                    {editingId !== null && (

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={clearForm}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>


            {/* =====================================
                PATIENT LIST
            ===================================== */}

            <div className="department-list-card">

                <h2>
                    Patient List
                </h2>


                {/* Loading */}

                {loading && (

                    <p>
                        Loading patients...
                    </p>

                )}


                {/* Error */}

                {error && (

                    <p className="error-message">
                        {error}
                    </p>

                )}


                {/* Empty */}

                {!loading &&
                    !error &&
                    patients.length === 0 && (

                        <p className="empty-message">
                            No patients found.
                        </p>

                    )}


                {/* Table */}

                {!loading &&
                    !error &&
                    patients.length > 0 && (

                        <div className="patient-table-wrapper">

                            <table className="patient-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Phone</th>

                                        <th>Gender</th>

                                        <th>Date of Birth</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {patients.map(
                                        (patient) => (

                                            <tr
                                                key={
                                                    patient.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        patient.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        patient.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        patient.email
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        patient.phone
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        patient.gender
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        patient.dateOfBirth
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            patient.active
                                                                ? "status-active"
                                                                : "status-inactive"
                                                        }
                                                    >

                                                        {patient.active
                                                            ? "Active"
                                                            : "Inactive"}

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="patient-actions">

                                                        <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    patient
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="status-button"
                                                            onClick={() =>
                                                                handleStatus(
                                                                    patient.id,
                                                                    patient.active
                                                                )
                                                            }
                                                        >

                                                            {patient.active
                                                                ? "Deactivate"
                                                                : "Activate"}

                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    patient.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

            </div>

        </div>
    );
}

export default Patients;