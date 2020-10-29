package com.savinggrains.service.impl;

import com.savinggrains.service.GrainService;
import com.savinggrains.domain.Grain;
import com.savinggrains.repository.GrainRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Grain}.
 */
@Service
@Transactional
public class GrainServiceImpl implements GrainService {

    private final Logger log = LoggerFactory.getLogger(GrainServiceImpl.class);

    private final GrainRepository grainRepository;

    public GrainServiceImpl(GrainRepository grainRepository) {
        this.grainRepository = grainRepository;
    }

    @Override
    public Grain save(Grain grain) {
        log.debug("Request to save Grain : {}", grain);
        return grainRepository.save(grain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Grain> findAll() {
        log.debug("Request to get all Grains");
        return grainRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Grain> findOne(Long id) {
        log.debug("Request to get Grain : {}", id);
        return grainRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Grain : {}", id);
        grainRepository.deleteById(id);
    }
}
