package com.unifi.swam.mdms.rest;

import com.unifi.swam.mdms.dtos.CertificationDTO;
import com.unifi.swam.mdms.mappers.CertificationMapper;
import com.unifi.swam.mdms.model.Certification;
import com.unifi.swam.mdms.services.CertificationService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/devices/{deviceId}/certifications")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CertificationResource {

    @Inject
    CertificationService certificationService;

    @GET
    public List<CertificationDTO> listByDevice(@PathParam("deviceId") long deviceId) {
        return certificationService.listByDevice(deviceId).stream()
                .map(CertificationMapper::toDTO)
                .toList();
    }

    @POST
    public CertificationDTO createForDevice(@PathParam("deviceId") long deviceId, CertificationDTO dto) {
        Certification c = new Certification();
        CertificationMapper.applyToEntity(dto, c);
        return CertificationMapper.toDTO(certificationService.createForDevice(deviceId, c));
    }
}
