package com.example.projectcrud.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.projectcrud.Model.Project;
import java.util.List;


@Repository
public interface ProjectRepo extends JpaRepository<Project, Integer>{

    @Query("SELECT p FROM Project p WHERE p.name LIKE %:keyword%")
    List<Project> findByName(@Param("keyword") String keyword);

}
