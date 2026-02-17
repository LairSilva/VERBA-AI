import React from 'react';
import { UserStats, DailyChallenge, SupportedLanguage } from '../types';
import { Trophy, CheckCircle2, Crown, Flame, Target } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface GamificationDashboardProps {
  stats: UserStats;
  challenges: DailyChallenge[];
  uiLanguage: SupportedLanguage;
}

const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ stats, challenges, uiLanguage }) => {
  const xpPerLevel = 500;
  const t = UI_TEXT[uiLanguage];

  return (
    <div className="space-y-4 text-white">
       {/* Daily Progress Card */}
       <div className="bg-surface p-6 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-copper-600/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t.level} {stats.level}</h3>
             <Crown className="w-5 h-5 text-copper-400" />
          </div>
          
          <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-bold text-white">{stats.xp} XP</span>
              <span className="text-xs text-copper-400 font-medium">Elite Member</span>
          </div>
          
          <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
             <div 
                className="bg-gradient-to-r from-copper-600 to-copper-400 h-full rounded-full" 
                style={{ width: `${((stats.xp % xpPerLevel) / xpPerLevel) * 100}%` }}
             ></div>
          </div>
       </div>

       {/* Mini Stats */}
       <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
             <Flame className="w-6 h-6 text-orange-500 mb-2" />
             <span className="text-2xl font-bold">{stats.streak}</span>
             <span className="text-[10px] text-slate-500 uppercase tracking-wide">Dias</span>
          </div>
          <div className="bg-surface p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
             <Trophy className="w-6 h-6 text-gold-400 mb-2" />
             <span className="text-2xl font-bold">{stats.points}</span>
             <span className="text-[10px] text-slate-500 uppercase tracking-wide">Pontos</span>
          </div>
       </div>
    </div>
  );
};

export default GamificationDashboard;