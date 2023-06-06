package com.emented.backend.controller;


import com.emented.backend.dto.AnswerDto;
import com.emented.backend.dto.PointDto;
import com.emented.backend.service.MathService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MathController {

    private final MathService service;

    @Autowired
    public MathController(MathService service) {
        this.service = service;
    }

    @PostMapping("/submit")
    public AnswerDto solve(@RequestBody List<PointDto> pointDtos) {
        System.out.println(pointDtos.size());
        pointDtos.forEach(System.out::println);

        return service.solve(pointDtos);
    }
}
