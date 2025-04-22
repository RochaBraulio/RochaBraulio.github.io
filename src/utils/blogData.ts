
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  views: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Data Analytics: A Beginner's Guide",
    date: "2025-04-20",
    author: "Data Enthusiast",
    excerpt: "Learn the basics of data analytics and how to start your journey in this exciting field.",
    content: `
# Getting Started with Data Analytics: A Beginner's Guide

Data analytics is the practice of examining datasets to draw conclusions about the information they contain. It's an increasingly important field in our data-driven world, with applications across virtually every industry.

## Why Learn Data Analytics?

Data analytics skills are in high demand. Organizations of all sizes are looking for professionals who can help them make sense of their data and derive actionable insights.

## Essential Tools for Beginners

### 1. Python

Python has become the language of choice for data analytics due to its simplicity and powerful libraries.

\`\`\`python
# Simple data analysis example using pandas
import pandas as pd

# Load dataset
data = pd.read_csv('sales_data.csv')

# Quick statistics
print(data.describe())

# Group by and aggregate
monthly_sales = data.groupby('month')['sales'].sum()
print(monthly_sales)
\`\`\`

### 2. SQL

SQL is essential for working with databases and extracting exactly the data you need.

\`\`\`sql
-- Basic SQL query to analyze sales by region
SELECT 
    region,
    SUM(sales) as total_sales,
    AVG(sales) as average_sales
FROM 
    sales_data
GROUP BY 
    region
ORDER BY 
    total_sales DESC;
\`\`\`

### 3. Visualization Tools

Tools like Tableau, Power BI, or libraries like Matplotlib and Seaborn help you create compelling visualizations.

## Getting Started

1. **Learn the fundamentals**: Start with basic statistics and probability concepts
2. **Master a programming language**: Python is recommended for beginners
3. **Practice with real datasets**: Kaggle offers many datasets for practice
4. **Build a portfolio**: Create projects that showcase your skills

Remember, the field of data analytics is broad. Start with the basics and then specialize based on your interests and career goals.
    `,
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["Data Analytics", "Python", "Beginners"],
    views: 1205
  },
  {
    id: "2",
    title: "3D Printing for Functional Parts: Beyond Decorative Models",
    date: "2025-04-18",
    author: "3D Print Master",
    excerpt: "Discover how to create durable, functional 3D printed parts that can withstand real-world use.",
    content: `
# 3D Printing for Functional Parts: Beyond Decorative Models

While 3D printing is often associated with creating decorative models or prototypes, today's technology allows us to create functional parts that can withstand real-world use.

## Material Selection

The first step in creating functional parts is choosing the right material. Different materials offer different properties:

- **PLA**: Easy to print but limited durability
- **PETG**: Good balance of strength and ease of printing
- **ABS**: Heat resistant and durable
- **Nylon**: Excellent for mechanical parts
- **TPU**: Flexible and impact resistant

## Design Considerations

### 1. Orientation Matters

The orientation of your print affects its strength. Layer lines create weak points, so orient your model to ensure forces act parallel to layers, not perpendicular.

### 2. Proper Wall Thickness

For functional parts, use at least 3 perimeters. This generally means a minimum wall thickness of 1.2mm with a 0.4mm nozzle.

### 3. Infill Patterns and Density

Different infill patterns offer different strengths:

- **Triangular/Cubic**: Good all-around strength
- **Gyroid**: Excellent strength-to-weight ratio
- **Honeycomb**: Strong against compression

For functional parts, use at least 25-30% infill density.

## Post-Processing Techniques

To further enhance strength and functionality:

1. **Heat treatment**: Annealing PLA can increase heat resistance and strength
2. **Chemical smoothing**: Acetone vapor for ABS, smoothing compounds for PLA
3. **Epoxy coating**: Adding a layer of epoxy can significantly increase part strength

## Example: Designing a Functional Bracket

When designing a load-bearing bracket:

\`\`\`
// Pseudocode for bracket design
function createBracket(load_kg) {
  wall_thickness = max(1.2, load_kg * 0.1);
  infill_density = min(80, 20 + load_kg * 2);
  
  // Add fillets to all corners
  for (corner in all_corners) {
    add_fillet(corner, radius = 2);
  }
  
  // Add reinforcing ribs
  if (load_kg > 5) {
    add_reinforcing_ribs();
  }
}
\`\`\`

Remember, testing is essential. Always test your functional parts under controlled conditions before putting them to real use.
    `,
    coverImage: "https://images.unsplash.com/photo-1581092160607-7638e32dab8a",
    tags: ["3D Printing", "Functional Parts", "Design"],
    views: 879
  },
  {
    id: "3",
    title: "Visualizing Complex Data: Best Practices and Tools",
    date: "2025-04-15",
    author: "Data Enthusiast",
    excerpt: "Learn how to create effective visualizations that communicate complex data insights clearly.",
    content: `
# Visualizing Complex Data: Best Practices and Tools

Data visualization is the graphical representation of information and data. These visual elements make it easier to identify trends, patterns, and outliers in large datasets.

## Principles of Effective Data Visualization

### 1. Know Your Audience

Different audiences require different levels of detail and complexity:

- **Technical audience**: Can handle more complex visualizations
- **Executive audience**: Needs clear, actionable insights
- **General public**: Requires intuitive, simplified visuals

### 2. Choose the Right Visualization Type

Different data types call for different visualization methods:

- **Categorical comparisons**: Bar charts, pie charts
- **Time series**: Line charts, area charts
- **Distributions**: Histograms, box plots
- **Correlations**: Scatter plots, heat maps
- **Hierarchical data**: Treemaps, sunburst diagrams
- **Networks**: Node-link diagrams, adjacency matrices

### 3. Focus on Clarity

- Remove chart junk (unnecessary elements)
- Use color purposefully
- Label directly when possible
- Include a clear title and legend

## Python Visualization Libraries

\`\`\`python
# Matplotlib - The foundation
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
plt.plot(x_data, y_data)
plt.title('Basic Line Chart')
plt.xlabel('X Axis')
plt.ylabel('Y Axis')
plt.show()

# Seaborn - Statistical visualizations
import seaborn as sns

sns.set_theme(style="whitegrid")
sns.boxplot(x="category", y="value", data=df)

# Plotly - Interactive visualizations
import plotly.express as px

fig = px.scatter(df, x="x_values", y="y_values", 
                 color="category", size="size_values",
                 hover_name="labels")
fig.show()
\`\`\`

## Advanced Techniques

### Interactive Dashboards

Tools like Tableau, Power BI, or Dash allow you to create interactive dashboards where users can explore the data themselves.

### Storytelling with Data

The most effective visualizations tell a story:

1. Start with a clear narrative
2. Guide the viewer through the data
3. Highlight key insights
4. Provide context and implications

Remember, the goal of data visualization is not to create the most complex or impressive-looking chart, but to communicate insights clearly and effectively.
    `,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tags: ["Data Visualization", "Python", "Tools"],
    views: 1432
  },
  {
    id: "4",
    title: "Troubleshooting Common 3D Printing Issues",
    date: "2025-04-10",
    author: "3D Print Master",
    excerpt: "Solutions for the most common problems you'll encounter with your 3D printer.",
    content: `
# Troubleshooting Common 3D Printing Issues

Even the most experienced 3D printing enthusiasts encounter issues. Here's how to diagnose and fix the most common problems.

## Layer Adhesion Problems

### Symptom: Layers Separating or Visible Lines

**Causes and Solutions:**

1. **Temperature too low**
   - Increase nozzle temperature by 5-10°C increments
   - PLA: Try 200-220°C
   - PETG: Try 230-250°C
   - ABS: Try 230-250°C

2. **Printing too fast**
   - Reduce print speed by 10-20%
   - Try 30-50mm/s for better layer adhesion

3. **Cooling too aggressive**
   - Reduce fan speed for better layer bonding
   - For materials like ABS, consider turning the fan off entirely

## Stringing or Oozing

### Symptom: Thin strands of plastic between parts

**Causes and Solutions:**

\`\`\`
// Retraction settings in slicer
retraction_distance = 5;  // mm, increase if still stringing
retraction_speed = 45;    // mm/s, faster for less oozing
retraction_minimum_travel = 1.5;  // mm, don't retract for tiny moves
\`\`\`

1. **Enable or increase retraction**
   - Start with 5mm for Bowden setups, 1-2mm for direct drive
   - Increase retraction speed to 40-60mm/s

2. **Lower temperature**
   - Reduce by 5-10°C to minimize oozing
   - Find the lowest temperature that still gives good layer adhesion

3. **Enable combing**
   - This setting makes travel moves stay within already printed areas

## Under-extrusion

### Symptom: Gaps between lines, thin layers, or incomplete parts

**Causes and Solutions:**

1. **Clogged nozzle**
   - Perform a "cold pull" or "atomic pull" with nylon or cleaning filament
   - Replace the nozzle if cleaning doesn't work

2. **Incorrect flow rate**
   - Calibrate your extruder steps per mm
   - Increase flow rate by 5-10% increments

3. **Filament issues**
   - Check for tangled filament or high friction in the filament path
   - Dry your filament if it has absorbed moisture

## First Layer Problems

### Symptom: First layer not sticking or uneven

**Causes and Solutions:**

1. **Bed leveling**
   - Re-level your bed using the paper method or use auto-leveling
   - Adjust Z-offset in tiny increments

2. **Bed temperature**
   - PLA: 50-60°C
   - PETG: 70-80°C
   - ABS: 100-110°C

3. **Surface preparation**
   - Clean with isopropyl alcohol
   - Apply adhesives like glue stick, hairspray, or specialized solutions

Remember, persistence is key in 3D printing troubleshooting. Keep detailed notes of what works and what doesn't for your specific printer and materials.
    `,
    coverImage: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6",
    tags: ["3D Printing", "Troubleshooting", "Tips"],
    views: 1876
  }
];

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getPopularPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 3);
};

export const getRecentPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);
};

export const getCategories = (): { name: string; count: number }[] => {
  const categoryMap = new Map<string, number>();
  
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      categoryMap.set(tag, (categoryMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
};

export const trackPageView = (postId: string): void => {
  const post = blogPosts.find(p => p.id === postId);
  if (post) {
    post.views += 1;
  }
};

// Simple analytics data for demo purposes
export const getAnalyticsData = () => {
  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const postsByPopularity = [...blogPosts].sort((a, b) => b.views - a.views);
  const viewsByTag = new Map<string, number>();
  
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      viewsByTag.set(tag, (viewsByTag.get(tag) || 0) + post.views);
    });
  });
  
  const tagData = Array.from(viewsByTag.entries())
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views);
  
  return {
    totalViews,
    postsByPopularity,
    tagData,
    dailyViews: [65, 72, 86, 95, 110, 108, 120], // Sample data for the last 7 days
  };
};
