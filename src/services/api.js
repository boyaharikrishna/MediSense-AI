const BASE_URL = "http://localhost:8080/api/v1";


// ========================================
// COMMON REQUEST FUNCTION
// ========================================

const request = async (url, options = {}) => {

    const response = await fetch(
        `${BASE_URL}${url}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        }
    );

    let data = null;

    try {

        data = await response.json();

    } catch (error) {

        data = null;

    }

    if (!response.ok) {

        throw new Error(
            data?.message || "Something went wrong"
        );

    }

    return data;

};


// ========================================
// DEPARTMENTS
// ========================================

export const getDepartments = async () => {

    return request("/departments");

};


export const getDepartmentById = async (id) => {

    return request(`/departments/${id}`);

};


export const createDepartment = async (departmentData) => {

    return request("/departments", {
        method: "POST",
        body: JSON.stringify(departmentData)
    });

};


export const updateDepartment = async (
    id,
    departmentData
) => {

    return request(`/departments/${id}`, {
        method: "PUT",
        body: JSON.stringify(departmentData)
    });

};


export const deleteDepartment = async (id) => {

    return request(`/departments/${id}`, {
        method: "DELETE"
    });

};


export const updateDepartmentStatus = async (
    id,
    active
) => {

    return request(`/departments/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
            active: active
        })
    });

};


// ========================================
// DOCTORS
// ========================================

export const getDoctors = async () => {

    return request("/doctors");

};


export const getDoctorById = async (id) => {

    return request(`/doctors/${id}`);

};


export const createDoctor = async (doctorData) => {

    return request("/doctors", {
        method: "POST",
        body: JSON.stringify(doctorData)
    });

};


export const updateDoctor = async (
    id,
    doctorData
) => {

    return request(`/doctors/${id}`, {
        method: "PUT",
        body: JSON.stringify(doctorData)
    });

};


export const deleteDoctor = async (id) => {

    return request(`/doctors/${id}`, {
        method: "DELETE"
    });

};


export const updateDoctorStatus = async (
    id,
    active
) => {

    return request(`/doctors/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
            active: active
        })
    });

};


// ========================================
// PATIENTS
// ========================================

export const getPatients = async () => {

    return request("/patients");

};


export const getPatientById = async (id) => {

    return request(`/patients/${id}`);

};


export const createPatient = async (patientData) => {

    return request("/patients", {
        method: "POST",
        body: JSON.stringify(patientData)
    });

};


export const updatePatient = async (
    id,
    patientData
) => {

    return request(`/patients/${id}`, {
        method: "PUT",
        body: JSON.stringify(patientData)
    });

};


export const deletePatient = async (id) => {

    return request(`/patients/${id}`, {
        method: "DELETE"
    });

};


export const updatePatientStatus = async (
    id,
    active
) => {

    return request(`/patients/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
            active: active
        })
    });

};


// ========================================
// APPOINTMENTS
// ========================================

export const getAppointments = async () => {

    return request("/appointments");

};


export const getAppointmentById = async (id) => {

    return request(`/appointments/${id}`);

};


export const createAppointment = async (
    appointmentData
) => {

    return request("/appointments", {
        method: "POST",
        body: JSON.stringify(appointmentData)
    });

};


export const updateAppointment = async (
    id,
    appointmentData
) => {

    return request(`/appointments/${id}`, {
        method: "PUT",
        body: JSON.stringify(appointmentData)
    });

};


export const deleteAppointment = async (id) => {

    return request(`/appointments/${id}`, {
        method: "DELETE"
    });

};


export const updateAppointmentStatus = async (
    id,
    status
) => {

    return request(`/appointments/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
            status: status
        })
    });

};


// ========================================
// MEDICAL RECORDS
// ========================================

export const getMedicalRecords = async () => {

    return request("/medical-records");

};


export const getMedicalRecordById = async (id) => {

    return request(`/medical-records/${id}`);

};


export const createMedicalRecord = async (
    recordData
) => {

    return request("/medical-records", {
        method: "POST",
        body: JSON.stringify(recordData)
    });

};


export const updateMedicalRecord = async (
    id,
    recordData
) => {

    return request(`/medical-records/${id}`, {
        method: "PUT",
        body: JSON.stringify(recordData)
    });

};


export const deleteMedicalRecord = async (id) => {

    return request(`/medical-records/${id}`, {
        method: "DELETE"
    });

};


// ========================================
// PRESCRIPTIONS
// ========================================

export const getPrescriptions = async () => {

    return request("/prescriptions");

};


export const getPrescriptionById = async (id) => {

    return request(`/prescriptions/${id}`);

};


export const createPrescription = async (
    prescriptionData
) => {

    return request("/prescriptions", {
        method: "POST",
        body: JSON.stringify(prescriptionData)
    });

};


export const updatePrescription = async (
    id,
    prescriptionData
) => {

    return request(`/prescriptions/${id}`, {
        method: "PUT",
        body: JSON.stringify(prescriptionData)
    });

};


export const deletePrescription = async (id) => {

    return request(`/prescriptions/${id}`, {
        method: "DELETE"
    });

};


// ========================================
// AI SYMPTOM CHECKER
// ========================================

export const checkSymptoms = async (symptomData) => {

    return request("/symptoms/check", {
        method: "POST",
        body: JSON.stringify(symptomData)
    });

};
