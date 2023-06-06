package com.emented.backend.methods;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum InterpolationMethodEnum {

    LAGRANGE(0),
    GAUSS(1);


    private final int priority;
}
