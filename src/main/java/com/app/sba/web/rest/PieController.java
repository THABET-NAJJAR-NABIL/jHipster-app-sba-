package com.app.sba.web.rest;

import com.app.sba.domain.PieModel;
import com.app.sba.service.mapper.PieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class PieController {
    @Autowired
    PieService pieService;

    @GetMapping(path="getPieData")
    public ArrayList<PieModel> getPieData() {
        return pieService.getAll();
    }
}
