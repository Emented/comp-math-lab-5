package com.emented.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerDto {

    private int n;
    private double[] lagrangeCoefficients;
    private double[] newtonCoefficients;
    private double[][] finiteDifference;

}
