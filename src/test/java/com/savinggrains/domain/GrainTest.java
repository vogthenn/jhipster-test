package com.savinggrains.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.savinggrains.web.rest.TestUtil;

public class GrainTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Grain.class);
        Grain grain1 = new Grain();
        grain1.setId(1L);
        Grain grain2 = new Grain();
        grain2.setId(grain1.getId());
        assertThat(grain1).isEqualTo(grain2);
        grain2.setId(2L);
        assertThat(grain1).isNotEqualTo(grain2);
        grain1.setId(null);
        assertThat(grain1).isNotEqualTo(grain2);
    }
}
