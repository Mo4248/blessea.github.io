#include <stdio.h>
#include <math.h>

typedef struct {
    double x, y;
    double vx, vy;
    double mass;
} Body;

void update(Body* b1, Body* b2, double dt) {
    double dx = b2->x - b1->x;
    double dy = b2->y - b1->y;
    double dist = sqrt(dx * dx + dy * dy);
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
