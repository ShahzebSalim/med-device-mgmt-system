package com.unifi.swam.mdms.services;

import com.unifi.swam.mdms.model.Team;
import com.unifi.swam.mdms.services.exceptions.ConflictException;
import com.unifi.swam.mdms.services.exceptions.NotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class TeamService {

    @PersistenceContext(unitName = "mdms")
    private EntityManager em;

    public List<Team> list() {
        return em.createQuery("select t from Team t order by t.name", Team.class)
                .getResultList();
    }

    public Team get(long id) {
        Team team = em.find(Team.class, id);
        if (team == null) throw new NotFoundException("Team not found: " + id);
        return team;
    }

    @Transactional
    public Team create(Team team) {
        em.persist(team);
        return team;
    }

    @Transactional
    public Team update(long id, String name) {
        Team team = get(id);
        team.setName(name);
        return team;
    }

    @Transactional
    public void delete(long id) {
        Team team = get(id);

        // Rule A: block deletion if personnel exists
        if (team.getPersonnel() != null && !team.getPersonnel().isEmpty()) {
            throw new ConflictException("Cannot delete team " + id + " because it still has personnel assigned.");
        }

        em.remove(team);
    }
}
