package com.savinggrains.service.impl;

import com.savinggrains.service.BagService;
import com.savinggrains.domain.Bag;
import com.savinggrains.repository.BagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Bag}.
 */
@Service
@Transactional
public class BagServiceImpl implements BagService {

    private final Logger log = LoggerFactory.getLogger(BagServiceImpl.class);

    private final BagRepository bagRepository;

    public BagServiceImpl(BagRepository bagRepository) {
        this.bagRepository = bagRepository;
    }

    @Override
    public Bag save(Bag bag) {
        log.debug("Request to save Bag : {}", bag);
        return bagRepository.save(bag);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Bag> findAll() {
        log.debug("Request to get all Bags");
        return bagRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Bag> findOne(Long id) {
        log.debug("Request to get Bag : {}", id);
        return bagRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bag : {}", id);
        bagRepository.deleteById(id);
    }
}
