#include <stdio.h>
#include <math.h>

typedef struct {
    double x, y;
    double vx, vy;
    double mass;
} Body;

// update関数のプロトタイプ宣言
void update(Body* b1, Body* b2, double dt);

// my_main関数のプロトタイプ宣言
void my_main(); 

// 物体の位置と速度を更新する関数
void update(Body* b1, Body* b2, double dt) {
    double dx = b2->x - b1->x;
    double dy = b2->y - b1->y;
    double dist = sqrt(dx * dx + dy * dy);
    
    if (dist == 0) return; // 0除算を防ぐ

    double force = (b1->mass * b2->mass) / (dist * dist);

    double ax1 = force * dx / (b1->mass * dist);
    double ay1 = force * dy / (b1->mass * dist);
    double ax2 = -force * dx / (b2->mass * dist);
    double ay2 = -force * dy / (b2->mass * dist);

    b1->vx += ax1 * dt;
    b1->vy += ay1 * dt;
    b2->vx += ax2 * dt;
    b2->vy += ay2 * dt;

    b1->x += b1->vx * dt;
    b1->y += b1->vy * dt;
    b2->x += b2->vx * dt;
    b2->y += b2->vy * dt;
}

// メイン関数
void my_main() {
    Body body1 = {0.0, 0.0, 0.0, 0.0, 1.0};
    Body body2 = {1.0, 0.0, 0.0, 0.5, 1.0};
    double dt = 0.01;

    for (int i = 0; i < 100; i++) {
        update(&body1, &body2, dt);
        printf("Step %d: Body1: (%f, %f), Body2: (%f, %f)\n", i, body1.x, body1.y, body2.x, body2.y);
    }
}
