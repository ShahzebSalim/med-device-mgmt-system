package com.unifi.swam.mdms.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class MedicalDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String udi;

    @OneToMany(mappedBy = "device")
    private List<Certification> certifications;

    // Getters and Setters
}
