import axios from 'axios';

export class ApiService {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000/',
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

  async getPatientDoses(id) {
    const response = await this.axios.get(`/patientDoses/${id}`);

    return response.data.data;
  }
}