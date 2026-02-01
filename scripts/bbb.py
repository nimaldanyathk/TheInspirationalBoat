import tkinter as tk
import numpy as np
import time

# Constants
WIDTH, HEIGHT = 500, 300  # Canvas dimensions
BALL_RADIUS = 10          # Particle size
SPEED = 3                 # Particle speed
WAVE_POINTS = 100         # Number of wave points to plot

# Quantum Wave Function Approximation (1st energy level)
def wave_function(x, L):
    return np.sin(np.pi * x / L) * 50 + HEIGHT // 2  # Scaled for visualization

def update_position():
    global x, velocity
    x += velocity
    if x - BALL_RADIUS <= 0 or x + BALL_RADIUS >= WIDTH:
        velocity *= -1  # Reflect at boundaries
    canvas.coords(ball, x - BALL_RADIUS, HEIGHT//2 - BALL_RADIUS, x + BALL_RADIUS, HEIGHT//2 + BALL_RADIUS)
    root.after(10, update_position)  # Recursive update

def draw_wave():
    canvas.delete("wave")
    for i in range(WAVE_POINTS - 1):
        x1 = i * WIDTH / WAVE_POINTS
        x2 = (i + 1) * WIDTH / WAVE_POINTS
        y1 = wave_function(x1, WIDTH)
        y2 = wave_function(x2, WIDTH)
        canvas.create_line(x1, y1, x2, y2, fill="red", tags="wave")
    root.after(100, draw_wave)  # Update wave periodically

# Initialize Tkinter
root = tk.Tk()
root.title("Quantum Particle in a Box Simulation")
canvas = tk.Canvas(root, width=WIDTH, height=HEIGHT, bg="white")
canvas.pack()

# Draw Box
canvas.create_rectangle(1, 1, WIDTH-1, HEIGHT-1, outline="black")

# Create Particle
x = WIDTH // 4  # Initial position
velocity = SPEED
ball = canvas.create_oval(x - BALL_RADIUS, HEIGHT//2 - BALL_RADIUS, x + BALL_RADIUS, HEIGHT//2 + BALL_RADIUS, fill="blue")

# Start Simulation
update_position()
draw_wave()
root.mainloop()