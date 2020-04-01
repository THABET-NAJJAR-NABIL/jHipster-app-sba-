package com.app.sba.repository;

import com.app.sba.domain.PieModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PieRepository extends CrudRepository<PieModel, Integer> {
}
