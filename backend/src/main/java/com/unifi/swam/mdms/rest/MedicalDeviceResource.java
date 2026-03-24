package com.unifi.swam.mdms.rest;

import com.unifi.swam.mdms.dtos.MedicalDeviceDTO;
import com.unifi.swam.mdms.model.MedicalDevice;
import com.unifi.swam.mdms.services.MedicalDeviceService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/devices")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MedicalDeviceResource {

    @Inject
    MedicalDeviceService deviceService;

    private static MedicalDeviceDTO toDTO(MedicalDevice d) {
        MedicalDeviceDTO dto = new MedicalDeviceDTO();
        dto.setId(d.getId());
        dto.setUdi(d.getUdi());
        dto.setName(d.getName());
        dto.setVersion(d.getVersion());
        dto.setStatus(d.getStatus());
        dto.setCreatedAt(d.getCreatedAt());
        return dto;
    }

    private static void applyToEntity(MedicalDeviceDTO dto, MedicalDevice e) {
        e.setUdi(dto.getUdi());
        e.setName(dto.getName());
        e.setVersion(dto.getVersion());
        e.setStatus(dto.getStatus());
    }

    @GET
    public List<MedicalDeviceDTO> list() {
        return deviceService.list().stream().map(MedicalDeviceResource::toDTO).toList();
    }

    @GET
    @Path("/{id}")
    public MedicalDeviceDTO get(@PathParam("id") long id) {
        return toDTO(deviceService.get(id));
    }

    @POST
    public MedicalDeviceDTO create(MedicalDeviceDTO dto) {
        MedicalDevice e = new MedicalDevice();
        applyToEntity(dto, e);
        return toDTO(deviceService.create(e));
    }

    @PUT
    @Path("/{id}")
    public MedicalDeviceDTO update(@PathParam("id") long id, MedicalDeviceDTO dto) {
        MedicalDevice patch = new MedicalDevice();
        applyToEntity(dto, patch);
        return toDTO(deviceService.update(id, patch));
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam("id") long id) {
        deviceService.delete(id);
    }
}
