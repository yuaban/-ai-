
import React from 'react';

interface Props {
  name: string;
  age: string;
  setName: (val: string) => void;
  setAge: (val: string) => void;
  onNext: () => void;
}

const InfoPage: React.FC<Props> = ({ name, age, setName, setAge, onNext }) => {
  const ages = ["3-4岁", "5-6岁", "7-8岁", "9-12岁"];
  const isValid = name.trim().length > 0 && age !== "";

  return (
    <div className="space-y-8 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">完善宝贝信息</h2>
        <p className="text-gray-500">为了生成更精准的个性化AI测评报告</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-8">
        {/* Name Input */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 ml-1">宝贝姓名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入宝贝姓名"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
          />
        </div>

        {/* Age Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 ml-1">宝贝年龄</label>
          <div className="grid grid-cols-2 gap-3">
            {ages.map((a) => (
              <button
                key={a}
                onClick={() => setAge(a)}
                className={`py-3 rounded-2xl border-2 transition-all font-medium ${
                  age === a
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        disabled={!isValid}
        onClick={onNext}
        className={`w-full py-5 rounded-full text-xl font-bold shadow-2xl transition-all flex items-center justify-center gap-3 ${
          isValid 
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        进入测评
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default InfoPage;
