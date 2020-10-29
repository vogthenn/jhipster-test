package com.savinggrains.service;

import com.savinggrains.domain.Grain;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Grain}.
 */
public interface GrainService {

    /**
     * Save a grain.
     *
     * @param grain the entity to save.
     * @return the persisted entity.
     */
    Grain save(Grain grain);

    /**
     * Get all the grains.
     *
     * @return the list of entities.
     */
    List<Grain> findAll();


    /**
     * Get the "id" grain.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Grain> findOne(Long id);

    /**
     * Delete the "id" grain.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
