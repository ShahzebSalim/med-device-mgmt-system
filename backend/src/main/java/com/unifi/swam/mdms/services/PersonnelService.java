package com.unifi.swam.mdms.services;

import com.unifi.swam.mdms.model.Personnel;
import com.unifi.swam.mdms.model.Team;
import com.unifi.swam.mdms.services.exceptions.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class PersonnelService {

    @PersistenceContext(unitName = "mdms")
    private EntityManager em;

    public List<Personnel> list() {
        return em.createQuery("select p from Personnel p order by p.name", Personnel.class)
                .getResultList();
    }

    public Personnel get(long id) {
        Personnel p = em.find(Personnel.class, id);
        if (p == null) throw new NotFoundException("Personnel not found: " + id);
        return p;
    }

    @Transactional
    public Personnel create(Personnel p, Long teamId) {
        if (teamId != null) {
            Team team = em.find(Team.class, teamId);
            if (team == null) throw new NotFoundException("Team not found: " + teamId);
            p.setTeam(team);
        }
        em.persist(p);
        return p;
    }

    @Transactional
    public Personnel update(long id, Personnel patch, Long teamId) {
        Personnel p = get(id);

        p.setName(patch.getName());
        p.setEmail(patch.getEmail());
        p.setRole(patch.getRole());

        if (teamId == null) {
            p.setTeam(null);
        } else {
            Team team = em.find(Team.class, teamId);
            if (team == null) throw new NotFoundException("Team not found: " + teamId);
            p.setTeam(team);
        }

        return p;
    }

    @Transactional
    public void delete(long id) {
        Personnel p = get(id);
        em.remove(p);
    }
}
