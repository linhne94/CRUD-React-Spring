package com.example.projectcrud.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.projectcrud.Model.Dept;
import com.example.projectcrud.Repositories.DeptRepo;

@Service
public class DeptService {
    @Autowired
    protected DeptRepo deptRepo;

    public Dept saveDept(Dept dept){
        return deptRepo.save(dept);
    }

    public List<Dept> listDepts(){
        return deptRepo.findAll();
    }

    public Optional<Dept> findDById(int id){
        return deptRepo.findById(id);
    }

    public void deleteDById(int id){
        deptRepo.deleteById(id);
    }

    public List<Dept> findByDeName(String name){
        return deptRepo.findByName(name);
    }
}
