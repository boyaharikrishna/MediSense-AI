import { useEffect, useState } from "react";

import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    updateDepartmentStatus
} from "../services/api";


function Departments() {

    const [departments, setDepartments] = useState([]);

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================================
    // LOAD DEPARTMENTS
    // =========================================

    const loadDepartments = async () => {

        try {

            setLoading(true);
            setError("");

            const result =
                await getDepartments();

            setDepartments(
                result.data || []
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load departments."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        loadDepartments();

    }, []);


    // =========================================
    // CLEAR FORM
    // =========================================

    const clearForm = () => {

        setName("");
        setCode("");
        setDescription("");

        setEditingId(null);

    };


    // =========================================
    // CREATE / UPDATE DEPARTMENT
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (
            !name.trim() ||
            !code.trim()
        ) {

            alert(
                "Department name and code are required."
            );

            return;
        }


        const departmentData = {

            name: name.trim(),

            code: code.trim(),

            description:
                description.trim(),

            active: true

        };


        try {

            if (editingId) {

                await updateDepartment(
                    editingId,
                    departmentData
                );

                alert(
                    "Department updated successfully."
                );

            } else {

                await createDepartment(
                    departmentData
                );

                alert(
                    "Department created successfully."
                );

            }


            clearForm();

            await loadDepartments();

        } catch (err) {

            console.error(err);

            alert(
                editingId
                    ? "Failed to update department."
                    : "Failed to create department."
            );

        }
    };


    // =========================================
    // EDIT DEPARTMENT
    // =========================================

    const handleEdit = (department) => {

        setEditingId(
            department.id
        );

        setName(
            department.name
        );

        setCode(
            department.code
        );

        setDescription(
            department.description || ""
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };


    // =========================================
    // DELETE DEPARTMENT
    // =========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this department?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            await deleteDepartment(id);

            alert(
                "Department deleted successfully."
            );


            if (editingId === id) {

                clearForm();

            }


            await loadDepartments();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to delete department."
            );

        }
    };


    // =========================================
    // ACTIVATE / DEACTIVATE
    // =========================================

    const handleStatus = async (
        id,
        currentStatus
    ) => {

        try {

            await updateDepartmentStatus(

                id,

                !currentStatus

            );


            await loadDepartments();

        } catch (err) {

            console.error(err);

            alert(
                "Failed to update department status."
            );

        }
    };


    return (

        <div className="department-page">


            {/* PAGE TITLE */}

            <h1>
                Departments
            </h1>


            <p className="page-description">
                Manage hospital departments
            </p>


            {/* =====================================
                ADD / EDIT DEPARTMENT
            ===================================== */}

            <div className="department-form-card">


                <h2>

                    {editingId
                        ? "Edit Department"
                        : "Add Department"}

                </h2>


                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* DEPARTMENT NAME */}

                    <div className="form-group">

                        <label>
                            Department Name
                        </label>


                        <input
                            type="text"
                            placeholder="Enter department name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* DEPARTMENT CODE */}

                    <div className="form-group">

                        <label>
                            Department Code
                        </label>


                        <input
                            type="text"
                            placeholder="Example: CARD"
                            value={code}
                            onChange={(e) =>
                                setCode(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>


                        <textarea
                            placeholder="Enter department description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* FORM BUTTONS */}

                    <div className="form-buttons">


                        <button
                            type="submit"
                            className="primary-button"
                        >

                            {editingId
                                ? "Update Department"
                                : "+ Add Department"}

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
                DEPARTMENT LIST
            ===================================== */}

            <div className="department-list-card">


                <h2>
                    Department List
                </h2>


                {/* LOADING */}

                {loading && (

                    <p>
                        Loading departments...
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
                    departments.length === 0 && (

                        <p className="empty-message">
                            No departments found.
                        </p>

                    )}


                {/* TABLE */}

                {!loading &&
                    !error &&
                    departments.length > 0 && (

                        <div className="table-container">


                            <table>


                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Code
                                        </th>

                                        <th>
                                            Description
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


                                    {departments.map(
                                        (department) => (

                                            <tr
                                                key={
                                                    department.id
                                                }
                                            >


                                                {/* ID */}

                                                <td>
                                                    {department.id}
                                                </td>


                                                {/* NAME */}

                                                <td>
                                                    {department.name}
                                                </td>


                                                {/* CODE */}

                                                <td>
                                                    {department.code}
                                                </td>


                                                {/* DESCRIPTION */}

                                                <td>

                                                    {department.description ||
                                                        "-"}

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={
                                                            department.active
                                                                ? "status-active"
                                                                : "status-inactive"
                                                        }
                                                    >

                                                        {department.active
                                                            ? "Active"
                                                            : "Inactive"}

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td>


                                                    <div className="action-buttons">


                                                        {/* EDIT */}

                                                        <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    department
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        {/* ACTIVATE / DEACTIVATE */}

                                                        <button
                                                            type="button"
                                                            className="status-button"
                                                            onClick={() =>
                                                                handleStatus(
                                                                    department.id,
                                                                    department.active
                                                                )
                                                            }
                                                        >

                                                            {department.active
                                                                ? "Deactivate"
                                                                : "Activate"}

                                                        </button>


                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    department.id
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


export default Departments;