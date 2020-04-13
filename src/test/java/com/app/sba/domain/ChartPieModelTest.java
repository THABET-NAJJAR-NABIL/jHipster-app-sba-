package com.app.sba.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.app.sba.web.rest.TestUtil;

public class ChartPieModelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChartPieModel.class);
        ChartPieModel chartPieModel1 = new ChartPieModel();
        chartPieModel1.setId(1L);
        ChartPieModel chartPieModel2 = new ChartPieModel();
        chartPieModel2.setId(chartPieModel1.getId());
        assertThat(chartPieModel1).isEqualTo(chartPieModel2);
        chartPieModel2.setId(2L);
        assertThat(chartPieModel1).isNotEqualTo(chartPieModel2);
        chartPieModel1.setId(null);
        assertThat(chartPieModel1).isNotEqualTo(chartPieModel2);
    }
}
