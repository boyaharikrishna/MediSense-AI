import { useEffect, useState } from "react";

import {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    updateDoctorStatus,
    getDepartments
} from "../services/api";

function Doctors() {

    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==================== LOAD DOCTORS ====================

    const loadDoctors = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getDoctors();

            setDoctors(result.data || []);

        } catch (err) {
            console.error(err);
            setError("Unable to load doctors.");
        } finally {
            setLoading(false);
        }
    };


    // ==================== LOAD DEPARTMENTS ====================

    const loadDepartments = async () => {
        try {
            const result = await getDepartments();

            setDepartments(result.data || []);

        } catch (err) {
            console.error("Unable to load departments", err);
        }
    };


    // ==================== INITIAL LOAD ====================

    useEffect(() => {
        loadDoctors();
        loadDepartments();
    }, []);


    // ==================== CLEAR FORM ====================

    const clearForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setSpecialization("");
        setDepartmentId("");
        setEditingId(null);
    };


    // ==================== CREATE / UPDATE ====================

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (
            !name.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !specialization.trim() ||
            !departmentId
        ) {
            alert("Please fill all fields.");
            return;
        }

        const doctorData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            specialization: specialization.trim(),
            departmentId: Number(departmentId),
            active: true
        };

        try {

            if (editingId !== null) {

                await updateDoctor(
                    editingId,
                    doctorData
                );

                alert("Doctor updated successfully.");

            } else {

                await createDoctor(
                    doctorData
                );

                alert("Doctor created successfully.");
            }

            clearForm();

            await loadDoctors();

        } catch (err) {

            console.error(err);

            alert(
                editingId !== null
                    ? "Failed to update doctor."
                    : "Failed to create doctor."
            );
        }
    };


    // ==================== EDIT ====================

    const handleEdit = (doctor) => {

        setEditingId(doctor.id);

        setName(doctor.name || "");
        setEmail(doctor.email || "");
        setPhone(doctor.phone || "");

        setSpecialization(
            doctor.specialization || ""
        );

        setDepartmentId(
            doctor.departmentId
                ? String(doctor.departmentId)
                : ""
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==================== DELETE ====================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDoctor(id);

            alert("Doctor deleted successfully.");

            await loadDoctors();

        } catch (err) {

            console.error(err);

            alert("Failed to delete doctor.");
        }
    };


    // ==================== STATUS ====================

    const handleStatus = async (id, currentStatus) => {

        try {

            await updateDoctorStatus(
                id,
                !currentStatus
            );

            await loadDoctors();

        } catch (err) {

            console.error(err);

            alert("Failed to update doctor status.");
        }
    };


    // ==================== DEPARTMENT NAME ====================

    const getDepartmentName = (id) => {

        const department = departments.find(
            (item) => item.id === id
        );

        return department
            ? department.name
            : id;
    };


    // ==================== UI ====================

    return (

        <div className="doctor-page">

            <h1>Doctors</h1>

            <p className="page-description">
                Manage hospital doctors
            </p>


            {/* ==================== FORM ==================== */}

            <div className="department-form-card">

                <h2>
                    {editingId !== null
                        ? "Edit Doctor"
                        : "Add Doctor"}
                </h2>


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Doctor Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter doctor name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Phone
                        </label>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Specialization
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Cardiologist"
                            value={specialization}
                            onChange={(e) =>
                                setSpecialization(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Department
                        </label>

                        <select
                            value={departmentId}
                            onChange={(e) =>
                                setDepartmentId(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select Department
                            </option>

                            {departments.map(
                                (department) => (

                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    <button
                        type="submit"
                        className="primary-button"
                    >
                        {editingId !== null
                            ? "Update Doctor"
                            : "+ Add Doctor"}
                    </button>


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


            {/* ==================== DOCTOR LIST ==================== */}

            <div className="department-list-card">

                <h2>
                    Doctor List
                </h2>


                {loading && (
                    <p>Loading doctors...</p>
                )}


                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}


                {!loading &&
                    !error &&
                    doctors.length === 0 && (

                        <p className="empty-message">
                            No doctors found.
                        </p>

                    )}


                {!loading &&
                    !error &&
                    doctors.length > 0 && (

                        <div className="doctor-table-wrapper">

                            <table className="doctor-table">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Specialization</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>


                                <tbody>

                                    {doctors.map(
                                        (doctor) => (

                                            <tr
                                                key={doctor.id}
                                            >

                                                <td>
                                                    {doctor.id}
                                                </td>

                                                <td>
                                                    {doctor.name}
                                                </td>

                                                <td>
                                                    {doctor.email}
                                                </td>

                                                <td>
                                                    {doctor.phone}
                                                </td>

                                                <td>
                                                    {doctor.specialization}
                                                </td>

                                                <td>
                                                    {getDepartmentName(
                                                        doctor.departmentId
                                                    )}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            doctor.active
                                                                ? "status-active"
                                                                : "status-inactive"
                                                        }
                                                    >
                                                        {doctor.active
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="doctor-actions">

                                                        <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    doctor
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
                                                                    doctor.id,
                                                                    doctor.active
                                                                )
                                                            }
                                                        >
                                                            {doctor.active
                                                                ? "Deactivate"
                                                                : "Activate"}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    doctor.id
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

export default Doctors;