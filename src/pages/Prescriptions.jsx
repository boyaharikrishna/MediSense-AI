import { useEffect, useState } from "react";
import {
  getPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPatients,
  getDoctors,
} from "../services/api";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    prescribedDate: "",
  });

  // Load all data
  useEffect(() => {
    loadPrescriptions();
    loadPatients();
    loadDoctors();
  }, []);

  // Get Prescriptions
  const loadPrescriptions = async () => {
    try {
      const response = await getPrescriptions();

      setPrescriptions(response.data || []);
    } catch (error) {
      console.error(error);
      alert("Unable to load prescriptions");
    }
  };

  // Get Patients
  const loadPatients = async () => {
    try {
      const response = await getPatients();

      setPatients(response.data || []);
    } catch (error) {
      console.error(error);
      alert("Unable to load patients");
    }
  };

  // Get Doctors
  const loadDoctors = async () => {
    try {
      const response = await getDoctors();

      setDoctors(response.data || []);
    } catch (error) {
      console.error(error);
      alert("Unable to load doctors");
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add / Update Prescription
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientId ||
      !formData.doctorId ||
      !formData.medicineName ||
      !formData.dosage ||
      !formData.frequency ||
      !formData.duration ||
      !formData.prescribedDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    const prescriptionData = {
      patientId: Number(formData.patientId),
      doctorId: Number(formData.doctorId),
      medicineName: formData.medicineName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      duration: formData.duration,
      instructions: formData.instructions,
      prescribedDate: formData.prescribedDate,
    };

    try {
      if (editingId) {
        await updatePrescription(editingId, prescriptionData);

        alert("Prescription updated successfully");
      } else {
        await createPrescription(prescriptionData);

        alert("Prescription added successfully");
      }

      resetForm();
      loadPrescriptions();
    } catch (error) {
      console.error(error);
      alert(
        error.message ||
          "Something went wrong while saving prescription"
      );
    }
  };

  // Edit Prescription
  const handleEdit = (prescription) => {
    setEditingId(prescription.id);

    setFormData({
      patientId: prescription.patientId,
      doctorId: prescription.doctorId,
      medicineName: prescription.medicineName,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      instructions: prescription.instructions || "",
      prescribedDate: prescription.prescribedDate
        ? prescription.prescribedDate.slice(0, 16)
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Prescription
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deletePrescription(id);

      alert("Prescription deleted successfully");

      loadPrescriptions();
    } catch (error) {
      console.error(error);
      alert("Unable to delete prescription");
    }
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);

    setFormData({
      patientId: "",
      doctorId: "",
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
      prescribedDate: "",
    });
  };

  // Format Date
  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString("en-IN");
  };

  return (
    <div className="page-container">
      <h1>Prescriptions</h1>

      <p className="page-subtitle">
        Manage patient prescriptions
      </p>

      {/* Add / Edit Prescription */}
      <div className="form-card">
        <h2>
          {editingId
            ? "Edit Prescription"
            : "Add Prescription"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* Patient */}
            <div className="form-group">
              <label>Patient</label>

              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map((patient) => (
                  <option
                    key={patient.id}
                    value={patient.id}
                  >
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div className="form-group">
              <label>Doctor</label>

              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor.id}
                    value={doctor.id}
                  >
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Medicine Name */}
            <div className="form-group">
              <label>Medicine Name</label>

              <input
                type="text"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                placeholder="Enter medicine name"
              />
            </div>

            {/* Dosage */}
            <div className="form-group">
              <label>Dosage</label>

              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="Example: 500mg"
              />
            </div>

            {/* Frequency */}
            <div className="form-group">
              <label>Frequency</label>

              <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                placeholder="Example: Twice a day"
              />
            </div>

            {/* Duration */}
            <div className="form-group">
              <label>Duration</label>

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Example: 5 days"
              />
            </div>

            {/* Prescribed Date */}
            <div className="form-group">
              <label>Prescribed Date</label>

              <input
                type="datetime-local"
                name="prescribedDate"
                value={formData.prescribedDate}
                onChange={handleChange}
              />
            </div>

            {/* Instructions */}
            <div className="form-group full-width">
              <label>Instructions</label>

              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Enter instructions"
                rows="3"
              />
            </div>

          </div>

          <div className="form-actions">

            <button
              type="submit"
              className="add-btn"
            >
              {editingId
                ? "Update Prescription"
                : "+ Add Prescription"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>
        </form>
      </div>

      {/* Prescription List */}
      <div className="table-card">
        <h2>Prescription List</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Medicine</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Duration</th>
                <th>Instructions</th>
                <th>Prescribed Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {prescriptions.length > 0 ? (
                prescriptions.map((prescription) => (
                  <tr key={prescription.id}>
                    <td>{prescription.id}</td>

                    <td>
                      {prescription.patientName}
                    </td>

                    <td>
                      {prescription.doctorName}
                    </td>

                    <td>
                      {prescription.medicineName}
                    </td>

                    <td>
                      {prescription.dosage}
                    </td>

                    <td>
                      {prescription.frequency}
                    </td>

                    <td>
                      {prescription.duration}
                    </td>

                    <td>
                      {prescription.instructions}
                    </td>

                    <td>
                      {formatDate(
                        prescription.prescribedDate
                      )}
                    </td>

                    <td className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(prescription)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(prescription.id)
                        }
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="no-data"
                  >
                    No prescriptions found
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

export default Prescriptions;