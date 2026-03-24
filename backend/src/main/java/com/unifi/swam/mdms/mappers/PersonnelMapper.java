package com.unifi.swam.mdms.mappers;

import com.unifi.swam.mdms.dtos.PersonnelDTO;
import com.unifi.swam.mdms.model.Personnel;

public final class PersonnelMapper {

    private PersonnelMapper() {}

    public static PersonnelDTO toDTO(Personnel p) {
        if (p == null) return null;

        PersonnelDTO dto = new PersonnelDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setEmail(p.getEmail());
        dto.setRole(p.getRole());
        dto.setTeamId(p.getTeam() != null ? p.getTeam().getId() : null);
        return dto;
    }

    /**
     * Applies mutable fields from DTO to entity.
     * Note: team association should be handled in a service (lookup Team by id).
     */
    public static void applyToEntity(PersonnelDTO dto, Personnel entity) {
        if (dto == null || entity == null) return;

        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setRole(dto.getRole());
    }
}
