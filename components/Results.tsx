
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { AssessmentResult, AIReport, Category } from '../types';

interface Props {
  result: AssessmentResult;
  aiReport: AIReport;
  onRestart: () => void;
}

const Results: React.FC<Props> = ({ result, aiReport, onRestart }) => {
  const chartData = Object.entries(result.scores).map(([name, value]) => ({
    subject: name,
    A: value,
    fullMark: 30,
  }));

  return (
    <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Score Header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="200" height="200" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="white" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <p className="text-blue-100 font-medium mb-2">综合素质潜力分</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-7xl font-extrabold">{result.totalScore}</h2>
            <span className="text-2xl text-blue-200">/ 150</span>
          </div>
          <p className="mt-4 text-blue-50 bg-white/10 inline-block px-4 py-1 rounded-full text-sm">
            您的孩子处于：创意领航员级别 🚀
          </p>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          五维潜能雷达图
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
              <Radar
                name="潜能"
                dataKey="A"
                stroke="#2563eb"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Report Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-xl text-purple-600 font-bold">AI</div>
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">AI美育潜力分析</h3>
        </div>
        
        <div className="prose prose-blue text-gray-600 leading-relaxed">
          <p className="bg-gray-50 p-6 rounded-2xl italic border-l-4 border-purple-400">
            {aiReport.summary}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {aiReport.strengths.map((s, i) => (
            <div key={i} className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <span className="text-blue-600 text-xs font-bold block mb-1">核心优势 {i + 1}</span>
              <p className="text-gray-800 font-medium">{s}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-indigo-50/50 p-6 rounded-3xl">
            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              ✨ 未来成长空间
            </h4>
            <p className="text-indigo-800 text-sm leading-relaxed">{aiReport.growthPotential}</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-3xl border-2 border-purple-200">
            <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
              🤖 AIGC如何赋能？
            </h4>
            <p className="text-purple-800 text-sm leading-relaxed">{aiReport.aiEmpowerment}</p>
          </div>
        </div>
      </div>

      {/* Course CTA */}
      <div className="bg-orange-50 border-2 border-orange-100 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold text-orange-900">
          不想让孩子的灵感被“技法”磨灭？
        </h3>
        <p className="text-orange-800">
          您的孩子非常适合参加我们的 <b>《未来大师·AI美育创作课》</b>。<br/>
          跳过枯燥的传统素描训练，直接用思想对话AI，创作属于未来的艺术。
        </p>
        <button className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-orange-700 transition-all transform hover:scale-105">
          预约 0 元体验课
        </button>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 text-gray-400 font-medium hover:text-gray-600 transition-colors"
      >
        重新测试
      </button>
    </div>
  );
};

export default Results;
