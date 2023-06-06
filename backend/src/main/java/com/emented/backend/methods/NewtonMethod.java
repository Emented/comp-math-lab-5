package com.emented.backend.methods;

import java.util.List;

import com.emented.backend.dto.PointDto;
import org.springframework.stereotype.Component;

@Component
public class NewtonMethod implements InterpolationMethod {

    public double[] solve(List<PointDto> pointDtoList) {
        int n = pointDtoList.size();
        double[][] arr = new double[n][n];

        for (int i = 0; i < n; i++) {
            arr[i][0] = pointDtoList.get(i).getY();
        }

        int k = 1;
        while (k <= n) {
            for (int i = 0; i < n - k; i++) {
                arr[i][k] = (arr[i + 1][k - 1] - arr[i][k - 1]) /
                        (pointDtoList.get(i + k).getX() - pointDtoList.get(i).getX());
            }
            k++;
        }
        double[] brr = new double[n];

        System.arraycopy(arr[0], 0, brr, 0, n);

        return brr;
    }
}
