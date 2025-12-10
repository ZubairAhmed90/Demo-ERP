import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaProjectDiagram, FaSearch, FaFilter, FaDollarSign, FaUsers, FaChartLine } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const pipelineStages = [
  { stage: 'Prospecting', opportunities: 5, value: 250000, color: 'gray' },
  { stage: 'Qualification', opportunities: 8, value: 400000, color: 'blue' },
  { stage: 'Proposal', opportunities: 6, value: 450000, color: 'yellow' },
  { stage: 'Negotiation', opportunities: 4, value: 300000, color: 'orange' },
  { stage: 'Closed Won', opportunities: 12, value: 1200000, color: 'green' },
  { stage: 'Closed Lost', opportunities: 3, value: 150000, color: 'red' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const totalOpportunities = pipelineStages.reduce((sum, s) => sum + s.opportunities, 0);
  const totalValue = pipelineStages.reduce((sum, s) => sum + s.value, 0);
  const wonValue = pipelineStages.find(s => s.stage === 'Closed Won')?.value || 0;
  const winRate = ((wonValue / totalValue) * 100).toFixed(1);

  const getColorClasses = (color) => {
    const colors = {
      gray: 'bg-gray-100 text-gray-800 border-gray-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      red: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[color] || colors.gray;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaProjectDiagram className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Sales Pipeline</h1>
                <p className="text-gray-600">Visualize and manage sales opportunities</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
                <p className="text-2xl font-bold text-gray-800">{totalOpportunities}</p>
              </div>
              <FaUsers className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString()} SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Won Value</p>
                <p className="text-2xl font-bold text-green-600">{wonValue.toLocaleString()} SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold text-blue-600">{winRate}%</p>
              </div>
              <FaChartLine className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">{stage.stage}</h3>
                <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getColorClasses(stage.color)}`}>
                  {stage.opportunities} opportunities
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {stage.value.toLocaleString()} SAR
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${(stage.value / totalValue) * 100}%`,
                      backgroundColor: primaryColor
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pipeline Flow</h2>
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {pipelineStages.map((stage, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center min-w-[120px]">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                    stage.color === 'green' ? 'bg-green-100' :
                    stage.color === 'red' ? 'bg-red-100' :
                    stage.color === 'yellow' ? 'bg-yellow-100' :
                    stage.color === 'orange' ? 'bg-orange-100' :
                    stage.color === 'blue' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <span className="text-lg font-bold text-gray-800">{stage.opportunities}</span>
                  </div>
                  <div className="text-xs font-medium text-gray-700 text-center">{stage.stage}</div>
                  <div className="text-xs text-gray-500 mt-1">{stage.value.toLocaleString()} SAR</div>
                </div>
                {index < pipelineStages.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

