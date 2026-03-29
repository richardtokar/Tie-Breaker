import React from 'react';
import { CheckCircle2, XCircle, Table, BarChart3 } from 'lucide-react';
import { AnalysisType } from '../services/geminiService';

interface AnalysisTypeSelectorProps {
  selectedType: AnalysisType;
  onSelect: (type: AnalysisType) => void;
  disabled?: boolean;
}

export const AnalysisTypeSelector: React.FC<AnalysisTypeSelectorProps> = ({ selectedType, onSelect, disabled }) => {
  const options = [
    { id: 'pros-cons', label: 'Pros & Cons', icon: <CheckCircle2 className="w-4 h-4" />, description: 'Simple list of advantages and disadvantages' },
    { id: 'comparison', label: 'Comparison', icon: <Table className="w-4 h-4" />, description: 'Compare options side-by-side' },
    { id: 'swot', label: 'SWOT Analysis', icon: <BarChart3 className="w-4 h-4" />, description: 'Strengths, Weaknesses, Opportunities, Threats' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id as AnalysisType)}
          disabled={disabled}
          className={`flex flex-col items-start p-4 rounded-xl border transition-all text-left ${
            selectedType === option.id
              ? 'bg-white border-black ring-1 ring-black shadow-sm'
              : 'bg-white border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
          } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={selectedType === option.id ? 'text-black' : 'text-gray-500'}>
              {option.icon}
            </span>
            <span className="font-semibold text-sm">{option.label}</span>
          </div>
          <p className="text-xs text-gray-500 leading-tight">{option.description}</p>
        </button>
      ))}
    </div>
  );
};
