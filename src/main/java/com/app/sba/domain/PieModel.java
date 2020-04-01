package com.app.sba.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PieModel {
    @Id
    private Integer id;
    private Integer quantity;
    private String label;





    public PieModel(){}
    public PieModel(Integer _id, Integer _quantity, String _label){
        this.id = _id;
        this.quantity = _quantity;
        this.label = _label;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

}
