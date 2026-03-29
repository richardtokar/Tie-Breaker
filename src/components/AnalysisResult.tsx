import React from 'react';
import Markdown from 'react-markdown';
import { Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalysisResultProps {
  result: string | null;
  isLoading: boolean;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, isLoading }) => {
  return (
    <div className="mt-8 min-h-[200px]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-12 text-gray-400"
          >
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="text-sm font-medium">The Tiebreaker is weighing the options...</p>
          </motion.div>
        ) : result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900">AI Analysis</h3>
            </div>
            <div className="markdown-body prose prose-sm max-w-none">
              <Markdown>{result}</Markdown>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400"
          >
            <p className="text-sm">Enter a decision above to see the analysis</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
