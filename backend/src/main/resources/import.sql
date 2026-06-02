SET FOREIGN_KEY_CHECKS = 0;

-- EXACT TARGET: team
INSERT INTO team (id, name, description) VALUES (1, 'Sterile Assembly Operations (SAO)', 'Specialized LAB Unit');
INSERT INTO team (id, name, description) VALUES (2, 'Bio-Wearable Sensors Group', 'Specialized LAB Unit');
INSERT INTO team (id, name, description) VALUES (3, 'Cardio-Diagnostic R&D', 'Specialized LAB Unit');

-- EXACT TARGET: personnel
INSERT INTO personnel (id, name, email, role, team_id) VALUES (1, 'Dr. Elena Rossi', 'elena.rossi@edu.unifi.it', 'EXECUTIVE', 3);
INSERT INTO personnel (id, name, email, role, team_id) VALUES (2, 'Aneeza Maroof', 'aneeza.maroof@edu.unifi.it', 'TEAM_LEAD', 1);
INSERT INTO personnel (id, name, email, role, team_id) VALUES (3, 'Shahzeb Salim', 'shahzeb.salim@edu.unifi.it', 'TEAM_MANAGER', 2);

-- EXACT TARGET: medical_device
INSERT INTO medical_device (id, name, udi, version, status, team_id, created_at, product_line) VALUES (1, 'CardioPulse X100 Echo', '00812345678901', '1.0.2', 'ACTIVE', 3, NOW(), 'General');
INSERT INTO medical_device (id, name, udi, version, status, team_id, created_at, product_line) VALUES (2, 'BioTrack Glucose Sensor', '00899911122233', '0.9.5', 'ACTIVE', 2, NOW(), 'General');

SET FOREIGN_KEY_CHECKS = 1;