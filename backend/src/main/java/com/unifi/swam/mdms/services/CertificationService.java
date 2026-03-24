package com.unifi.swam.mdms.services;

import com.unifi.swam.mdms.model.Certification;
import com.unifi.swam.mdms.model.MedicalDevice;
import com.unifi.swam.mdms.services.exceptions.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class CertificationService {

    @PersistenceContext(unitName = "mdms")
    private EntityManager em;

    public List<Certification> listByDevice(long deviceId) {
        return em.createQuery(
                        "select c from Certification c where c.device.id = :deviceId order by c.expiryDate asc",
                        Certification.class
                )
                .setParameter("deviceId", deviceId)
                .getResultList();
    }

    public Certification get(long certId) {
        Certification c = em.find(Certification.class, certId);
        if (c == null) throw new NotFoundException("Certification not found: " + certId);
        return c;
    }

    @Transactional
    public Certification createForDevice(long deviceId, Certification c) {
        MedicalDevice d = em.find(MedicalDevice.class, deviceId);
        if (d == null) throw new NotFoundException("MedicalDevice not found: " + deviceId);

        c.setDevice(d);
        em.persist(c);
        return c;
    }

    @Transactional
    public Certification update(long certId, Certification patch) {
        Certification c = get(certId);
        c.setName(patch.getName());
        c.setStandard(patch.getStandard());
        c.setExpiryDate(patch.getExpiryDate());
        return c;
    }

    @Transactional
    public void delete(long certId) {
        Certification c = get(certId);
        em.remove(c);
    }
}
