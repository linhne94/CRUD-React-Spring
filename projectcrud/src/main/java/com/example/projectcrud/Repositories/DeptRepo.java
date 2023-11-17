package com.example.projectcrud.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.projectcrud.Model.Dept;
import java.util.List;



@Repository
public interface DeptRepo extends JpaRepository<Dept, Integer>{

    @Query("SELECT p FROM Project p WHERE p.name LIKE %:keyword%")
    List<Dept> findByName(@Param("keyword") String keyword);
}
