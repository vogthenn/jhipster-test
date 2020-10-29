package com.savinggrains.service;

import com.savinggrains.domain.PurchaseOrder;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PurchaseOrder}.
 */
public interface PurchaseOrderService {

    /**
     * Save a purchaseOrder.
     *
     * @param purchaseOrder the entity to save.
     * @return the persisted entity.
     */
    PurchaseOrder save(PurchaseOrder purchaseOrder);

    /**
     * Get all the purchaseOrders.
     *
     * @return the list of entities.
     */
    List<PurchaseOrder> findAll();


    /**
     * Get the "id" purchaseOrder.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PurchaseOrder> findOne(Long id);

    /**
     * Delete the "id" purchaseOrder.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
