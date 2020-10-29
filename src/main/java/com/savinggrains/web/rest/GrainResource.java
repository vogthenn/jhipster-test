package com.savinggrains.web.rest;

import com.savinggrains.domain.Grain;
import com.savinggrains.service.GrainService;
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
 * REST controller for managing {@link com.savinggrains.domain.Grain}.
 */
@RestController
@RequestMapping("/api")
public class GrainResource {

    private final Logger log = LoggerFactory.getLogger(GrainResource.class);

    private static final String ENTITY_NAME = "grain";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrainService grainService;

    public GrainResource(GrainService grainService) {
        this.grainService = grainService;
    }

    /**
     * {@code POST  /grains} : Create a new grain.
     *
     * @param grain the grain to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grain, or with status {@code 400 (Bad Request)} if the grain has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grains")
    public ResponseEntity<Grain> createGrain(@RequestBody Grain grain) throws URISyntaxException {
        log.debug("REST request to save Grain : {}", grain);
        if (grain.getId() != null) {
            throw new BadRequestAlertException("A new grain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Grain result = grainService.save(grain);
        return ResponseEntity.created(new URI("/api/grains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grains} : Updates an existing grain.
     *
     * @param grain the grain to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grain,
     * or with status {@code 400 (Bad Request)} if the grain is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grain couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grains")
    public ResponseEntity<Grain> updateGrain(@RequestBody Grain grain) throws URISyntaxException {
        log.debug("REST request to update Grain : {}", grain);
        if (grain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Grain result = grainService.save(grain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, grain.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /grains} : get all the grains.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grains in body.
     */
    @GetMapping("/grains")
    public List<Grain> getAllGrains() {
        log.debug("REST request to get all Grains");
        return grainService.findAll();
    }

    /**
     * {@code GET  /grains/:id} : get the "id" grain.
     *
     * @param id the id of the grain to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grain, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grains/{id}")
    public ResponseEntity<Grain> getGrain(@PathVariable Long id) {
        log.debug("REST request to get Grain : {}", id);
        Optional<Grain> grain = grainService.findOne(id);
        return ResponseUtil.wrapOrNotFound(grain);
    }

    /**
     * {@code DELETE  /grains/:id} : delete the "id" grain.
     *
     * @param id the id of the grain to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grains/{id}")
    public ResponseEntity<Void> deleteGrain(@PathVariable Long id) {
        log.debug("REST request to delete Grain : {}", id);
        grainService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
