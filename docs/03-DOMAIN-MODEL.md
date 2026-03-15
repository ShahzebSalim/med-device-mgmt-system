# Domain Model Documentation

## Key Entities

### MedicalDevice
- **Attributes:**
  - `id`: Unique identifier for the medical device.
  - `name`: Name of the device.
  - `udi`: Unique Device Identifier.
  - `version`: Current version of the device.
  - `certifications`: List of certifications associated with the device.
  - `status`: Current status of the device (e.g., active, inactive).

- **Relationships:**
  - Has many `Certification`
  - Has many `Sales/Production Records`


### Personnel
- **Attributes:**
  - `id`: Unique identifier for the personnel.
  - `name`: Name of the personnel.
  - `role`: Role of the personnel in the organization.
  - `department`: Department in which the personnel works.
  - `email`: Contact email for the personnel.

- **Relationships:**
  - Belongs to a `Department/Team`


### Manufacturer
- **Attributes:**
  - `id`: Unique identifier for the manufacturer.
  - `company_name`: Name of the manufacturing company.
  - `location`: Physical location of the manufacturer.
  - `contact`: Contact information for the manufacturer.

- **Relationships:**
  - Has many `MedicalDevices`


### Department/Team
- **Attributes:**
  - `id`: Unique identifier for the department/team.
  - `name`: Name of the department/team.
  - `team_lead`: Personnel who leads the department/team.
  - `personnel_count`: Number of personnel in the department/team.

- **Relationships:**
  - Has many `Personnel`


### Sales/Production Record
- **Attributes:**
  - `id`: Unique identifier for the record.
  - `device_id`: Identifier for the associated medical device.
  - `quantity`: Quantity sold or produced.
  - `date`: Date of the transaction.
  - `status`: Current status of the record (e.g., completed, pending).

- **Relationships:**
  - Belongs to a `MedicalDevice`


### Certification
- **Attributes:**
  - `id`: Unique identifier for the certification.
  - `name`: Name of the certification.
  - `standard`: Certification standard that is met.
  - `expiry_date`: Expiry date of the certification.
  - `device_id`: Identifier for the associated medical device.

- **Relationships:**
  - Belongs to a `MedicalDevice`

## Conclusion
This domain model captures the key entities relevant to the medical device management system and outlines their attributes, relationships, and roles within the system. This documentation can serve as a guide for developers and stakeholders involved in the system's architecture and implementation.