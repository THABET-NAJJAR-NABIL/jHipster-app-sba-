package com.app.sba.web.rest;

import com.app.sba.domain.ChartPieModel;
import com.app.sba.repository.ChartPieModelRepository;
import com.app.sba.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.app.sba.domain.ChartPieModel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChartPieModelResource {

    private final Logger log = LoggerFactory.getLogger(ChartPieModelResource.class);

    private static final String ENTITY_NAME = "chartPieModel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChartPieModelRepository chartPieModelRepository;

    public ChartPieModelResource(ChartPieModelRepository chartPieModelRepository) {
        this.chartPieModelRepository = chartPieModelRepository;
    }

    /**
     * {@code POST  /chart-pie-models} : Create a new chartPieModel.
     *
     * @param chartPieModel the chartPieModel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chartPieModel, or with status {@code 400 (Bad Request)} if the chartPieModel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chart-pie-models")
    public ResponseEntity<ChartPieModel> createChartPieModel(@Valid @RequestBody ChartPieModel chartPieModel) throws URISyntaxException {
        log.debug("REST request to save ChartPieModel : {}", chartPieModel);
        if (chartPieModel.getId() != null) {
            throw new BadRequestAlertException("A new chartPieModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChartPieModel result = chartPieModelRepository.save(chartPieModel);
        return ResponseEntity.created(new URI("/api/chart-pie-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chart-pie-models} : Updates an existing chartPieModel.
     *
     * @param chartPieModel the chartPieModel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chartPieModel,
     * or with status {@code 400 (Bad Request)} if the chartPieModel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chartPieModel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chart-pie-models")
    public ResponseEntity<ChartPieModel> updateChartPieModel(@Valid @RequestBody ChartPieModel chartPieModel) throws URISyntaxException {
        log.debug("REST request to update ChartPieModel : {}", chartPieModel);
        if (chartPieModel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChartPieModel result = chartPieModelRepository.save(chartPieModel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chartPieModel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chart-pie-models} : get all the chartPieModels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chartPieModels in body.
     */
    @GetMapping("/chart-pie-models")
    public List<ChartPieModel> getAllChartPieModels() {
        log.debug("REST request to get all ChartPieModels");
        return chartPieModelRepository.findAll();
    }

    /**
     * {@code GET  /chart-pie-models/:id} : get the "id" chartPieModel.
     *
     * @param id the id of the chartPieModel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chartPieModel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chart-pie-models/{id}")
    public ResponseEntity<ChartPieModel> getChartPieModel(@PathVariable Long id) {
        log.debug("REST request to get ChartPieModel : {}", id);
        Optional<ChartPieModel> chartPieModel = chartPieModelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chartPieModel);
    }

    /**
     * {@code DELETE  /chart-pie-models/:id} : delete the "id" chartPieModel.
     *
     * @param id the id of the chartPieModel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chart-pie-models/{id}")
    public ResponseEntity<Void> deleteChartPieModel(@PathVariable Long id) {
        log.debug("REST request to delete ChartPieModel : {}", id);
        chartPieModelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
