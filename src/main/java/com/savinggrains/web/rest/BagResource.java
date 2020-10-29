package com.savinggrains.web.rest;

import com.savinggrains.domain.Bag;
import com.savinggrains.service.BagService;
import com.savinggrains.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.savinggrains.domain.Bag}.
 */
@RestController
@RequestMapping("/api")
public class BagResource {

    private final Logger log = LoggerFactory.getLogger(BagResource.class);

    private static final String ENTITY_NAME = "bag";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BagService bagService;

    public BagResource(BagService bagService) {
        this.bagService = bagService;
    }

    /**
     * {@code POST  /bags} : Create a new bag.
     *
     * @param bag the bag to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bag, or with status {@code 400 (Bad Request)} if the bag has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bags")
    public ResponseEntity<Bag> createBag(@RequestBody Bag bag) throws URISyntaxException {
        log.debug("REST request to save Bag : {}", bag);
        if (bag.getId() != null) {
            throw new BadRequestAlertException("A new bag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bag result = bagService.save(bag);
        return ResponseEntity.created(new URI("/api/bags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bags} : Updates an existing bag.
     *
     * @param bag the bag to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bag,
     * or with status {@code 400 (Bad Request)} if the bag is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bag couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bags")
    public ResponseEntity<Bag> updateBag(@RequestBody Bag bag) throws URISyntaxException {
        log.debug("REST request to update Bag : {}", bag);
        if (bag.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bag result = bagService.save(bag);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bag.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bags} : get all the bags.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bags in body.
     */
    @GetMapping("/bags")
    public List<Bag> getAllBags() {
        log.debug("REST request to get all Bags");
        return bagService.findAll();
    }

    /**
     * {@code GET  /bags/:id} : get the "id" bag.
     *
     * @param id the id of the bag to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bag, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bags/{id}")
    public ResponseEntity<Bag> getBag(@PathVariable Long id) {
        log.debug("REST request to get Bag : {}", id);
        Optional<Bag> bag = bagService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bag);
    }

    /**
     * {@code DELETE  /bags/:id} : delete the "id" bag.
     *
     * @param id the id of the bag to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bags/{id}")
    public ResponseEntity<Void> deleteBag(@PathVariable Long id) {
        log.debug("REST request to delete Bag : {}", id);
        bagService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
