import { Router } from "express";
const PatientController = require("../controllers/patient");
const VaccineController = require("../controllers/vaccine");
const FabricatorController = require("../controllers/fabricator");

const router = Router();

// Rotas de Paciente
router.get('/patients', PatientController.findAll);
router.get('/patients/categories', PatientController.findPatientsCategories);
router.get('/patients/:id', PatientController.findById);
router.get('/patients/doses/:id', PatientController.findPatientDoses);
router.get('/patients/region/count', PatientController.countPatientsByRegion);
router.post('/patients', PatientController.create);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.delete);

// Rotas de Vacina
router.get('/vaccines', VaccineController.findAllVaccineAndItsFab);
router.get('/vaccines/ages', VaccineController.findAllVaccineAndAge);
router.get('/vaccines/batches/count', VaccineController.countVaccineBatches);

// Rotas de Fabricantes
router.get('/fabricators', FabricatorController.findAll);
router.get('/fabricators/doses/count', FabricatorController.countDosesByFabricator);

module.exports = router;