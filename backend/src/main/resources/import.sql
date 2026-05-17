SET FOREIGN_KEY_CHECKS = 0;

-- 1. POPULATE THE ENGINEERING TEAMS 
-- (Targets both capitalized 'Team' and plural 'teams' to ensure coverage in Linux environments)
INSERT INTO Team (id, name) VALUES (1, 'Sterile Assembly Operations (SAO)');
INSERT INTO Team (id, name) VALUES (2, 'Bio-Wearable Sensors Group');
INSERT INTO Team (id, name) VALUES (3, 'Cardio-Diagnostic R&D');

INSERT INTO teams (id, name) VALUES (1, 'Sterile Assembly Operations (SAO)');
INSERT INTO teams (id, name) VALUES (2, 'Bio-Wearable Sensors Group');
INSERT INTO teams (id, name) VALUES (3, 'Cardio-Diagnostic R&D');

-- 2. POPULATE R&D PERSONNEL 
-- (Restores all-caps 'ADMIN' to fully satisfy Java Enum compilation properties)
INSERT INTO personnel (id, name, email, role, team_id) VALUES (2, 'Aneeza Maroof', 'aneeza.maroof@edu.unifi.it', 'TEAM_LEAD', 1);
INSERT INTO personnel (id, name, email, role, team_id) VALUES (3, 'Shahzeb Salim', 'shahzeb.salim@edu.unifi.it', 'TEAM_MANAGER', 2);
INSERT INTO personnel (id, name, email, role, team_id) VALUES (1, 'Dr. Elena Rossi', 'elena.rossi@edu.unifi.it', 'EXECUTIVE', 3);

-- 3. POPULATE THE MEDICAL DEVICE CATALOGUE 
-- (Supplies the explicit 'createdAt' column parameter using native SQL timestamp functions)
INSERT INTO medical_devices (id, name, udi, version, status, team_id, createdAt) VALUES (1, 'CardioPulse X100 Echo', '00812345678901', '1.0.2', 'ACTIVE', 3, NOW());
INSERT INTO medical_devices (id, name, udi, version, status, team_id, createdAt) VALUES (2, 'BioTrack Glucose Sensor', '00899911122233', '0.9.5', 'ACTIVE', 2, NOW());

SET FOREIGN_KEY_CHECKS = 1;