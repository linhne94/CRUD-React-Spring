package com.example.projectcrud.Model;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROJECT_ID")
    private int id;

    @Column(name = "PROJECT_NM")
    private String name;
    
    @Column(name = "DIFFICULTY")
    private String difficulty;
    
    @Column(name = "INS_TM")
    private Date insDate;
    
    @Column(name = "UPD_TM")
    private Date updDate;
    
    @Column(name = "VERSION")
    private int version;

    @Column(name = "DEPT_ID")
    private int dId;

    @ManyToOne( cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "DEPT_ID", insertable=false, updatable=false)
    private Dept dept;

    // public Project(String pName, String difficulty, Date insDate, int version, Dept dept) {
    //     this.pName = pName;
    //     this.difficulty = difficulty;
    //     this.insDate = insDate;
    //     this.version = version;
    //     this.dept = dept;
    // }

    
}
