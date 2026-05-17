SET FOREIGN_KEY_CHECKS = 0;

-- SHOTGUN TEAMS (Hits all possible Hibernate naming strategies)
INSERT INTO team (id, name) VALUES (1, 'Sterile Assembly Operations (SAO)');
INSERT INTO teams (id, name) VALUES (1, 'Sterile Assembly Operations (SAO)');
INSERT INTO Team (id, name) VALUES (1, 'Sterile Assembly Operations (SAO)');
INSERT INTO team (id, name) VALUES (2, 'Bio-Wearable Sensors Group');
INSERT INTO teams (id, name) VALUES (2, 'Bio-Wearable Sensors Group');
INSERT INTO Team (id, name) VALUES (2, 'Bio-Wearable Sensors Group');
INSERT INTO team (id, name) VALUES (3, 'Cardio-Diagnostic R&D');
INSERT INTO teams (id, name) VALUES (3, 'Cardio-Diagnostic R&D');
INSERT INTO Team (id, name) VALUES (3, 'Cardio-Diagnostic R&D');

-- SHOTGUN PERSONNEL
INSERT INTO personnel (id, name, email, role, team_id) VALUES (2, 'Aneeza Maroof', 'aneeza.maroof@edu.unifi.it', 'TEAM_LEAD', 1);
INSERT INTO personnels (id, name, email, role, team_id) VALUES (2, 'Aneeza Maroof', 'aneeza.maroof@edu.unifi.it', 'TEAM_LEAD', 1);
INSERT INTO Personnel (id, name, email, role, team_id) VALUES (2, 'Aneeza Maroof', 'aneeza.maroof@edu.unifi.it', 'TEAM_LEAD', 1);
INSERT INTO personnel (id, name, email, role, team_id) VALUES (3, 'Shahzeb Salim', 'shahzeb.salim@edu.unifi.it', 'TEAM_MANAGER', 2);
INSERT INTO personnels (id, name, email, role, team_id) VALUES (3, 'Shahzeb Salim', 'shahzeb.salim@edu.unifi.it', 'TEAM_MANAGER', 2);
INSERT INTO Personnel (id, name, email, role, team_id) VALUES (3, 'Shahzeb Salim', 'shahzeb.salim@edu.unifi.it', 'TEAM_MANAGER', 2);
INSERT INTO personnel (id, name, email, role, team_id) VALUES (1, 'Dr. Elena Rossi', 'elena.rossi@edu.unifi.it', 'EXECUTIVE', 3);
INSERT INTO personnels (id, name, email, role, team_id) VALUES (1, 'Dr. Elena Rossi', 'elena.rossi@edu.unifi.it', 'EXECUTIVE', 3);
INSERT INTO Personnel (id, name, email, role, team_id) VALUES (1, 'Dr. Elena Rossi', 'elena.rossi@edu.unifi.it', 'EXECUTIVE', 3);

-- SHOTGUN MEDICAL DEVICES
INSERT INTO medical_devices (id, name, udi, version, status, team_id, createdAt) VALUES (1, 'CardioPulse X100 Echo', '00812345678901', '1.0.2', 'ACTIVE', 3, NOW());
INSERT INTO medical_device (id, name, udi, version, status, team_id, createdAt) VALUES (1, 'CardioPulse X100 Echo', '00812345678901', '1.0.2', 'ACTIVE', 3, NOW());
INSERT INTO MedicalDevice (id, name, udi, version, status, team_id, createdAt) VALUES (1, 'CardioPulse X100 Echo', '00812345678901', '1.0.2', 'ACTIVE', 3, NOW());

INSERT INTO medical_devices (id, name, udi, version, status, team_id, createdAt) VALUES (2, 'BioTrack Glucose Sensor', '00899911122233', '0.9.5', 'ACTIVE', 2, NOW());
INSERT INTO medical_device (id, name, udi, version, status, team_id, createdAt) VALUES (2, 'BioTrack Glucose Sensor', '00899911122233', '0.9.5', 'ACTIVE', 2, NOW());
INSERT INTO MedicalDevice (id, name, udi, version, status, team_id, createdAt) VALUES (2, 'BioTrack Glucose Sensor', '00899911122233', '0.9.5', 'ACTIVE', 2, NOW());

SET FOREIGN_KEY_CHECKS = 1;