package com.unifi.swam.mdms.dtos;

import com.unifi.swam.mdms.model.PersonnelRole;

public class PersonnelDTO {

    private Long id;
    private String name;
    private String email;
    private PersonnelRole role;

    // association (nullable)
    private Long teamId;

    public PersonnelDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public PersonnelRole getRole() { return role; }
    public void setRole(PersonnelRole role) { this.role = role; }

    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }
}
