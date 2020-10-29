package com.savinggrains.service;

import com.savinggrains.domain.Bag;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Bag}.
 */
public interface BagService {

    /**
     * Save a bag.
     *
     * @param bag the entity to save.
     * @return the persisted entity.
     */
    Bag save(Bag bag);

    /**
     * Get all the bags.
     *
     * @return the list of entities.
     */
    List<Bag> findAll();


    /**
     * Get the "id" bag.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Bag> findOne(Long id);

    /**
     * Delete the "id" bag.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
