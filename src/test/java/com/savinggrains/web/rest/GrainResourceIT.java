package com.savinggrains.web.rest;

import com.savinggrains.JhipstertestApp;
import com.savinggrains.config.TestSecurityConfiguration;
import com.savinggrains.domain.Grain;
import com.savinggrains.repository.GrainRepository;
import com.savinggrains.service.GrainService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GrainResource} REST controller.
 */
@SpringBootTest(classes = { JhipstertestApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class GrainResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GrainRepository grainRepository;

    @Autowired
    private GrainService grainService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGrainMockMvc;

    private Grain grain;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grain createEntity(EntityManager em) {
        Grain grain = new Grain()
            .name(DEFAULT_NAME);
        return grain;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grain createUpdatedEntity(EntityManager em) {
        Grain grain = new Grain()
            .name(UPDATED_NAME);
        return grain;
    }

    @BeforeEach
    public void initTest() {
        grain = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrain() throws Exception {
        int databaseSizeBeforeCreate = grainRepository.findAll().size();
        // Create the Grain
        restGrainMockMvc.perform(post("/api/grains").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grain)))
            .andExpect(status().isCreated());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeCreate + 1);
        Grain testGrain = grainList.get(grainList.size() - 1);
        assertThat(testGrain.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGrainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grainRepository.findAll().size();

        // Create the Grain with an existing ID
        grain.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrainMockMvc.perform(post("/api/grains").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grain)))
            .andExpect(status().isBadRequest());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGrains() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        // Get all the grainList
        restGrainMockMvc.perform(get("/api/grains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grain.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        // Get the grain
        restGrainMockMvc.perform(get("/api/grains/{id}", grain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grain.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingGrain() throws Exception {
        // Get the grain
        restGrainMockMvc.perform(get("/api/grains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrain() throws Exception {
        // Initialize the database
        grainService.save(grain);

        int databaseSizeBeforeUpdate = grainRepository.findAll().size();

        // Update the grain
        Grain updatedGrain = grainRepository.findById(grain.getId()).get();
        // Disconnect from session so that the updates on updatedGrain are not directly saved in db
        em.detach(updatedGrain);
        updatedGrain
            .name(UPDATED_NAME);

        restGrainMockMvc.perform(put("/api/grains").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrain)))
            .andExpect(status().isOk());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeUpdate);
        Grain testGrain = grainList.get(grainList.size() - 1);
        assertThat(testGrain.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGrain() throws Exception {
        int databaseSizeBeforeUpdate = grainRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrainMockMvc.perform(put("/api/grains").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grain)))
            .andExpect(status().isBadRequest());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrain() throws Exception {
        // Initialize the database
        grainService.save(grain);

        int databaseSizeBeforeDelete = grainRepository.findAll().size();

        // Delete the grain
        restGrainMockMvc.perform(delete("/api/grains/{id}", grain.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
