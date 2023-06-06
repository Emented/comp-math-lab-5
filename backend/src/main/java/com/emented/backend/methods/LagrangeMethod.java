package com.emented.backend.methods;

import java.util.List;

import com.emented.backend.dto.PointDto;
import org.springframework.stereotype.Component;

@Component
public class LagrangeMethod {

    public double[] solve(List<PointDto> pointDtoList) {
        int n = pointDtoList.size();
        double[] result = new double[n];


        for (int i = 0; i < n; i++) {
            double c = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    c *= pointDtoList.get(i).getX() - pointDtoList.get(j).getX();
                }
            }
            result[i] = pointDtoList.get(i).getY() / c;
        }

        return result;
    }

}
