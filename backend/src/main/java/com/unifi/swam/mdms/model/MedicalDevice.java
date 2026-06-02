package com.unifi.swam.mdms.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "medical_device") // Explicitly set to singular snake_case
public class MedicalDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String udi;

    @Column(nullable = false)
    private String name;

    @Column(name = "product_line")
    private String productLine;

    @Column(nullable = false)
    private String version;

    @Enumerated(EnumType.STRING)
    private MedicalDeviceStatus status = MedicalDeviceStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "team_id")
    private Team team;

    // Explicitly mapping created_at to avoid Hibernate guessing
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Certification> certifications = new ArrayList<>();

    public MedicalDevice() {}

    public Long getId() { return id; }
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
    
    public Team getTeam() { return team; }
    public void setTeam(Team team) { this.team = team; }

    public List<Certification> getCertifications() { return certifications; }
    public void setCertifications(List<Certification> certifications) { this.certifications = certifications; }
}