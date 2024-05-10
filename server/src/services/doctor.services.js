import {doctorRepository} from '../repositories/doctor.repository.js';

const findallDoctors = async () => {
    try {
        const doctors = await doctorRepository.findallDoctors();
        return doctors;
    } catch (error) {
      console.error("Error en el servicio al obtener todos los doctores:", error);
      throw new Error("Error al obtener todos los doctores");
    }
};

const findDoctorById = async (id) => {
    try {
        const doctor = await doctorRepository.findDoctorbyid(id);
        return doctor;
    } catch (error) {
      console.log('aca pasa 5o');
      console.error("Error en el servicio al obtener doctor por ID:", error);
      throw new Error("Error al obtener doctor por ID");
    }
};  
const findDoctorbySpeciality = async (specialtyId) => {
    try {
        const doctors = await doctorRepository.findDoctorbySpeciality(specialtyId);
        return doctors;
    } catch (error) {
      console.error("Error en el servicio al obtener doctor por especialidad:", error);
      throw new Error("Error al obtener doctor por especialidad");
    }
};

const createDoctor = async (doctorData) => {
    try {
        const licence = doctorData.licence;
        if(licence){
            const licence_exists = await doctorRepository.checkLicence(licence);
            if(licence_exists){
                throw new Error(`Doctor with licence ${licence} already exists`);
            }
        }
        const email = doctorData.email;
        if(email){
            const email_exists = await doctorRepository.checkEmail(email);
            if(email_exists){
                throw new Error(`Doctor with email ${email} already exists`);
            }
        }
        const newDoctor = await doctorRepository.createDoctor(doctorData);
        return newDoctor;
    } catch (error) {
      console.error("Error en el servicio al crear doctor:", error);
      throw error;
    }
}

const updateDoctor = async (id, doctorData) => {
  try {
    const doctorToUpdate = await doctorRepository.findDoctorbyid(id);
    if (!doctorToUpdate) {
      throw new Error(`Doctor with ID ${id} not found`);
    }
    const licence = doctorData.licence;
        if(licence){
            const licence_exists = await doctorRepository.checkLicence(licence);
            if(licence_exists){
                throw new Error(`Doctor with licence ${licence} already exists`);
            }
        }
    const email = doctorData.email;
    if(email){
        const email_exists = await doctorRepository.checkEmail(email);
        if(email_exists){
            throw new Error(`Doctor with email ${email} already exists`);
        }
    }
    await doctorRepository.updateDoctor(id, doctorData);
    return doctorToUpdate;
  } catch (error) {
    console.error("Error en el servicio al actualizar doctor:", error);
    throw error;
  }
};


const deleteDoctor = async (id) => {
    try {
        const doctorToDelete = await doctorRepository.findDoctorbyid(id);
        if (doctorToDelete) {
            await doctorRepository.deleteDoctor(id);
        }
        return doctorToDelete;
    } catch (error) {
      console.error("Error en el servicio al eliminar doctor:", error);
      throw new Error("Error al eliminar doctor");
    }
}

export default {
    findallDoctors,
    findDoctorById,
    findDoctorbySpeciality,
    createDoctor,
    updateDoctor,
    deleteDoctor
};

