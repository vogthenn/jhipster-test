package com.savinggrains.web.rest;

import com.savinggrains.JhipstertestApp;
import com.savinggrains.config.TestSecurityConfiguration;
import com.savinggrains.domain.Bag;
import com.savinggrains.repository.BagRepository;
import com.savinggrains.service.BagService;

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

import com.savinggrains.domain.enumeration.QualityGrade;
/**
 * Integration tests for the {@link BagResource} REST controller.
 */
@SpringBootTest(classes = { JhipstertestApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class BagResourceIT {

    private static final QualityGrade DEFAULT_QUALITY = QualityGrade.GOOD;
    private static final QualityGrade UPDATED_QUALITY = QualityGrade.OK;

    @Autowired
    private BagRepository bagRepository;

    @Autowired
    private BagService bagService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBagMockMvc;

    private Bag bag;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bag createEntity(EntityManager em) {
        Bag bag = new Bag()
            .quality(DEFAULT_QUALITY);
        return bag;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bag createUpdatedEntity(EntityManager em) {
        Bag bag = new Bag()
            .quality(UPDATED_QUALITY);
        return bag;
    }

    @BeforeEach
    public void initTest() {
        bag = createEntity(em);
    }

    @Test
    @Transactional
    public void createBag() throws Exception {
        int databaseSizeBeforeCreate = bagRepository.findAll().size();
        // Create the Bag
        restBagMockMvc.perform(post("/api/bags").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bag)))
            .andExpect(status().isCreated());

        // Validate the Bag in the database
        List<Bag> bagList = bagRepository.findAll();
        assertThat(bagList).hasSize(databaseSizeBeforeCreate + 1);
        Bag testBag = bagList.get(bagList.size() - 1);
        assertThat(testBag.getQuality()).isEqualTo(DEFAULT_QUALITY);
    }

    @Test
    @Transactional
    public void createBagWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bagRepository.findAll().size();

        // Create the Bag with an existing ID
        bag.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBagMockMvc.perform(post("/api/bags").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bag)))
            .andExpect(status().isBadRequest());

        // Validate the Bag in the database
        List<Bag> bagList = bagRepository.findAll();
        assertThat(bagList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBags() throws Exception {
        // Initialize the database
        bagRepository.saveAndFlush(bag);

        // Get all the bagList
        restBagMockMvc.perform(get("/api/bags?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bag.getId().intValue())))
            .andExpect(jsonPath("$.[*].quality").value(hasItem(DEFAULT_QUALITY.toString())));
    }
    
    @Test
    @Transactional
    public void getBag() throws Exception {
        // Initialize the database
        bagRepository.saveAndFlush(bag);

        // Get the bag
        restBagMockMvc.perform(get("/api/bags/{id}", bag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bag.getId().intValue()))
            .andExpect(jsonPath("$.quality").value(DEFAULT_QUALITY.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBag() throws Exception {
        // Get the bag
        restBagMockMvc.perform(get("/api/bags/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBag() throws Exception {
        // Initialize the database
        bagService.save(bag);

        int databaseSizeBeforeUpdate = bagRepository.findAll().size();

        // Update the bag
        Bag updatedBag = bagRepository.findById(bag.getId()).get();
        // Disconnect from session so that the updates on updatedBag are not directly saved in db
        em.detach(updatedBag);
        updatedBag
            .quality(UPDATED_QUALITY);

        restBagMockMvc.perform(put("/api/bags").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBag)))
            .andExpect(status().isOk());

        // Validate the Bag in the database
        List<Bag> bagList = bagRepository.findAll();
        assertThat(bagList).hasSize(databaseSizeBeforeUpdate);
        Bag testBag = bagList.get(bagList.size() - 1);
        assertThat(testBag.getQuality()).isEqualTo(UPDATED_QUALITY);
    }

    @Test
    @Transactional
    public void updateNonExistingBag() throws Exception {
        int databaseSizeBeforeUpdate = bagRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBagMockMvc.perform(put("/api/bags").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bag)))
            .andExpect(status().isBadRequest());

        // Validate the Bag in the database
        List<Bag> bagList = bagRepository.findAll();
        assertThat(bagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBag() throws Exception {
        // Initialize the database
        bagService.save(bag);

        int databaseSizeBeforeDelete = bagRepository.findAll().size();

        // Delete the bag
        restBagMockMvc.perform(delete("/api/bags/{id}", bag.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bag> bagList = bagRepository.findAll();
        assertThat(bagList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
