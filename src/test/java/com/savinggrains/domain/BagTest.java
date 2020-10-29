package com.savinggrains.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.savinggrains.web.rest.TestUtil;

public class BagTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bag.class);
        Bag bag1 = new Bag();
        bag1.setId(1L);
        Bag bag2 = new Bag();
        bag2.setId(bag1.getId());
        assertThat(bag1).isEqualTo(bag2);
        bag2.setId(2L);
        assertThat(bag1).isNotEqualTo(bag2);
        bag1.setId(null);
        assertThat(bag1).isNotEqualTo(bag2);
    }
}
