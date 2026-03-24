package com.unifi.swam.mdms.rest;

import com.unifi.swam.mdms.dtos.PersonnelDTO;
import com.unifi.swam.mdms.mappers.PersonnelMapper;
import com.unifi.swam.mdms.model.Personnel;
import com.unifi.swam.mdms.services.PersonnelService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/personnel")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonnelResource {

    @Inject
    PersonnelService personnelService;

    @GET
    public List<PersonnelDTO> list() {
        return personnelService.list().stream().map(PersonnelMapper::toDTO).toList();
    }

    @GET
    @Path("/{id}")
    public PersonnelDTO get(@PathParam("id") long id) {
        return PersonnelMapper.toDTO(personnelService.get(id));
    }

    @POST
    public PersonnelDTO create(PersonnelDTO dto) {
        Personnel p = new Personnel();
        PersonnelMapper.applyToEntity(dto, p);
        return PersonnelMapper.toDTO(personnelService.create(p, dto.getTeamId()));
    }

    @PUT
    @Path("/{id}")
    public PersonnelDTO update(@PathParam("id") long id, PersonnelDTO dto) {
        Personnel patch = new Personnel();
        PersonnelMapper.applyToEntity(dto, patch);
        return PersonnelMapper.toDTO(personnelService.update(id, patch, dto.getTeamId()));
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") long id) {
        personnelService.delete(id);
    }
}
