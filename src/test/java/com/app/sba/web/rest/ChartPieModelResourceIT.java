package com.app.sba.web.rest;

import com.app.sba.JhipsterApp;
import com.app.sba.domain.ChartPieModel;
import com.app.sba.repository.ChartPieModelRepository;

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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ChartPieModelResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ChartPieModelResourceIT {

    private static final Double DEFAULT_QUANTITY = 1D;
    private static final Double UPDATED_QUANTITY = 2D;

    private static final String DEFAULT_LABLE = "AAAAAAAAAA";
    private static final String UPDATED_LABLE = "BBBBBBBBBB";

    @Autowired
    private ChartPieModelRepository chartPieModelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChartPieModelMockMvc;

    private ChartPieModel chartPieModel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChartPieModel createEntity(EntityManager em) {
        ChartPieModel chartPieModel = new ChartPieModel()
            .quantity(DEFAULT_QUANTITY)
            .lable(DEFAULT_LABLE);
        return chartPieModel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ChartPieModel createUpdatedEntity(EntityManager em) {
        ChartPieModel chartPieModel = new ChartPieModel()
            .quantity(UPDATED_QUANTITY)
            .lable(UPDATED_LABLE);
        return chartPieModel;
    }

    @BeforeEach
    public void initTest() {
        chartPieModel = createEntity(em);
    }

    @Test
    @Transactional
    public void createChartPieModel() throws Exception {
        int databaseSizeBeforeCreate = chartPieModelRepository.findAll().size();

        // Create the ChartPieModel
        restChartPieModelMockMvc.perform(post("/api/chart-pie-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chartPieModel)))
            .andExpect(status().isCreated());

        // Validate the ChartPieModel in the database
        List<ChartPieModel> chartPieModelList = chartPieModelRepository.findAll();
        assertThat(chartPieModelList).hasSize(databaseSizeBeforeCreate + 1);
        ChartPieModel testChartPieModel = chartPieModelList.get(chartPieModelList.size() - 1);
        assertThat(testChartPieModel.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testChartPieModel.getLable()).isEqualTo(DEFAULT_LABLE);
    }

    @Test
    @Transactional
    public void createChartPieModelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chartPieModelRepository.findAll().size();

        // Create the ChartPieModel with an existing ID
        chartPieModel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChartPieModelMockMvc.perform(post("/api/chart-pie-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chartPieModel)))
            .andExpect(status().isBadRequest());

        // Validate the ChartPieModel in the database
        List<ChartPieModel> chartPieModelList = chartPieModelRepository.findAll();
        assertThat(chartPieModelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = chartPieModelRepository.findAll().size();
        // set the field null
        chartPieModel.setQuantity(null);

        // Create the ChartPieModel, which fails.

        restChartPieModelMockMvc.perform(post("/api/chart-pie-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chartPieModel)))
            .andExpect(status().isBadRequest());

        List<ChartPieModel> chartPieModelList = chartPieModelRepository.findAll();
        assertThat(chartPieModelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLableIsRequired() throws Exception {
        int databaseSizeBeforeTest = chartPieModelRepository.findAll().size();
        // set the field null
        chartPieModel.setLable(null);

        // Create the ChartPieModel, which fails.

        restChartPieModelMockMvc.perform(post("/api/chart-pie-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chartPieModel)))
            .andExpect(status().isBadRequest());

        List<ChartPieModel> chartPieModelList = chartPieModelRepository.findAll();
        assertThat(chartPieModelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChartPieModels() throws Exception {
        // Initialize the database
        chartPieModelRepository.saveAndFlush(chartPieModel);

        // Get all the chartPieModelList
        restChartPieModelMockMvc.perform(get("/api/chart-pie-models?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chartPieModel.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())))
            .andExpect(jsonPath("$.[*].lable").value(hasItem(DEFAULT_LABLE)));
    }
    
    @Test
    @Transactional
    public void getChartPieModel() throws Exception {
        // Initialize the database
        chartPieModelRepository.saveAndFlush(chartPieModel);

        // Get the chartPieModel
        restChartPieModelMockMvc.perform(get("/api/chart-pie-models/{id}", chartPieModel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chartPieModel.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()))
            .andExpect(jsonPath("$.lable").value(DEFAULT_LABLE));
    }

    @Test
    @Transactional
    public void getNonExistingChartPieModel() throws Exception {
        // Get the chartPieModel
        restChartPieModelMockMvc.perform(get("/api/chart-pie-models/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChartPieModel() throws Exception {
        // Initialize the database
        chartPieModelRepository.saveAndFlush(chartPieModel);

        int databaseSizeBeforeUpdate = chartPieModelRepository.findAll().size();

        // Update the chartPieModel
        ChartPieModel updatedChartPieModel = chartPieModelRepository.findById(chartPieModel.getId()).get();
        // Disconnect from session so that the updates on updatedChartPieModel are not directly saved in db
        em.detach(updatedChartPieModel);
        updatedChartPieModel
            .quantity(UPDATED_QUANTITY)
            .lable(UPDATED_LABLE);

        restChartPieModelMockMvc.perform(put("/api/chart-pie-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedChartPieModel)))
            .andExpect(status().isOk());

        // Validate the ChartPieModel in the database
        List<ChartPieModel> chartPieModelList = chartPieModelRepository.findAll();
        assertThat(chartPieModelList).hasSize(databaseSizeBeforeUpdate);
        ChartPieModel testChartPieModel = chartPieModelList.get(chartPieModelList.size() - 1);
        assertThat(testChartPieModel.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testChartPieModel.getLable()).isEqualTo(UPDATED_LABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingChartPieModel() throws Exception {
        int databaseSizeBeforeUpdate = chartPieModelRepository.findAll().size();

        // Create the ChartPieModel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChartPieModelMockMvc.perform(put("/api/chart-pie-models")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chartPieModel)))
            .andExpect(status().isBadRequest());

        // Validate the ChartPieModel in the database
        List<ChartPieModel> chartPieModelList = chartPieModelRepository.findAll();
        assertThat(chartPieModelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChartPieModel() throws Exception {
        // Initialize the database
        chartPieModelRepository.saveAndFlush(chartPieModel);

        int databaseSizeBeforeDelete = chartPieModelRepository.findAll().size();

        // Delete the chartPieModel
        restChartPieModelMockMvc.perform(delete("/api/chart-pie-models/{id}", chartPieModel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ChartPieModel> chartPieModelList = chartPieModelRepository.findAll();
        assertThat(chartPieModelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
