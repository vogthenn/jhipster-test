package com.savinggrains.service;

import com.savinggrains.domain.Warehouse;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Warehouse}.
 */
public interface WarehouseService {

    /**
     * Save a warehouse.
     *
     * @param warehouse the entity to save.
     * @return the persisted entity.
     */
    Warehouse save(Warehouse warehouse);

    /**
     * Get all the warehouses.
     *
     * @return the list of entities.
     */
    List<Warehouse> findAll();


    /**
     * Get the "id" warehouse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Warehouse> findOne(Long id);

    /**
     * Delete the "id" warehouse.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
