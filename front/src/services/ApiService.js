import axios from 'axios';

export class ApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 1000,
    })
  }

  async getPatients() {
    const patients = {};
    const response = await this.axios.get('/patients')
    
    let i = 0;
    response.data.data.map((p) => {
      patients[i++] = p;
    })
    
    return patients; 
  }

  async getPatientDetails(id) {
    const response = await this.axios.get(`/patients/${id}`);

    return response.data.data[0];
  }

  async getPatientCategories() {
    const response = await this.axios.get('/patients/categories');

    return response.data.data;
  }

  async getPatientCountryStates() {
    const response = await this.axios.get('/patients/region/count');

    return response.data.data;
  }

  async getPatientDoses(id) {
    const response = await this.axios.get(`/patients/doses/${id}`);

    return response.data.data;
  }

  async getVaccinesPerBatch() {
    const response = await this.axios.get('/vaccines/batches/count');

    return response.data.data;
  }

  async getVaccinesPerAge() {
    const response = await this.axios.get('/vaccines/ages');

    return response.data.data;
  }

  async getDosesPerFabricator() {
    const response = await this.axios.get('/fabricators/doses/count');

    return response.data.data;
  }

  async getFabricators() {
    const response = await this.axios.get('/fabricators');

    return response.data.data;
  }

  async getBatches() {
    const response = await this.axios.get('/vaccines');

    return response.data.data;
  }
}