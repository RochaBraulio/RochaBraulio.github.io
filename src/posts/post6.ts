
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "6",
  title: "Machine Learning Basics with Python",
  date: "2024-09-12",
  excerpt: "An introduction to machine learning concepts and implementation using Python and popular libraries.",
  content: `
# Machine Learning Basics with Python

This guide introduces fundamental machine learning concepts and how to implement them using Python.

## Setting Up Your Environment

First, set up your Python environment with the necessary libraries:

\`\`\`bash
pip install numpy pandas matplotlib scikit-learn
\`\`\`

## Data Preparation

Before applying machine learning algorithms, you need to prepare your data:

\`\`\`python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load data
data = pd.read_csv('your_dataset.csv')

# Split features and target
X = data.drop('target', axis=1)
y = data['target']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
\`\`\`

## Linear Regression

Let's implement a simple linear regression model:

\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean Squared Error: {mse}')
print(f'R² Score: {r2}')
\`\`\`

## Classification with Random Forest

For classification tasks, random forests work well:

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Create and train the model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Make predictions
y_pred = clf.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f'Accuracy: {accuracy}')
print(f'Classification Report:\n{report}')
\`\`\`

## Visualizing Results

Visualization helps understand your model's performance:

\`\`\`python
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix
import seaborn as sns

# Plot confusion matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()
\`\`\`

This is just the beginning of your machine learning journey!
  `,
  coverImage: "https://images.unsplash.com/photo-1527474305487-b87b222841cc",
  tags: ["Python", "Machine Learning", "Data Science"]
};

export default post;
