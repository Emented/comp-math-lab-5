package com.emented.backend.methods;

import java.util.List;

import com.emented.backend.dto.PointDto;

public interface InterpolationMethod {

    double[] solve(List<PointDto> pointDtos);
}
