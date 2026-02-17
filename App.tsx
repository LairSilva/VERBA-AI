import React, { useState, useEffect } from 'react';
import { getScenarios, getIcon, getChallenges, UI_TEXT } from './constants';
import { AppView, Scenario, UserStats, SupportedLanguage, DailyChallenge } from './types';
import LiveSession from './components/LiveSession';
import ChatSession from './components/ChatSession';
import GamificationDashboard from './components/GamificationDashboard';
import { Mic, MessageSquare, Star, Zap, Sparkles, AudioWaveform, Lock, CheckCircle, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  
  const [uiLanguage, setUiLanguage] = useState<SupportedLanguage>('pt-BR');
  const [learningLanguage, setLearningLanguage] = useState<SupportedLanguage>('en-US');

  // Gamification State
  const [userStats, setUserStats] = useState<UserStats>({
    xp: 2450,
    level: 5,
    streak: 12,
    points: 890,
    completedScenarios: ['s01'] // Initialize with first one completed for demo, or empty
  });

  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);

  // Initialize/Update challenges when language changes
  useEffect(() => {
    setChallenges(getChallenges(uiLanguage));
  }, [uiLanguage]);
  
  const scenarios = getScenarios(learningLanguage);
  const t = UI_TEXT[uiLanguage];

  const handleStartLive = (scenario: Scenario, locked: boolean) => {
    if (locked) return;
    setSelectedScenario(scenario);
    setCurrentView(AppView.LIVE_SESSION);
  };

  const handleStartChat = (scenario: Scenario, locked: boolean) => {
    if (locked) return;
    setSelectedScenario(scenario);
    setCurrentView(AppView.CHAT_SESSION);
  };

  const handleBack = (completed: boolean = false) => {
    if (completed && selectedScenario) {
        handleCompleteScenario(selectedScenario.id);
    }
    setCurrentView(AppView.HOME);
    setSelectedScenario(null);
  };

  const handleCompleteScenario = (id: string) => {
      if (!userStats.completedScenarios.includes(id)) {
          setUserStats(prev => ({
              ...prev,
              completedScenarios: [...prev.completedScenarios, id]
          }));
      }
  };

  const handleAddXp = (amount: number) => {
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + amount,
      points: prev.points + Math.floor(amount / 2)
    }));
  };

  const handleUpdateChallenge = (type: string, amount: number) => {
    setChallenges(prev => prev.map(ch => {
        if (ch.type === type && !ch.completed) {
            const newCurrent = Math.min(ch.current + amount, ch.target);
            const isCompleted = newCurrent >= ch.target;
            if (isCompleted) handleAddXp(ch.reward);
            return { ...ch, current: newCurrent, completed: isCompleted };
        }
        return ch;
    }));
  };

  // Group scenarios by tier
  const tiers = {
    Beginner: scenarios.filter(s => s.difficulty === 'Beginner'),
    Intermediate: scenarios.filter(s => s.difficulty === 'Intermediate'),
    Advanced: scenarios.filter(s => s.difficulty === 'Advanced'),
    Master: scenarios.filter(s => s.difficulty === 'Master'),
  };

  const renderScenarioCard = (scenario: Scenario, index: number, allScenarios: Scenario[]) => {
      // Locking Logic: 
      // Scenario is unlocked if it's the very first scenario globally OR if the previous scenario ID is in completedScenarios
      
      const globalIndex = scenarios.findIndex(s => s.id === scenario.id);
      const isFirst = globalIndex === 0;
      const prevScenarioId = globalIndex > 0 ? scenarios[globalIndex - 1].id : null;
      const isUnlocked = isFirst || (prevScenarioId && userStats.completedScenarios.includes(prevScenarioId));
      
      const isCompleted = userStats.completedScenarios.includes(scenario.id);

      return (
        <div 
            key={scenario.id}
            className={`group relative bg-surface border rounded-3xl overflow-hidden transition-all duration-300 
                ${isUnlocked 
                    ? 'border-white/5 hover:border-copper-500/30 hover:shadow-2xl hover:shadow-copper-900/10 hover:-translate-y-1 cursor-pointer' 
                    : 'border-white/5 opacity-60 grayscale cursor-not-allowed'
                }`}
        >
            <div className="h-40 w-full bg-surface_light relative overflow-hidden">
                <div className={`absolute inset-0 opacity-20 bg-copper-900 mix-blend-overlay`}></div>
                
                {/* Status Badges */}
                <div className="absolute top-4 right-4 z-20">
                    {isCompleted ? (
                        <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                    ) : !isUnlocked ? (
                        <div className="bg-slate-800 text-slate-400 p-2 rounded-full border border-white/10 shadow-lg">
                            <Lock className="w-4 h-4" />
                        </div>
                    ) : null}
                </div>

                <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-copper-400">
                        {getIcon(scenario.icon)}
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">{scenario.title}</h4>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2">{scenario.description}</p>
                
                {isUnlocked ? (
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => handleStartLive(scenario, !isUnlocked)}
                            className="flex items-center justify-center space-x-2 bg-gradient-to-br from-copper-600 to-copper-700 text-white py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-copper-900/20"
                        >
                            <Mic className="w-4 h-4" />
                            <span>{t.live_btn}</span>
                        </button>
                        <button 
                            onClick={() => handleStartChat(scenario, !isUnlocked)}
                            className="flex items-center justify-center space-x-2 bg-surface_light border border-white/10 text-slate-300 py-3 rounded-xl font-bold text-sm hover:bg-white/5 hover:text-white transition-all"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>{t.chat_btn}</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-3 bg-surface_light/50 border border-white/5 rounded-xl text-slate-500 text-sm font-medium">
                        <Lock className="w-4 h-4 mr-2" />
                        {t.complete_prev}
                    </div>
                )}
            </div>
        </div>
      );
  };

  if (currentView === AppView.LIVE_SESSION && selectedScenario) {
    return (
      <LiveSession 
        scenario={selectedScenario} 
        onClose={handleBack} 
        uiLanguage={uiLanguage}
        learningLanguage={learningLanguage}
        onAddXp={handleAddXp}
        onUpdateChallenge={handleUpdateChallenge}
      />
    );
  }

  if (currentView === AppView.CHAT_SESSION && selectedScenario) {
    return (
      <ChatSession 
        scenario={selectedScenario} 
        onBack={() => handleBack(false)} 
        uiLanguage={uiLanguage} 
        learningLanguage={learningLanguage}
        onAddXp={handleAddXp}
        onUpdateChallenge={handleUpdateChallenge}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-slate-300 selection:bg-copper-500 selection:text-white pb-20">
      
      {/* HEADER */}
      <nav className="fixed w-full z-50 glass-dark border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-copper-400 to-copper-700 flex items-center justify-center shadow-lg shadow-copper-900/50">
               <AudioWaveform className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Verba AI</h1>
              <p className="text-[10px] uppercase tracking-widest text-copper-400 font-semibold">Edição Elite</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-surface_light border border-white/5">
                <Zap className="w-4 h-4 text-gold-400 fill-gold-400" />
                <span className="font-bold text-white">{userStats.streak} {t.streak}</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-surface_light border border-white/5">
                <Star className="w-4 h-4 text-copper-400" />
                <span className="font-bold text-white">{userStats.points} pts</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-6xl mx-auto space-y-12">
        
        {/* HERO + DASHBOARD */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
             <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {t.hero_title_1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper-400 to-copper-600">{t.hero_title_2}</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-lg">
              {t.hero_desc}
            </p>
          </div>
          
          <div className="lg:col-span-1">
             <GamificationDashboard stats={userStats} challenges={challenges} uiLanguage={uiLanguage} />
          </div>
        </section>

        {/* SCENARIOS JOURNEY */}
        <section>
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-copper-500" />
                    {t.practice_scenarios}
                </h3>
            </div>

            {/* Beginner Tier */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <h4 className="text-copper-400 font-bold uppercase tracking-widest text-sm border border-copper-500/30 px-4 py-1 rounded-full bg-copper-900/20">{t.beginner}</h4>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.Beginner.map((s, i) => renderScenarioCard(s, i, scenarios))}
                </div>
            </div>

            {/* Intermediate Tier */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <h4 className="text-blue-400 font-bold uppercase tracking-widest text-sm border border-blue-500/30 px-4 py-1 rounded-full bg-blue-900/20">{t.intermediate}</h4>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.Intermediate.map((s, i) => renderScenarioCard(s, i, scenarios))}
                </div>
            </div>

            {/* Advanced Tier */}
            <div className="mb-12">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm border border-emerald-500/30 px-4 py-1 rounded-full bg-emerald-900/20">{t.advanced}</h4>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.Advanced.map((s, i) => renderScenarioCard(s, i, scenarios))}
                </div>
            </div>

             {/* Master Tier */}
             <div className="mb-12">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <h4 className="text-purple-400 font-bold uppercase tracking-widest text-sm border border-purple-500/30 px-4 py-1 rounded-full bg-purple-900/20">Fluente</h4>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.Master.map((s, i) => renderScenarioCard(s, i, scenarios))}
                </div>
            </div>

        </section>
      </main>
    </div>
  );
};

export default App;