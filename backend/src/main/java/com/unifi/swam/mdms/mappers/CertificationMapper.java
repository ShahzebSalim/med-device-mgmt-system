package com.unifi.swam.mdms.mappers;

import com.unifi.swam.mdms.dtos.CertificationDTO;
import com.unifi.swam.mdms.model.Certification;

public final class CertificationMapper {

    private CertificationMapper() {}

    public static CertificationDTO toDTO(Certification c) {
        if (c == null) return null;

        CertificationDTO dto = new CertificationDTO();
        dto.setId(c.getId());
        dto.setName(c.getName());
        dto.setStandard(c.getStandard());
        dto.setExpiryDate(c.getExpiryDate());
        dto.setDeviceId(c.getDevice() != null ? c.getDevice().getId() : null);
        return dto;
    }

    public static void applyToEntity(CertificationDTO dto, Certification entity) {
        if (dto == null || entity == null) return;
        entity.setName(dto.getName());
        entity.setStandard(dto.getStandard());
        entity.setExpiryDate(dto.getExpiryDate());
        // device is handled by service (lookup by id/path param)
    }
}
