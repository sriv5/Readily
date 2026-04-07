import {
  ResponsiveContainer,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const PIE_COLOURS = ['#8b7cf6', '#f4b6d7', '#d9d9d9', '#a5b4fc']
const BAR_COLOUR = '#a9c9f5'

export default function ChartPanel({
  type = 'bar',
  data = [],
  showLegend = true,
}) {
  const chartData =
    type === 'doughnut'
      ? data.map((item, index) => ({
          ...item,
          fill: PIE_COLOURS[index % PIE_COLOURS.length],
        }))
      : data

  return (
    <div style={{ width: '100%' }}>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'doughnut' ? (
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                cx="50%"
                cy="42%"
              />
              <Tooltip />
              {showLegend && <Legend verticalAlign="bottom" height={30} />}
            </PieChart>
          ) : (
            <BarChart data={data} barCategoryGap="22%">
              <CartesianGrid stroke="#eeeeee" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6f6f6f', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6f6f6f', fontSize: 12 }}
              />
              <Tooltip />
              {showLegend && <Legend verticalAlign="bottom" height={30} />}
              <Bar
                dataKey="value"
                fill={BAR_COLOUR}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}