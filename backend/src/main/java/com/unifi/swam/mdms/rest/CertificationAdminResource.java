package com.unifi.swam.mdms.rest;

import com.unifi.swam.mdms.dtos.CertificationDTO;
import com.unifi.swam.mdms.mappers.CertificationMapper;
import com.unifi.swam.mdms.model.Certification;
import com.unifi.swam.mdms.services.CertificationService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;


import jakarta.validation.Valid;
@Path("/certifications")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CertificationAdminResource {

    @Inject
    CertificationService certificationService;

    @PUT
    @Path("/{certId}")
    public CertificationDTO update(@PathParam("certId") long certId, CertificationDTO dto) {
        Certification patch = new Certification();
        CertificationMapper.applyToEntity(dto, patch);
        return CertificationMapper.toDTO(certificationService.update(certId, patch));
    }

    @DELETE
    @Path("/{certId}")
    public void delete(@PathParam("certId") long certId) {
        certificationService.delete(certId);
    }
}
