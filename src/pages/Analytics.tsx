
import { Layout } from "@/components/Layout";
import { useSearch } from "@/hooks/useSearch";
import { blogPosts, getAnalyticsData } from "@/utils/blogData";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

const Analytics = () => {
  const { searchQuery, setSearchQuery } = useSearch(blogPosts);
  const analytics = getAnalyticsData();
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout onSearch={handleSearch}>
      <div className="container py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Blog Analytics</h1>
        
        <AnalyticsDashboard
          totalViews={analytics.totalViews}
          postsByPopularity={analytics.postsByPopularity.map(post => ({ 
            title: post.title, 
            views: post.views 
          }))}
          tagData={analytics.tagData}
          dailyViews={analytics.dailyViews}
        />
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">About the Analytics</h2>
          <p className="text-muted-foreground mb-4">
            This page displays visitor analytics for your blog posts. The data shown here is currently using mock data for demonstration purposes.
          </p>
          <p className="text-muted-foreground">
            In a production environment, this would be connected to real analytics data from sources like Google Analytics, Plausible, or a custom analytics solution.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
