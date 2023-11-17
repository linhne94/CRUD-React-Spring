package com.example.projectcrud.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.projectcrud.Model.Project;
import com.example.projectcrud.Repositories.ProjectRepo;

@Service
public class ProjectService {
    @Autowired
    protected ProjectRepo projectRepo;

    public Project saveProject(Project project) {
        return projectRepo.save(project);
    }

    public List<Project> listProjects() {
        return projectRepo.findAll();
    }

    public Optional<Project> findPById(int id) {
        return projectRepo.findById(id);
    }

    public void deletePById(int id) {
        projectRepo.deleteById(id);
    }

    public List<Project> findByPrName(String name) {
        return projectRepo.findByName(name);
    }

    public Page<Project> listByPage(Pageable pageable) {
        return projectRepo.findAll(pageable);
    }
}
