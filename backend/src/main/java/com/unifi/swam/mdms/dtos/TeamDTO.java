package com.unifi.swam.mdms.dtos;

import java.util.ArrayList;
import java.util.List;

public class TeamDTO {

    private Long id;
    private String name;

    // Option 1: lightweight relationship
    private List<Long> personnelIds = new ArrayList<>();

    public TeamDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<Long> getPersonnelIds() { return personnelIds; }
    public void setPersonnelIds(List<Long> personnelIds) { this.personnelIds = personnelIds; }
}
