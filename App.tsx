
import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, EXERCISES } from './constants';
import { Exercise, UserProgress } from './types';
import { loadProgress, saveProgress, clearProgress } from './utils/storage';
import { getRecommendations } from './utils/recommendations';

const DickenLogo = () => (
  <div className="bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center">
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5L10 25V50C10 75 50 95 50 95C50 95 90 75 90 50V25L50 5Z" fill="#004c97" stroke="white" strokeWidth="4"/>
      <path d="M25 40H75M25 60H75" stroke="#ee3124" strokeWidth="8" strokeLinecap="round"/>
      <text x="50" y="55" fontSize="24" fontWeight="900" fill="white" textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: 'Outfit, sans-serif' }}>D</text>
    </svg>
  </div>
);

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync with LocalStorage whenever progress changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleComplete = (id: string) => {
    const alreadyCompleted = progress.completedIds.includes(id);
    
    setProgress(prev => {
      const isCompleted = prev.completedIds.includes(id);
      const newCompleted = isCompleted 
        ? prev.completedIds.filter(cid => cid !== id)
        : [...prev.completedIds, id];
      
      return {
        completedIds: newCompleted,
        lastCompletedId: isCompleted ? prev.lastCompletedId : id
      };
    });

    if (!alreadyCompleted) {
      setShowRecommendations(true);
      setSelectedExercise(null);
    } else {
      setSelectedExercise(null);
    }
  };

  const executeReset = () => {
    clearProgress();
    setProgress({ completedIds: [], lastCompletedId: null });
    setShowRecommendations(false);
    setSelectedExercise(null);
    setShowResetConfirm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recommendations = useMemo(() => getRecommendations(progress), [progress]);

  const totalScore = progress.completedIds.length;
  const totalPossible = EXERCISES.length;

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-slate-50 antialiased overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#004c97] text-white p-6 shadow-xl rounded-b-[2.5rem] border-b-4 border-[#ee3124] sticky top-0 z-40">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <DickenLogo />
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">SOMMAR UTMANING</h1>
              <p className="text-blue-200 font-bold text-xs uppercase tracking-widest mt-1 opacity-80">Dicken 1933</p>
            </div>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-md text-right border border-white/10">
            <div className="text-2xl font-black leading-none">{totalScore} / {totalPossible}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-center">Mål</div>
          </div>
        </div>
        
        {/* Main Progress Bar */}
        <div className="bg-[#003870] h-4 rounded-full overflow-hidden border border-blue-400/20 shadow-inner">
          <div 
            className="bg-[#ee3124] h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(238,49,36,0.5)]" 
            style={{ width: `${totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 space-y-12 pb-32">
        {CATEGORIES.map(category => {
          const catExercises = EXERCISES.filter(e => e.categoryId === category.id);
          const catCompleted = catExercises.filter(e => progress.completedIds.includes(e.id)).length;
          const catPercent = catExercises.length > 0 ? (catCompleted / catExercises.length) * 100 : 0;
          
          return (
            <section key={category.id} className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h2 className="flex items-center gap-3 font-black text-slate-800 text-lg uppercase tracking-tight">
                  <span className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center text-xl shadow-lg transform -rotate-2 text-white`}>
                    {category.icon}
                  </span>
                  {category.name}
                </h2>
                <div className="text-right">
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {catCompleted} av {catExercises.length} klar
                  </div>
                  {/* Category Progress Bar */}
                  <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                    <div 
                      className={`${category.color} h-full transition-all duration-500`}
                      style={{ width: `${catPercent}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4">
                {catExercises.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => setSelectedExercise(exercise)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all active:scale-[0.98] flex items-center justify-between gap-4 group relative overflow-hidden ${
                      progress.completedIds.includes(exercise.id)
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-white border-slate-100 shadow-sm hover:border-blue-200'
                    }`}
                  >
                    <div className="flex-1 relative z-10">
                      <h3 className={`font-black leading-snug ${progress.completedIds.includes(exercise.id) ? 'text-emerald-800 opacity-60' : 'text-slate-800'}`}>
                        {exercise.title}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all z-10 ${
                      progress.completedIds.includes(exercise.id)
                        ? 'bg-emerald-500 border-emerald-500 text-white rotate-0'
                        : 'border-slate-200 group-hover:border-blue-400 rotate-12'
                    }`}>
                      {progress.completedIds.includes(exercise.id) && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}

        {/* Improved Reset Action */}
        <div className="pt-16 pb-8 flex flex-col items-center gap-6">
          <div className="w-12 h-1 bg-slate-200 rounded-full" />
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-red-500 transition-colors py-3 px-8 rounded-2xl bg-slate-100/50 border border-slate-200 active:scale-95 touch-manipulation"
          >
            Nollställ Framsteg
          </button>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Dicken Handboll • Sommar 2024</p>
        </div>
      </main>

      {/* Custom Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[100] flex items-center justify-center p-8 animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-[2.5rem] p-10 shadow-2xl space-y-8 border-t-8 border-[#ee3124]">
            <div className="text-center space-y-4">
              <div className="text-5xl">⚠️</div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none">Nollställ allt?</h2>
              <p className="text-slate-500 font-bold leading-relaxed">
                Är du säker på att du vill börja om från början? Din framgång kommer att raderas helt.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={executeReset}
                className="w-full py-5 bg-[#ee3124] text-white rounded-3xl font-black text-lg shadow-xl shadow-red-200 active:scale-95 transition-transform"
              >
                JA, RADERA ALLT
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full py-4 text-slate-400 font-black uppercase tracking-widest text-xs"
              >
                NEJ, GÅ TILLBAKA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 ring-4 ring-blue-500/20"
          >
            <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-8 sm:hidden" />
            
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1 pr-4">
                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-sm ${
                  CATEGORIES.find(c => c.id === selectedExercise.categoryId)?.color
                }`}>
                  {CATEGORIES.find(c => c.id === selectedExercise.categoryId)?.name}
                </span>
                <h2 className="text-3xl font-black text-slate-800 mt-4 leading-tight tracking-tighter">{selectedExercise.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedExercise(null)}
                className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 mb-8">
              <p className="text-slate-700 text-lg leading-relaxed font-medium">
                {selectedExercise.description}
              </p>
            </div>

            {selectedExercise.videoUrl && (
              <a 
                href={selectedExercise.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full bg-[#004c97] p-5 rounded-3xl mb-8 group active:scale-[0.98] transition-all shadow-lg border-b-4 border-blue-900"
              >
                <div className="w-12 h-12 bg-white text-[#004c97] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-black text-white text-lg">Se video</div>
                  <div className="text-xs text-blue-200 font-bold uppercase tracking-wider">Träningsguide</div>
                </div>
              </a>
            )}

            <button
              onClick={() => toggleComplete(selectedExercise.id)}
              className={`w-full py-6 rounded-3xl text-xl font-black shadow-xl transition-all active:scale-95 border-b-4 ${
                progress.completedIds.includes(selectedExercise.id)
                ? 'bg-slate-200 text-slate-500 border-slate-300'
                : 'bg-[#ee3124] text-white border-red-800 shadow-red-200'
              }`}
            >
              {progress.completedIds.includes(selectedExercise.id) ? 'Ångra Slutförd' : 'Klar! ✅'}
            </button>
          </div>
        </div>
      )}

      {/* Recommendations Overlay */}
      {showRecommendations && recommendations.length > 0 && (
        <div className="fixed inset-0 bg-slate-900/90 z-[60] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300 backdrop-blur-md">
          <div className="w-full max-w-sm space-y-8">
            <div className="text-center space-y-4">
              <div className="text-7xl animate-bounce">🔥</div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Snyggt jobbat!</h2>
              <p className="text-blue-200 font-bold text-lg">Fortsätt med nästa utmaning:</p>
            </div>
            
            <div className="grid gap-5">
              {recommendations.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setSelectedExercise(ex);
                    setShowRecommendations(false);
                  }}
                  className="bg-white p-6 rounded-[2rem] text-left border-b-4 border-slate-200 active:scale-[0.97] transition-all shadow-2xl ring-4 ring-white/10"
                >
                  <span className="text-[10px] font-black uppercase text-blue-500 mb-2 block tracking-widest">REKOMMENDERAT</span>
                  <h3 className="text-2xl font-black text-slate-800 leading-tight tracking-tight">{ex.title}</h3>
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${CATEGORIES.find(c => c.id === ex.categoryId)?.color}`}></span>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {CATEGORIES.find(c => c.id === ex.categoryId)?.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowRecommendations(false)}
              className="w-full py-4 text-white/40 font-black uppercase tracking-widest text-xs hover:text-white transition-colors"
            >
              Stäng för nu
            </button>
          </div>
        </div>
      )}

      {/* Final Celebration */}
      {totalScore === totalPossible && totalPossible > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col items-center justify-center overflow-hidden">
           <div className="bg-amber-400 text-white px-8 py-4 rounded-full shadow-2xl font-black text-lg uppercase tracking-widest border-4 border-white animate-bounce pointer-events-auto mt-20">
             🏆 Dicken Sommar-Mästare! 🏆
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
