import axios from 'axios';

export class ApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 1000,
    })
  }

  async getPatients() {
    const response = await this.axios.get('/patient')
    
    return response.data.data.map(p => p.paciente_id) 
  }

  async getPatientDetails(id) {
    const response = await this.axios.get(`/patient/${id}`);

    return response.data.data[0];
  }

  async getPatientCategories() {
    const response = await this.axios.get('/patientAndCat');

    return response.data.data;
  }

  async getPatientCountryStates() {
    const response = await this.axios.get('/patientPerRegion');

    return response.data.data;
  }

  async getPatientDoses(id) {
    const response = await this.axios.get(`/patientDoses/${id}`);

    return response.data.data;
  }

  async getVaccinesPerBatch() {
    const response = await this.axios.get('/vaccinePerBatch');

    return response.data.data;
  }

  async getVaccinesPerAge() {
    const response = await this.axios.get('/vaccineAndAge');

    return response.data.data;
  }

  async getDosesPerFabricator() {
    const response = await this.axios.get('/dosesPerFabricator');

    return response.data.data;
  }

  async getFabricators() {
    const response = await this.axios.get('/fabricator');

    return response.data.data;
  }
}