
#!/bin/bash

# Build the app
npm run build

# Navigate to the build folder
cd dist

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Initialize git in the build folder
git init
git checkout -b main
git add -A
git commit -m 'Deploy to GitHub Pages'

# Force push to the gh-pages branch of your repository
git push -f git@github.com:yourusername/your-repo-name.git main:gh-pages

# Return to the previous directory
cd -

echo "Deployed to GitHub Pages!"
