package com.savinggrains.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PurchaseOrder.
 */
@Entity
@Table(name = "purchase_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PurchaseOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "desired_quantity")
    private Long desiredQuantity;

    @Column(name = "desired_quality")
    private String desiredQuality;

    @OneToOne
    @JoinColumn(unique = true)
    private Location location;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDesiredQuantity() {
        return desiredQuantity;
    }

    public PurchaseOrder desiredQuantity(Long desiredQuantity) {
        this.desiredQuantity = desiredQuantity;
        return this;
    }

    public void setDesiredQuantity(Long desiredQuantity) {
        this.desiredQuantity = desiredQuantity;
    }

    public String getDesiredQuality() {
        return desiredQuality;
    }

    public PurchaseOrder desiredQuality(String desiredQuality) {
        this.desiredQuality = desiredQuality;
        return this;
    }

    public void setDesiredQuality(String desiredQuality) {
        this.desiredQuality = desiredQuality;
    }

    public Location getLocation() {
        return location;
    }

    public PurchaseOrder location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PurchaseOrder)) {
            return false;
        }
        return id != null && id.equals(((PurchaseOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PurchaseOrder{" +
            "id=" + getId() +
            ", desiredQuantity=" + getDesiredQuantity() +
            ", desiredQuality='" + getDesiredQuality() + "'" +
            "}";
    }
}
