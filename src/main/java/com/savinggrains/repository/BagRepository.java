package com.savinggrains.repository;

import com.savinggrains.domain.Bag;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Bag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BagRepository extends JpaRepository<Bag, Long> {
}
