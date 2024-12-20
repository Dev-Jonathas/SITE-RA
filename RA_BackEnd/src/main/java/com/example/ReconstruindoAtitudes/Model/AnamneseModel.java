package com.example.ReconstruindoAtitudes.Model;

import com.example.ReconstruindoAtitudes.DTOs.Anamnnese.AnamnesePostDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "anamneses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnamneseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private MentoradoModel mentorado;

    private String pergunta1;

    private String pergunta2;

    private String pergunta3;

    private String pergunta4;

    private String pergunta5;

    private String pergunta6;

    private String pergunta7;

    private String pergunta8;

    private String pergunta9;

    private String pergunta10;

    private String pergunta11;

    private String pergunta12;

    private String pergunta13;

    private String pergunta14;

    private String pergunta15;

    private String pergunta16;

    private String pergunta17;

    private String pergunta18;

    private String pergunta19;

    public AnamneseModel(AnamnesePostDTO data, MentoradoModel mentorado){
        this.mentorado = mentorado;
        this.pergunta1 = data.pergunta1();
        this.pergunta2 = data.pergunta2();
        this.pergunta3 = data.pergunta3();
        this.pergunta4 = data.pergunta4();
        this.pergunta5 = data.pergunta5();
        this.pergunta6 = data.pergunta6();
        this.pergunta7 = data.pergunta7();
        this.pergunta8 = data.pergunta8();
        this.pergunta9 = data.pergunta9();
        this.pergunta10 = data.pergunta10();
        this.pergunta11 = data.pergunta11();
        this.pergunta12 = data.pergunta12();
        this.pergunta13 = data.pergunta13();
        this.pergunta14 = data.pergunta14();
        this.pergunta15 = data.pergunta15();
        this.pergunta16 = data.pergunta16();
        this.pergunta17 = data.pergunta17();
        this.pergunta18 = data.pergunta18();
        this.pergunta19 = data.pergunta19();
    }

}
