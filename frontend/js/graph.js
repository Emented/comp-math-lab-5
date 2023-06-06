function draw_points(board, points) {
    points.forEach((point) => {
        board.create("point", [point.x, point.y], {fixed:true});
    });
}

