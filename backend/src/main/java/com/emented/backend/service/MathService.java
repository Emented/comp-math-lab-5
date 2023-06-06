package com.emented.backend.service;

import com.emented.backend.dto.AnswerDto;
import com.emented.backend.dto.PointDto;
import com.emented.backend.math.FiniteDifferenceCounter;
import com.emented.backend.methods.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MathService {

    private final LagrangeMethod lagrangeMethod;
    private final NewtonMethod newtonMethod;
    private final FiniteDifferenceCounter finiteDifferenceCounter;

    @Autowired
    public MathService(LagrangeMethod lagrangeMethod,
                       NewtonMethod newtonMethod, FiniteDifferenceCounter finiteDifferenceCounter) {
        this.lagrangeMethod = lagrangeMethod;
        this.newtonMethod = newtonMethod;
        this.finiteDifferenceCounter = finiteDifferenceCounter;
    }

    public AnswerDto solve(List<PointDto> pointDtoList) {

        return AnswerDto.builder()
                .n(pointDtoList.size())
                .lagrangeCoefficients(lagrangeMethod.solve(pointDtoList))
                .newtonCoefficients(newtonMethod.solve(pointDtoList))
                .finiteDifference(finiteDifferenceCounter.count(pointDtoList))
                .build();
    }
}
