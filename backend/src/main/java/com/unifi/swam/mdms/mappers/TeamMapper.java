package com.unifi.swam.mdms.mappers;

import com.unifi.swam.mdms.dtos.TeamDTO;
import com.unifi.swam.mdms.model.Team;

public final class TeamMapper {

    private TeamMapper() {}

    /**
     * Safe default mapping: does NOT touch lazy collections (e.g. team.getPersonnel()).
     * This avoids "could not initialize proxy - no Session" when entities are detached.
     */
    public static TeamDTO toDTO(Team team) {
        if (team == null) return null;

        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());
        // personnelIds intentionally left empty here
        return dto;
    }

    /**
     * Applies mutable fields from DTO to entity.
     * Note: does not manage personnel association here.
     */
    public static void applyToEntity(TeamDTO dto, Team entity) {
        if (dto == null || entity == null) return;
        entity.setName(dto.getName());
    }
}
