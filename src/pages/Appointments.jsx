import { useEffect, useState } from "react";

import {
    getAppointments,
    createAppointment,
    deleteAppointment,
    updateAppointmentStatus,
    getPatients,
    getDoctors
} from "../services/api";

function Appointments() {

    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const [reason, setReason] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================
    // LOAD APPOINTMENTS
    // =========================================

    const loadAppointments = async () => {

        try {

            setLoading(true);
            setError("");

            const result = await getAppointments();

            setAppointments(result.data || []);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load appointments."
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

            const result = await getPatients();

            setPatients(result.data || []);

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

            const result = await getDoctors();

            setDoctors(result.data || []);

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

        loadAppointments();
        loadPatients();
        loadDoctors();

    }, []);


    // =========================================
    // CLEAR FORM
    // =========================================

    const clearForm = () => {

        setPatientId("");
        setDoctorId("");
        setAppointmentDateTime("");
        setReason("");

    };


    // =========================================
    // CREATE APPOINTMENT
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (
            !patientId ||
            !doctorId ||
            !appointmentDateTime ||
            !reason.trim()
        ) {

            alert(
                "Please fill all fields."
            );

            return;
        }


        const appointmentData = {

            patientId: Number(patientId),

            doctorId: Number(doctorId),

            appointmentDateTime:
                appointmentDateTime,

            reason:
                reason.trim()

        };


        try {

            await createAppointment(
                appointmentData
            );

            alert(
                "Appointment created successfully."
            );

            clearForm();

            await loadAppointments();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to create appointment."
            );

        }
    };


    // =========================================
    // DELETE APPOINTMENT
    // =========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this appointment?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteAppointment(id);

            alert(
                "Appointment deleted successfully."
            );

            await loadAppointments();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to delete appointment."
            );

        }
    };


    // =========================================
    // UPDATE STATUS
    // =========================================

    const handleStatus = async (
        id,
        status
    ) => {

        try {

            await updateAppointmentStatus(
                id,
                status
            );

            alert(
                "Appointment status updated successfully."
            );

            await loadAppointments();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to update appointment status."
            );

        }
    };


    // =========================================
    // GET PATIENT NAME
    // =========================================

    const getPatientName = (id) => {

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

    const getDoctorName = (id) => {

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
            new Date(dateTime);

        if (isNaN(date.getTime())) {
            return dateTime;
        }

        return date.toLocaleString();

    };


    // =========================================
    // UI
    // =========================================

    return (

        <div className="appointment-page">

            <h1>
                Appointments
            </h1>

            <p className="page-description">
                Manage patient appointments
            </p>


            {/* =====================================
                ADD APPOINTMENT
            ===================================== */}

            <div className="department-form-card">

                <h2>
                    Add Appointment
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


                    {/* DATE TIME */}

                    <div className="form-group">

                        <label>
                            Appointment Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            value={
                                appointmentDateTime
                            }
                            onChange={(e) =>
                                setAppointmentDateTime(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* REASON */}

                    <div className="form-group">

                        <label>
                            Reason
                        </label>

                        <textarea
                            placeholder="Enter appointment reason"
                            value={
                                reason
                            }
                            onChange={(e) =>
                                setReason(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        + Add Appointment
                    </button>

                </form>

            </div>


            {/* =====================================
                APPOINTMENT LIST
            ===================================== */}

            <div className="department-list-card">

                <h2>
                    Appointment List
                </h2>


                {/* LOADING */}

                {loading && (

                    <p>
                        Loading appointments...
                    </p>

                )}


                {/* ERROR */}

                {error && (

                    <p className="error-message">
                        {error}
                    </p>

                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    appointments.length === 0 && (

                        <p className="empty-message">
                            No appointments found.
                        </p>

                    )}


                {/* TABLE */}

                {!loading &&
                    !error &&
                    appointments.length > 0 && (

                        <div className="appointment-table-wrapper">

                            <table className="appointment-table">

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
                                            Date & Time
                                        </th>

                                        <th>
                                            Reason
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {appointments.map(
                                        (appointment) => (

                                            <tr
                                                key={
                                                    appointment.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        appointment.id
                                                    }
                                                </td>


                                                <td>
                                                    {getPatientName(
                                                        appointment.patientId
                                                    )}
                                                </td>


                                                <td>
                                                    {getDoctorName(
                                                        appointment.doctorId
                                                    )}
                                                </td>


                                                <td>
                                                    {formatDateTime(
                                                        appointment.appointmentDateTime
                                                    )}
                                                </td>


                                                <td>
                                                    {
                                                        appointment.reason
                                                    }
                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            appointment.status ===
                                                            "COMPLETED"
                                                                ? "status-active"
                                                                : appointment.status ===
                                                                  "CANCELLED"
                                                                ? "status-inactive"
                                                                : "status-pending"
                                                        }
                                                    >

                                                        {
                                                            appointment.status
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="appointment-actions">


                                                        {/* CONFIRM */}

                                                        {appointment.status ===
                                                            "SCHEDULED" && (

                                                            <button
                                                                type="button"
                                                                className="status-button"
                                                                onClick={() =>
                                                                    handleStatus(
                                                                        appointment.id,
                                                                        "COMPLETED"
                                                                    )
                                                                }
                                                            >
                                                                Complete
                                                            </button>

                                                        )}


                                                        {/* CANCEL */}

                                                        {appointment.status !==
                                                            "CANCELLED" &&
                                                            appointment.status !==
                                                                "COMPLETED" && (

                                                                <button
                                                                    type="button"
                                                                    className="cancel-action-button"
                                                                    onClick={() =>
                                                                        handleStatus(
                                                                            appointment.id,
                                                                            "CANCELLED"
                                                                        )
                                                                    }
                                                                >
                                                                    Cancel
                                                                </button>

                                                            )}


                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    appointment.id
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

export default Appointments;