
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "8",
  title: "Using Python for G-code Generation",
  date: "2025-03-28",
  author: "3D Print Master",
  excerpt: "Learn how to generate and modify G-code programmatically using Python.",
  content: `
# Using Python for G-code Generation

G-code is the language of 3D printers, and Python can help us generate and modify it programmatically. Let's explore how to create custom G-code for special printing needs.

## Basic G-code Structure

G-code consists of commands like:
- G1: Linear move
- G28: Home axes
- M104: Set extruder temperature
- M140: Set bed temperature

## Python Implementation

\`\`\`python
class GCodeGenerator:
    def __init__(self):
        self.commands = []
        
    def add_home_all(self):
        self.commands.append("G28 ; Home all axes")
        
    def add_move(self, x=None, y=None, z=None, e=None, f=None):
        command = "G1"
        if x is not None: command += f" X{x}"
        if y is not None: command += f" Y{y}"
        if z is not None: command += f" Z{z}"
        if e is not None: command += f" E{e}"
        if f is not None: command += f" F{f}"
        self.commands.append(command)
        
    def save_to_file(self, filename):
        with open(filename, 'w') as f:
            f.write('\\n'.join(self.commands))

# Usage example
generator = GCodeGenerator()
generator.add_home_all()
generator.add_move(x=100, y=100, z=0.2, f=3000)
generator.save_to_file('custom_print.gcode')
\`\`\`

Remember to always validate generated G-code before sending it to your printer!
  `,
  coverImage: "https://images.unsplash.com/photo-1587613865763-4b8b0d19e8ab",
  tags: ["Python", "3D Printing", "G-code"],
  views: 432
};

export default post;
