package com.unifi.swam.mdms.model;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 120)
    private String name;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    @JsonbTransient
        private List<Personnel> personnel = new ArrayList<>();

    public Team() {}

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    
    public List<Personnel> getPersonnel() { return personnel; }
    public void setPersonnel(List<Personnel> personnel) { this.personnel = personnel; }
}