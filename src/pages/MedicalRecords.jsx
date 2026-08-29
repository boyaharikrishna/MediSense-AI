import { useEffect, useState } from "react";

import {
    getMedicalRecords,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
    getPatients,
    getDoctors
} from "../services/api";

function MedicalRecords() {

    const [records, setRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [prescription, setPrescription] = useState("");
    const [notes, setNotes] = useState("");
    const [recordDate, setRecordDate] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================
    // LOAD MEDICAL RECORDS
    // =========================================

    const loadRecords = async () => {

        try {

            setLoading(true);
            setError("");

            const result =
                await getMedicalRecords();

            setRecords(
                result.data || []
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load medical records."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // LOAD PATIENTS
    // =========================================

    const loadPatients = async () => {

        try {

            const result =
                await getPatients();

            setPatients(
                result.data || []
            );

        } catch (err) {

            console.error(
                "Unable to load patients",
                err
            );

        }
    };


    // =========================================
    // LOAD DOCTORS
    // =========================================

    const loadDoctors = async () => {

        try {

            const result =
                await getDoctors();

            setDoctors(
                result.data || []
            );

        } catch (err) {

            console.error(
                "Unable to load doctors",
                err
            );

        }
    };


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        loadRecords();
        loadPatients();
        loadDoctors();

    }, []);


    // =========================================
    // CLEAR FORM
    // =========================================

    const clearForm = () => {

        setPatientId("");
        setDoctorId("");
        setDiagnosis("");
        setSymptoms("");
        setPrescription("");
        setNotes("");
        setRecordDate("");

        setEditingId(null);

    };


    // =========================================
    // FORMAT DATE FOR INPUT
    // =========================================

    const formatDateForInput = (
        dateTime
    ) => {

        if (!dateTime) {
            return "";
        }

        return dateTime.substring(
            0,
            16
        );

    };


    // =========================================
    // CREATE / UPDATE MEDICAL RECORD
    // =========================================

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();


        if (
            !patientId ||
            !doctorId ||
            !diagnosis.trim() ||
            !symptoms.trim() ||
            !prescription.trim() ||
            !recordDate
        ) {

            alert(
                "Please fill all required fields."
            );

            return;
        }


        const recordData = {

            patientId:
                Number(patientId),

            doctorId:
                Number(doctorId),

            diagnosis:
                diagnosis.trim(),

            symptoms:
                symptoms.trim(),

            prescription:
                prescription.trim(),

            notes:
                notes.trim(),

            recordDate:
                recordDate

        };


        try {

            if (editingId) {

                await updateMedicalRecord(
                    editingId,
                    recordData
                );

                alert(
                    "Medical record updated successfully."
                );

            } else {

                await createMedicalRecord(
                    recordData
                );

                alert(
                    "Medical record created successfully."
                );

            }


            clearForm();

            await loadRecords();

        } catch (err) {

            console.error(err);

            alert(
                editingId
                    ? "Failed to update medical record."
                    : "Failed to create medical record."
            );

        }
    };


    // =========================================
    // EDIT MEDICAL RECORD
    // =========================================

    const handleEdit = (
        record
    ) => {

        setEditingId(
            record.id
        );

        setPatientId(
            record.patientId
        );

        setDoctorId(
            record.doctorId
        );

        setDiagnosis(
            record.diagnosis || ""
        );

        setSymptoms(
            record.symptoms || ""
        );

        setPrescription(
            record.prescription || ""
        );

        setNotes(
            record.notes || ""
        );

        setRecordDate(
            formatDateForInput(
                record.recordDate
            )
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================================
    // DELETE MEDICAL RECORD
    // =========================================

    const handleDelete = async (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this medical record?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteMedicalRecord(
                id
            );

            alert(
                "Medical record deleted successfully."
            );

            if (editingId === id) {

                clearForm();

            }

            await loadRecords();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to delete medical record."
            );

        }
    };


    // =========================================
    // GET PATIENT NAME
    // =========================================

    const getPatientName = (
        id
    ) => {

        const patient =
            patients.find(
                (item) =>
                    item.id === id
            );

        return patient
            ? patient.name
            : id;

    };


    // =========================================
    // GET DOCTOR NAME
    // =========================================

    const getDoctorName = (
        id
    ) => {

        const doctor =
            doctors.find(
                (item) =>
                    item.id === id
            );

        return doctor
            ? doctor.name
            : id;

    };


    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDateTime = (
        dateTime
    ) => {

        if (!dateTime) {
            return "-";
        }

        const date =
            new Date(
                dateTime
            );

        if (
            isNaN(
                date.getTime()
            )
        ) {
            return dateTime;
        }

        return date.toLocaleString();

    };


    return (

        <div className="medical-record-page">

            <h1>
                Medical Records
            </h1>

            <p className="page-description">
                Manage patient medical records
            </p>


            {/* =====================================
                ADD / EDIT MEDICAL RECORD
            ===================================== */}

            <div className="department-form-card">

                <h2>

                    {editingId
                        ? "Edit Medical Record"
                        : "Add Medical Record"}

                </h2>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* PATIENT */}

                    <div className="form-group">

                        <label>
                            Patient
                        </label>

                        <select
                            value={
                                patientId
                            }
                            onChange={(e) =>
                                setPatientId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Patient
                            </option>


                            {patients.map(
                                (patient) => (

                                    <option
                                        key={
                                            patient.id
                                        }
                                        value={
                                            patient.id
                                        }
                                    >
                                        {patient.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* DOCTOR */}

                    <div className="form-group">

                        <label>
                            Doctor
                        </label>

                        <select
                            value={
                                doctorId
                            }
                            onChange={(e) =>
                                setDoctorId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Doctor
                            </option>


                            {doctors.map(
                                (doctor) => (

                                    <option
                                        key={
                                            doctor.id
                                        }
                                        value={
                                            doctor.id
                                        }
                                    >
                                        {doctor.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* DIAGNOSIS */}

                    <div className="form-group">

                        <label>
                            Diagnosis
                        </label>

                        <input
                            type="text"
                            placeholder="Enter diagnosis"
                            value={
                                diagnosis
                            }
                            onChange={(e) =>
                                setDiagnosis(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* SYMPTOMS */}

                    <div className="form-group">

                        <label>
                            Symptoms
                        </label>

                        <textarea
                            placeholder="Enter symptoms"
                            value={
                                symptoms
                            }
                            onChange={(e) =>
                                setSymptoms(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* PRESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Prescription
                        </label>

                        <textarea
                            placeholder="Enter prescription"
                            value={
                                prescription
                            }
                            onChange={(e) =>
                                setPrescription(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* NOTES */}

                    <div className="form-group">

                        <label>
                            Notes
                        </label>

                        <textarea
                            placeholder="Enter additional notes"
                            value={
                                notes
                            }
                            onChange={(e) =>
                                setNotes(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* RECORD DATE */}

                    <div className="form-group">

                        <label>
                            Record Date
                        </label>

                        <input
                            type="datetime-local"
                            value={
                                recordDate
                            }
                            onChange={(e) =>
                                setRecordDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="primary-button"
                        >

                            {editingId
                                ? "Update Medical Record"
                                : "+ Add Medical Record"}

                        </button>


                        {editingId && (

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={
                                    clearForm
                                }
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>


            {/* =====================================
                MEDICAL RECORD LIST
            ===================================== */}

            <div className="department-list-card">

                <h2>
                    Medical Record List
                </h2>


                {loading && (

                    <p>
                        Loading medical records...
                    </p>

                )}


                {error && (

                    <p className="error-message">
                        {error}
                    </p>

                )}


                {!loading &&
                    !error &&
                    records.length === 0 && (

                        <p className="empty-message">
                            No medical records found.
                        </p>

                    )}


                {!loading &&
                    !error &&
                    records.length > 0 && (

                        <div className="medical-record-table-wrapper">

                            <table className="medical-record-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Patient</th>

                                        <th>Doctor</th>

                                        <th>Diagnosis</th>

                                        <th>Symptoms</th>

                                        <th>Prescription</th>

                                        <th>Notes</th>

                                        <th>Record Date</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {records.map(
                                        (record) => (

                                            <tr
                                                key={
                                                    record.id
                                                }
                                            >

                                                <td>
                                                    {record.id}
                                                </td>


                                                <td>
                                                    {record.patientName ||
                                                        getPatientName(
                                                            record.patientId
                                                        )}
                                                </td>


                                                <td>
                                                    {record.doctorName ||
                                                        getDoctorName(
                                                            record.doctorId
                                                        )}
                                                </td>


                                                <td>
                                                    {record.diagnosis}
                                                </td>


                                                <td>
                                                    {record.symptoms}
                                                </td>


                                                <td>
                                                    {record.prescription}
                                                </td>


                                                <td>
                                                    {record.notes || "-"}
                                                </td>


                                                <td>
                                                    {formatDateTime(
                                                        record.recordDate
                                                    )}
                                                </td>


                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    record
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    record.id
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

export default MedicalRecords;