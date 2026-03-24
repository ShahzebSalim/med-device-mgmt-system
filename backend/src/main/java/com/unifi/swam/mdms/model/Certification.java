package com.unifi.swam.mdms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "certifications")
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 140)
    private String name;

    @Column(nullable = false, length = 120)
    private String standard;

    @Column(nullable = false)
    private LocalDate expiryDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "device_id", nullable = false)
    private MedicalDevice device;

    public Certification() {}

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getStandard() { return standard; }
    public void setStandard(String standard) { this.standard = standard; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public MedicalDevice getDevice() { return device; }
    public void setDevice(MedicalDevice device) { this.device = device; }
}