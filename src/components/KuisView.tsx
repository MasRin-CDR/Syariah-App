import React, { useState } from 'react';
import { Award, CheckCircle2, HelpCircle, RefreshCw, XCircle } from 'lucide-react';
import { getQuizByLevel } from '../data/quizData';
import { UserMode } from '../types';
import { ArchHeader } from './IslamicPattern';

interface KuisViewProps {
  userMode: UserMode;
}

export const KuisView: React.FC<KuisViewProps> = ({ userMode }) => {
  const questions = getQuizByLevel(userMode);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === q.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <ArchHeader
        title={`Kuis Interaktif Syariah - ${userMode.toUpperCase()}`}
        subtitle="Uji dan perkuat pemahaman Anda mengenai syariat Islam, thaharah, fiqh muamalah, dan ilmu waris."
      />

      {quizFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-emerald-900/10 dark:border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-2xl font-bold">
            🏆
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans">
            Kuis Selesai!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Skor Anda: <span className="font-extrabold text-emerald-700">{score}</span> dari {questions.length} Soal Benar
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Coba Ulang Kuis</span>
          </button>
        </div>
      ) : q ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-emerald-900/10 dark:border-slate-800 space-y-6">
          {/* Quiz Header Progress */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              Soal {currentIdx + 1} dari {questions.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold uppercase">
              {q.category}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 font-sans leading-relaxed">
            {q.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q.correctAnswerIndex;

              let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
              if (isSelected) {
                btnStyle = 'bg-amber-50 border-amber-400 text-amber-950 font-bold ring-2 ring-amber-400/40';
              }
              if (isSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-extrabold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box after submission */}
          {isSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold text-emerald-900 dark:text-emerald-200">Penjelasan Syariah:</div>
              <p className="leading-relaxed">{q.explanation}</p>
              {q.dalilRef && <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400">📌 Dalil: {q.dalilRef}</div>}
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-extrabold text-sm hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                Jawab
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-emerald-950 font-extrabold text-sm hover:bg-amber-400 transition-colors"
              >
                {currentIdx < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
