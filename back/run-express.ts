require('dotenv').config();
import express, { Application } from 'express';


const patient = require('./controllers/patient');
const vaccine = require('./controllers/vaccine');
const fabricator = require('./controllers/fabricator');

import cors from 'cors';

const port = process.env.PORT;

let app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/patient', patient.findAll);

app.get('/patient/:id', patient.findById);

app.get('/vaccineAndFab', vaccine.findAllVaccineAndItsFab);
app.get('/patientAndCat', patient.findPatientsCategories);

app.get('/patientDoses/:id', patient.findPatientDoses);
app.get('/vaccineAndAge', vaccine.findAllVaccineAndAge);

app.get('/fabricator', fabricator.findAll);
app.get('/patientPerRegion', patient.countPatientsByRegion);
app.get('/vaccinePerBatch', vaccine.countVaccineBatches);

app.get('/dosesPerFabricator', fabricator.countDosesByFabricator);

app.listen(port, function ():void {
    console.log('Listening on port 3000!');
});