import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import { mockMetrics, mockRecentActivity, mockRecruitmentPipeline } from "@/lib/mockData";
import { Users, FileText, Download, Search, Clock } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your recruitment.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Candidates"
            value={mockMetrics.totalCandidates}
            change={`+${mockMetrics.candidateGrowth}% from last week`}
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Active Job Posts"
            value={mockMetrics.activeJobPosts}
            change={`+${mockMetrics.jobPostGrowth} from last week`}
            icon={FileText}
            trend="up"
          />
          <MetricCard
            title="Resumes Downloaded"
            value={mockMetrics.resumesDownloaded}
            change={`+${mockMetrics.resumeGrowth}% from last week`}
            icon={Download}
            trend="up"
          />
          <MetricCard
            title="AI Searches Today"
            value={mockMetrics.aiSearchesToday}
            change={`+${mockMetrics.searchGrowth}% from last week`}
            icon={Search}
            trend="up"
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
            <p className="text-gray-600 text-sm mb-6">Latest actions in your recruitment pipeline</p>

            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruitment Pipeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recruitment Pipeline</h3>
            <p className="text-gray-600 text-sm mb-6">Current hiring progress by role</p>

            <div className="space-y-6">
              {mockRecruitmentPipeline.map((item) => (
                <div key={item.role}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.role}</span>
                    <span className="text-sm text-gray-600">{item.current}/{item.total} positions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
