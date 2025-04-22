
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface AnalyticsProps {
  totalViews: number;
  postsByPopularity: Array<{ title: string; views: number }>;
  tagData: Array<{ name: string; views: number }>;
  dailyViews: number[];
}

const COLORS = ['#8B5CF6', '#D946EF', '#0EA5E9', '#F97316', '#10B981'];

export function AnalyticsDashboard({ totalViews, postsByPopularity, tagData, dailyViews }: AnalyticsProps) {
  // Prepare data for charts
  const dailyViewData = dailyViews.map((views, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return { 
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
      views 
    };
  });

  const topPosts = postsByPopularity.slice(0, 5).map(post => ({
    name: post.title.length > 30 ? post.title.substring(0, 27) + '...' : post.title,
    views: post.views
  }));

  const topTags = tagData.slice(0, 5);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Your blog has received a total of {totalViews} views.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyViewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-full md:col-span-1">
        <CardHeader>
          <CardTitle>Popular Posts</CardTitle>
          <CardDescription>Top 5 posts by views</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPosts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="views" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-full md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Category Popularity</CardTitle>
          <CardDescription>Views by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topTags}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="views"
                  nameKey="name"
                  label={({ name }) => name}
                >
                  {topTags.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
