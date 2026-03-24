package com.unifi.swam.mdms.rest;

import com.unifi.swam.mdms.dtos.TeamDTO;
import com.unifi.swam.mdms.mappers.TeamMapper;
import com.unifi.swam.mdms.model.Team;
import com.unifi.swam.mdms.services.TeamService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/teams")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TeamResource {

    @Inject
    TeamService teamService;

    @GET
    public List<TeamDTO> list() {
        return teamService.list().stream().map(TeamMapper::toDTO).toList();
    }

    @GET
    @Path("/{id}")
    public TeamDTO get(@PathParam("id") long id) {
        return TeamMapper.toDTO(teamService.get(id));
    }

    @POST
    public TeamDTO create(TeamDTO dto) {
        Team entity = new Team();
        entity.setName(dto.getName());
        return TeamMapper.toDTO(teamService.create(entity));
    }

    @PUT
    @Path("/{id}")
    public TeamDTO update(@PathParam("id") long id, TeamDTO dto) {
        return TeamMapper.toDTO(teamService.update(id, dto.getName()));
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") long id) {
        teamService.delete(id);
    }
}
