package com.example.projectcrud.Controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projectcrud.Model.Project;
import com.example.projectcrud.Services.ProjectService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin("*")
public class ProjectCon {
    @Autowired
    protected ProjectService projectService;

    @GetMapping(value = "/projects")
    public List<Project> getAllProjec() {
        return projectService.listProjects();
    }

    @GetMapping(value = "/projects/{id}")
    public Optional<Project> getProjectById(@PathVariable int id) {
        return projectService.findPById(id);
    }

    @GetMapping(value = "/projects/search")
    public List<Project> getProjectByName(@RequestParam("name") String name) {
        return projectService.findByPrName(name);
    }

    @PostMapping(value = "/projects")
    public Project saveProject(@RequestBody Project project) {
        project.setInsDate(new Date());
        project.setVersion(1);
        return projectService.saveProject(project);
    }

    @PutMapping(value = "editproject/{id}")
    public Project putMethodName(@PathVariable int id, @RequestBody Project project) {
        Optional<Project> p = projectService.findPById(id);
        project.setId(id);
        project.setInsDate(p.get().getInsDate());
        project.setUpdDate(new Date());
        return projectService.saveProject(project);
    }

    @DeleteMapping(value = "/deleteProject/{id}")
    public void deleteById(@PathVariable int id) {
        projectService.deletePById(id);
    }

    @GetMapping("/projectsne")
    public Page<Project> getEntities(@RequestParam int page, @RequestParam int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return projectService.listByPage(pageable);
    }

}
