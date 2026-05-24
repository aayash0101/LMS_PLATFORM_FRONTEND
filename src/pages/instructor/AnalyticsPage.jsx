import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts'
import {
  useInstructorOverview,
  useEnrollmentTimeSeries,
  useCourseBreakdown,
} from '@/features/analytics/hooks/useInstructorAnalytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Users, BookOpen, Star, DollarSign } from 'lucide-react'

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color = 'text-primary', loading }) => (
  <Card>
    <CardContent className="p-6 flex items-center gap-4">
      <div className={`p-3 rounded-full bg-primary/10 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        {loading
          ? <Skeleton className="h-7 w-20" />
          : <p className="text-2xl font-bold">{value}</p>
        }
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </CardContent>
  </Card>
)

const EnrollmentTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-background border rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-medium">{label}</p>
      <p className="text-primary">{payload[0].value} enrollments</p>
    </div>
  )
}

const AnalyticsPage = () => {
  const [period, setPeriod] = useState('30d')

  const { data: overviewData, isLoading: overviewLoading } = useInstructorOverview()
  const { data: timeSeriesData, isLoading: timeSeriesLoading } = useEnrollmentTimeSeries(period)
  const { data: breakdownData, isLoading: breakdownLoading } = useCourseBreakdown()

  const overview   = overviewData?.data ?? {}
  const timeSeries = Array.isArray(timeSeriesData?.data) ? timeSeriesData.data : []
  const courses    = Array.isArray(breakdownData?.data) ? breakdownData.data : []

  // Colors for bar chart
  const BAR_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track your course performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={overview.totalCourses ?? 0}
          loading={overviewLoading}
        />
        <StatCard
          icon={Users}
          label="Total Students"
          value={overview.totalStudents ?? 0}
          color="text-blue-500"
          loading={overviewLoading}
        />
        <StatCard
          icon={Star}
          label="Avg Rating"
          value={overview.averageRating ?? '0.0'}
          color="text-amber-500"
          loading={overviewLoading}
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${overview.totalRevenue ?? '0.00'}`}
          color="text-green-600"
          loading={overviewLoading}
        />
      </div>

      <Tabs defaultValue="enrollments">
        <TabsList>
          <TabsTrigger value="enrollments">Enrollment Trends</TabsTrigger>
          <TabsTrigger value="courses">Course Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollments" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Enrollments Over Time</CardTitle>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {timeSeriesLoading ? (
                <Skeleton className="h-64 w-full rounded-lg" />
              ) : timeSeries.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  No enrollment data for this period
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={timeSeries} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(v) => v.slice(5)} // show MM-DD only
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      allowDecimals={false}
                    />
                    <Tooltip content={<EnrollmentTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="mt-6 space-y-4">
          {/* Bar chart — students per course */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Students per Course</CardTitle>
            </CardHeader>
            <CardContent>
              {breakdownLoading ? (
                <Skeleton className="h-64 w-full rounded-lg" />
              ) : courses.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  No course data yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={courses.slice(0, 8)}
                    margin={{ top: 5, right: 10, left: -20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="title"
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                      tickFormatter={(v) => v.length > 20 ? v.slice(0, 20) + '…' : v}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      formatter={(value) => [value, 'Students']}
                      contentStyle={{
                        background: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="totalStudents" radius={[4, 4, 0, 0]}>
                      {courses.slice(0, 8).map((_, i) => (
                        <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              {breakdownLoading ? (
                <div className="space-y-2">
                  {[1,2,3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-3 font-medium">Course</th>
                        <th className="pb-3 font-medium text-right">Students</th>
                        <th className="pb-3 font-medium text-right">Revenue</th>
                        <th className="pb-3 font-medium text-right">Rating</th>
                        <th className="pb-3 font-medium text-right">Completion</th>
                        <th className="pb-3 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {courses.map((course) => (
                        <tr key={course._id} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 pr-4 max-w-[200px]">
                            <p className="font-medium line-clamp-1">{course.title}</p>
                          </td>
                          <td className="py-3 text-right">{course.totalStudents}</td>
                          <td className="py-3 text-right">${course.revenue?.toFixed(2) ?? '0.00'}</td>
                          <td className="py-3 text-right">
                            <span className="text-amber-500">★</span> {course.averageRating?.toFixed(1) ?? '0.0'}
                          </td>
                          <td className="py-3 text-right">{course.completionRate ?? 0}%</td>
                          <td className="py-3 text-right">
                            <Badge variant={course.isPublished ? 'default' : 'secondary'}>
                              {course.isPublished ? 'Live' : 'Draft'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnalyticsPage