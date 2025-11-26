import AiCosmicChat from '@/components/ui/aicosmic';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data1 = [
  { name: 'Jan', production: 400, orders: 320 },
  { name: 'Feb', production: 300, orders: 280 },
  { name: 'Mar', production: 500, orders: 450 },
  { name: 'Apr', production: 200, orders: 220 },
  { name: 'May', production: 600, orders: 550 },
  { name: 'Jun', production: 400, orders: 380 },
];

const data2 = [
  { name: 'Jan', revenue: 10000, cost: 7000 },
  { name: 'Feb', revenue: 12000, cost: 8000 },
  { name: 'Mar', revenue: 15000, cost: 9000 },
  { name: 'Apr', revenue: 8000, cost: 6000 },
  { name: 'May', revenue: 17000, cost: 11000 },
  { name: 'Jun', revenue: 13000, cost: 9000 },
];

const pieData = [
  { name: 'Produk A', value: 400 },
  { name: 'Produk B', value: 300 },
  { name: 'Produk C', value: 300 },
  { name: 'Produk D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const radarData = [
  { subject: 'Produksi', A: 120, fullMark: 150 },
  { subject: 'Penjualan', A: 98, fullMark: 150 },
  { subject: 'CS', A: 86, fullMark: 150 },
  { subject: 'R&D', A: 99, fullMark: 150 },
  { subject: 'Logistik', A: 85, fullMark: 150 },
];

const radialData = [{ name: 'On-Time Delivery', value: 93, fill: '#82ca9d' }];

export default function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {};

  return (
    <div className="p-6 space-y-6 relative min-h-screen">
      <h1 className="text-3xl font-bold">ERP Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Produksi</h2>
          <p className="text-2xl mt-2">5,000 unit</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Order</h2>
          <p className="text-2xl mt-2">4,700 unit</p>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Inventory Turnover</h2>
          <p className="text-2xl mt-2">8x</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">On-Time Delivery</h2>
          <p className="text-2xl mt-2">93%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AreaChart: Produksi vs Order */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Produksi vs Order Bulanan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Unit', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine y={450} label="Target Produksi" stroke="gray" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="production"
                name="Produksi"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area type="monotone" dataKey="orders" name="Order" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AreaChart: Pendapatan vs Biaya */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pendapatan vs Biaya Bulanan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data2} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'IDR', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Pendapatan"
                stroke="#4caf50"
                fill="#4caf50"
              />
              <Area type="monotone" dataKey="cost" name="Biaya" stroke="#f44336" fill="#f44336" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* PieChart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Distribusi Produk</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* RadarChart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Kinerja Departemen</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Departemen"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* RadialBarChart */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Target On-Time Delivery</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={20}
              data={radialData}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                dataKey="value"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <AiCosmicChat></AiCosmicChat>
    </div>
  );
}
