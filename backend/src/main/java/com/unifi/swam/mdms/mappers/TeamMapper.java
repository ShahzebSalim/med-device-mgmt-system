package com.unifi.swam.mdms.mappers;

import com.unifi.swam.mdms.dtos.TeamDTO;
import com.unifi.swam.mdms.model.Personnel;
import com.unifi.swam.mdms.model.Team;

import java.util.stream.Collectors;

public final class TeamMapper {

    private TeamMapper() {}

    public static TeamDTO toDTO(Team team) {
        if (team == null) return null;

        TeamDTO dto = new TeamDTO();
        dto.setId(team.getId());
        dto.setName(team.getName());

        if (team.getPersonnel() != null) {
            dto.setPersonnelIds(
                team.getPersonnel()
                    .stream()
                    .map(Personnel::getId)
                    .collect(Collectors.toList())
            );
        }
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
