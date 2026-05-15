package com.unifi.swam.mdms.dtos;

import com.unifi.swam.mdms.model.MedicalDeviceStatus;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class MedicalDeviceDTO {
    private Long id;
    private String udi;
    private String name;
    private String productLine;
    private String version;
    private MedicalDeviceStatus status;
    private Instant createdAt;

    // --- ADD THESE FOR TRACEABILITY ---
    private Long teamId;
    private String teamName;

    private List<CertificationDTO> certifications = new ArrayList<>();

    public MedicalDeviceDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUdi() { return udi; }
    public void setUdi(String udi) { this.udi = udi; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getProductLine() { return productLine; }
    public void setProductLine(String productLine) { this.productLine = productLine; }
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    public MedicalDeviceStatus getStatus() { return status; }
    public void setStatus(MedicalDeviceStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    // --- ADD TEAM GETTERS/SETTERS ---
    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }
    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }

    public List<CertificationDTO> getCertifications() { return certifications; }
    public void setCertifications(List<CertificationDTO> certifications) { this.certifications = certifications; }
}