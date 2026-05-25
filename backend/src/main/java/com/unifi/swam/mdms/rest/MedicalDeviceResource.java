package com.unifi.swam.mdms.rest;

import com.unifi.swam.mdms.dtos.MedicalDeviceDTO;
import com.unifi.swam.mdms.mappers.CertificationMapper;
import com.unifi.swam.mdms.model.MedicalDevice;
import com.unifi.swam.mdms.services.CertificationService;
import com.unifi.swam.mdms.services.MedicalDeviceService;
import com.unifi.swam.mdms.services.TeamService; 
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import java.util.stream.Collectors;

@Path("/devices")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MedicalDeviceResource {

    @Inject
    MedicalDeviceService deviceService;

    @Inject
    CertificationService certificationService;

    @Inject
    TeamService teamService; 

    private MedicalDeviceDTO toDTOWithoutCerts(MedicalDevice d) {
        MedicalDeviceDTO dto = new MedicalDeviceDTO();
        dto.setId(d.getId());
        dto.setUdi(d.getUdi());
        dto.setName(d.getName());
        dto.setProductLine(d.getProductLine()); 
        dto.setVersion(d.getVersion());
        dto.setStatus(d.getStatus());
        dto.setCreatedAt(d.getCreatedAt());

        // MAP TEAM INFO
        if (d.getTeam() != null) {
            dto.setTeamId(d.getTeam().getId());
            dto.setTeamName(d.getTeam().getName());
        }
        return dto;
    }

    private MedicalDeviceDTO toDTOWithCerts(MedicalDevice d) {
        MedicalDeviceDTO dto = toDTOWithoutCerts(d);
        dto.setCertifications(
                certificationService.listByDevice(d.getId()).stream()
                        .map(CertificationMapper::toDTO)
                        .collect(Collectors.toList())
        );
        return dto;
    }

    private void applyToEntity(MedicalDeviceDTO dto, MedicalDevice e) {
        e.setUdi(dto.getUdi());
        e.setName(dto.getName());
        e.setProductLine(dto.getProductLine()); 
        e.setVersion(dto.getVersion());
        e.setStatus(dto.getStatus());

        // SET TEAM RELATIONSHIP
        if (dto.getTeamId() != null) {
            e.setTeam(teamService.get(dto.getTeamId()));
        }
    }

    @GET
    public List<MedicalDeviceDTO> list() {
        return deviceService.list().stream().map(this::toDTOWithoutCerts).collect(Collectors.toList());
    }

    @GET
    @Path("/{id}")
    public MedicalDeviceDTO get(@PathParam("id") long id) {
        return toDTOWithCerts(deviceService.get(id));
    }

    @POST
    public MedicalDeviceDTO create(MedicalDeviceDTO dto) {
        MedicalDevice e = new MedicalDevice();
        applyToEntity(dto, e);
        return toDTOWithoutCerts(deviceService.create(e));
    }

    @PUT
    @Path("/{id}")
    public MedicalDeviceDTO update(@PathParam("id") long id, MedicalDeviceDTO dto) {
        MedicalDevice patch = new MedicalDevice();
        applyToEntity(dto, patch);
        return toDTOWithoutCerts(deviceService.update(id, patch));
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") long id) {
        deviceService.delete(id);
    }
}