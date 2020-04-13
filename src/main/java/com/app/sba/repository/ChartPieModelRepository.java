package com.app.sba.repository;

import com.app.sba.domain.ChartPieModel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ChartPieModel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChartPieModelRepository extends JpaRepository<ChartPieModel, Long> {
}
