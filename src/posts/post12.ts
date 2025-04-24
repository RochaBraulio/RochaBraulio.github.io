
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "12",
  title: "Introduction to SwiftUI",
  date: "2025-05-01",
  excerpt: "Learn how to build beautiful user interfaces for Apple platforms with SwiftUI.",
  content: `
# Introduction to SwiftUI

SwiftUI is Apple's modern UI framework for building user interfaces across all Apple platforms using Swift and a declarative syntax.

## Getting Started

First, make sure you have Xcode 11 or later installed. Create a new SwiftUI project:

1. Open Xcode
2. File > New > Project
3. Select "App" under iOS, macOS, or watchOS
4. Check "SwiftUI" for the interface

## Basic UI Elements

Here's a simple "Hello, World!" view:

\`\`\`swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, World!")
            .font(.largeTitle)
            .foregroundColor(.blue)
            .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
\`\`\`

## Layout with Stacks

SwiftUI uses stacks for layout:

\`\`\`swift
VStack(alignment: .leading, spacing: 20) {
    Text("Header")
        .font(.headline)
    
    HStack {
        Text("Item")
        Spacer()
        Text("Value")
    }
    
    HStack {
        Text("Another Item")
        Spacer()
        Text("Another Value")
    }
}
.padding()
\`\`\`

## State and Binding

SwiftUI uses property wrappers to manage state:

\`\`\`swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \\(count)")
                .font(.title)
            
            Button("Increment") {
                count += 1
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
        .padding()
    }
}
\`\`\`

## Lists and Navigation

Creating lists with navigation:

\`\`\`swift
struct Item: Identifiable {
    let id = UUID()
    let name: String
    let description: String
}

struct ListView: View {
    let items = [
        Item(name: "Item 1", description: "Description for item 1"),
        Item(name: "Item 2", description: "Description for item 2"),
        Item(name: "Item 3", description: "Description for item 3")
    ]
    
    var body: some View {
        NavigationView {
            List(items) { item in
                NavigationLink(destination: DetailView(item: item)) {
                    Text(item.name)
                }
            }
            .navigationTitle("Items")
        }
    }
}

struct DetailView: View {
    let item: Item
    
    var body: some View {
        VStack {
            Text(item.name)
                .font(.title)
            Text(item.description)
                .padding()
        }
        .navigationTitle(item.name)
    }
}
\`\`\`

## Animations

SwiftUI makes animations simple:

\`\`\`swift
struct AnimationView: View {
    @State private var scale: CGFloat = 1.0
    
    var body: some View {
        Button("Animate") {
            withAnimation(.spring()) {
                scale = scale == 1.0 ? 2.0 : 1.0
            }
        }
        .scaleEffect(scale)
    }
}
\`\`\`

SwiftUI provides a powerful, modern approach to UI development that makes it easier than ever to create beautiful, dynamic interfaces for Apple platforms.
  `,
  coverImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
  tags: ["SwiftUI", "iOS", "Apple"]
};

export default post;
