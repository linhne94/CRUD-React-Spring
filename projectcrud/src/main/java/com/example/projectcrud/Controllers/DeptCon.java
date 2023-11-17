package com.example.projectcrud.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.projectcrud.Model.Dept;
import com.example.projectcrud.Services.DeptService;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin("*")
public class DeptCon {
    @Autowired
    protected DeptService deptService;

    @GetMapping(value="/depts")
    public List<Dept> getAllDept() {
        return deptService.listDepts();
    }

    @GetMapping(value="/depts/{id}")
    public Optional<Dept> getDeptById(@PathVariable int id) {
        return deptService.findDById(id);
    }

    @PostMapping(value="/depts")
    public Dept saveDept(@RequestBody Dept dept) {
        return deptService.saveDept(dept);
    }

    @DeleteMapping(value = "/deleteDept/{id}")
    public void deleteById(@PathVariable int id){
        deptService.deleteDById(id);
    }
    
    
    // @GetMapping(value="/depts/{name}")
    // public List<Dept> getDeptByName(@PathVariable String name) {
    //     return deptService.findByDeName(name);
    // }

    


}
