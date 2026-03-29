import { useState } from 'react';
import { Split, Send, History, Trash2 } from 'lucide-react';
import { AnalysisTypeSelector } from './components/AnalysisTypeSelector';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeDecision, AnalysisType } from './services/geminiService';

export default function App() {
  const [decision, setDecision] = useState('');
  const [analysisType, setAnalysisType] = useState<AnalysisType>('pros-cons');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!decision.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const output = await analyzeDecision(decision, analysisType);
      setResult(output || 'No analysis generated. Please try again.');
    } catch (err) {
      console.error(err);
      setError('Failed to generate analysis. Please check your connection or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setDecision('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-1.5 rounded-lg">
              <Split className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-black">The Tiebreaker</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-black transition-colors">
              <History className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Stuck on a choice?
            </h2>
            <p className="text-gray-500 text-lg">
              Let AI help you weigh the options and find the best path forward.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <label htmlFor="decision" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                What's the decision?
              </label>
              <textarea
                id="decision"
                rows={4}
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none text-lg"
                placeholder="e.g., Should I move to a new city for a job offer, or stay where I am?"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Analysis Method
              </label>
              <AnalysisTypeSelector
                selectedType={analysisType}
                onSelect={setAnalysisType}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !decision.trim()}
                className="flex-1 bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Analyzing...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Analyze Decision
                  </>
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={isLoading || (!decision && !result)}
                className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500 disabled:opacity-30 transition-all"
                title="Clear all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {/* Results Section */}
          <AnalysisResult result={result} isLoading={isLoading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200 text-center text-gray-400 text-xs">
        <p>© 2026 The Tiebreaker • Powered by Google Gemini</p>
      </footer>
    </div>
  );
}
