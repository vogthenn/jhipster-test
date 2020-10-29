package com.savinggrains.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.savinggrains.domain.enumeration.QualityGrade;

/**
 * A Bag.
 */
@Entity
@Table(name = "bag")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "quality")
    private QualityGrade quality;

    @ManyToOne
    @JsonIgnoreProperties(value = "bags", allowSetters = true)
    private Transaction bags;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QualityGrade getQuality() {
        return quality;
    }

    public Bag quality(QualityGrade quality) {
        this.quality = quality;
        return this;
    }

    public void setQuality(QualityGrade quality) {
        this.quality = quality;
    }

    public Transaction getBags() {
        return bags;
    }

    public Bag bags(Transaction transaction) {
        this.bags = transaction;
        return this;
    }

    public void setBags(Transaction transaction) {
        this.bags = transaction;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bag)) {
            return false;
        }
        return id != null && id.equals(((Bag) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bag{" +
            "id=" + getId() +
            ", quality='" + getQuality() + "'" +
            "}";
    }
}
