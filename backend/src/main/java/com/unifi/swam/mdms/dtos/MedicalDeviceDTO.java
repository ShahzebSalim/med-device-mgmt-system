package com.unifi.swam.mdms.dtos;

import com.unifi.swam.mdms.model.MedicalDeviceStatus;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class MedicalDeviceDTO {

    private Long id;
    private String udi;
    private String name;
    private String version;
    private MedicalDeviceStatus status;
    private Instant createdAt;

    private List<CertificationDTO> certifications = new ArrayList<>();

    public MedicalDeviceDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUdi() { return udi; }
    public void setUdi(String udi) { this.udi = udi; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public MedicalDeviceStatus getStatus() { return status; }
    public void setStatus(MedicalDeviceStatus status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public List<CertificationDTO> getCertifications() { return certifications; }
    public void setCertifications(List<CertificationDTO> certifications) { this.certifications = certifications; }
}