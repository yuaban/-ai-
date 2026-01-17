
import React from 'react';
import { Question } from '../types';

interface Props {
  question: Question;
  selectedScore?: number;
  onSelect: (score: number) => void;
}

const QuestionCard: React.FC<Props> = ({ question, selectedScore, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-50 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {question.category}
        </span>
        <span className="text-gray-400 text-sm">问题 {question.id} / 30</span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
        {question.text}
      </h3>
      
      <div className="grid gap-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option.score)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${
              selectedScore === option.score
                ? 'border-blue-600 bg-blue-50 text-blue-800'
                : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <span className="font-medium">{option.label}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              selectedScore === option.score ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'
            }`}>
              {selectedScore === option.score && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
