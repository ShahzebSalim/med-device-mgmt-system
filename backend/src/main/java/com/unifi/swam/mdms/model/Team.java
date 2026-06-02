package com.unifi.swam.mdms.model;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "team") // Explicitly set to singular
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 120)
    private String name;

    // Adding the description column since your SQL script inserts it
    @Column(length = 255)
    private String description;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    @JsonbTransient
    private List<Personnel> personnel = new ArrayList<>();

    @OneToMany(mappedBy = "team")
    @JsonbTransient
    private List<MedicalDevice> devices = new ArrayList<>();

    public Team() {}

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<Personnel> getPersonnel() { return personnel; }
    public void setPersonnel(List<Personnel> personnel) { this.personnel = personnel; }

    public List<MedicalDevice> getDevices() { return devices; }
    public void setDevices(List<MedicalDevice> devices) { this.devices = devices; }
}