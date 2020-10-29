package com.savinggrains.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Grain.
 */
@Entity
@Table(name = "grain")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Grain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private Bag contentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Bag name;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Grain name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Bag getContentType() {
        return contentType;
    }

    public Grain contentType(Bag bag) {
        this.contentType = bag;
        return this;
    }

    public void setContentType(Bag bag) {
        this.contentType = bag;
    }

    public Bag getName() {
        return name;
    }

    public Grain name(Bag bag) {
        this.name = bag;
        return this;
    }

    public void setName(Bag bag) {
        this.name = bag;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Grain)) {
            return false;
        }
        return id != null && id.equals(((Grain) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Grain{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
