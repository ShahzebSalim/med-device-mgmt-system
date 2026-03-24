package com.unifi.swam.mdms.rest;

import com.unifi.swam.mdms.dtos.CertificationDTO;
import com.unifi.swam.mdms.mappers.CertificationMapper;
import com.unifi.swam.mdms.model.Certification;
import com.unifi.swam.mdms.services.CertificationService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CertificationResource {

    @Inject
    CertificationService certificationService;

    @GET
    @Path("/devices/{deviceId}/certifications")
    public List<CertificationDTO> listByDevice(@PathParam("deviceId") long deviceId) {
        return certificationService.listByDevice(deviceId).stream().map(CertificationMapper::toDTO).toList();
    }

    @POST
    @Path("/devices/{deviceId}/certifications")
    public CertificationDTO createForDevice(@PathParam("deviceId") long deviceId, CertificationDTO dto) {
        Certification c = new Certification();
        CertificationMapper.applyToEntity(dto, c);
        return CertificationMapper.toDTO(certificationService.createForDevice(deviceId, c));
    }

    @PUT
    @Path("/certifications/{certId}")
    public CertificationDTO update(@PathParam("certId") long certId, CertificationDTO dto) {
        Certification patch = new Certification();
        CertificationMapper.applyToEntity(dto, patch);
        return CertificationMapper.toDTO(certificationService.update(certId, patch));
    }

    @DELETE
    @Path("/certifications/{certId}")
    public void delete(@PathParam("certId") long certId) {
        certificationService.delete(certId);
    }
}
