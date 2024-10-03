#include <stdio.h>
#include <math.h>

typedef struct {
    double x, y;     // 位置
    double vx, vy;   // 速度
    double mass;     // 質量
} Body;

// 2つの天体の更新
void update(Body* b1, Body* b2, double dt) {
    double dx = b2->x - b1->x;
    double dy = b2->y - b1->y;
    double dist = sqrt(dx * dx + dy * dy);
    
    // 力を計算
    double force = (b1->mass * b2->mass) / (dist * dist);

    double ax1 = force * dx / (b1->mass * dist);
    double ay1 = force * dy / (b1->mass * dist);
    double ax2 = -force * dx / (b2->mass * dist);
    double ay2 = -force * dy / (b2->mass * dist);

    // 速度を更新
    b1->vx += ax1 * dt;
    b1->vy += ay1 * dt;
    b2->vx += ax2 * dt;
    b2->vy += ay2 * dt;

    // 位置を更新
    b1->x += b1->vx * dt;
    b1->y += b1->vy * dt;
    b2->x += b2->vx * dt;
    b2->y += b2->vy * dt;
}

// メイン関数
void main() {
    Body b1 = {0.0, 0.0, 0.0, 0.0, 5.0}; // 1つ目の天体
    Body b2 = {1.0, 0.0, 0.0, 0.5, 1.0}; // 2つ目の天体
    double dt = 0.01; // 時間の刻み幅
    int steps = 1000; // シミュレーションのステップ数

    for (int i = 0; i < steps; i++) {
        update(&b1, &b2, dt); // 天体の更新
        printf("Step %d: Body 1 (x: %.2f, y: %.2f) Body 2 (x: %.2f, y: %.2f)\n",
               i, b1.x, b1.y, b2.x, b2.y);
    }
}
