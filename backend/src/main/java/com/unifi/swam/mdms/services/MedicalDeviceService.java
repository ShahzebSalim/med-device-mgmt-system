package com.unifi.swam.mdms.services;

import com.unifi.swam.mdms.model.MedicalDevice;
import com.unifi.swam.mdms.services.exceptions.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class MedicalDeviceService {

    @PersistenceContext(unitName = "mdms")
    private EntityManager em;

    public List<MedicalDevice> list() {
        return em.createQuery("select d from MedicalDevice d order by d.createdAt desc", MedicalDevice.class)
                .getResultList();
    }

    public MedicalDevice get(long id) {
        MedicalDevice d = em.find(MedicalDevice.class, id);
        if (d == null) throw new NotFoundException("MedicalDevice not found: " + id);
        return d;
    }

    @Transactional
    public MedicalDevice create(MedicalDevice d) {
        em.persist(d);
        return d;
    }

    @Transactional
    public MedicalDevice update(long id, MedicalDevice patch) {
        MedicalDevice d = get(id);
        d.setUdi(patch.getUdi());
        d.setName(patch.getName());
        d.setVersion(patch.getVersion());
        d.setStatus(patch.getStatus());
        return d;
    }

    @Transactional
    public void delete(long id) {
        MedicalDevice d = get(id);
        em.remove(d);
    }
}
