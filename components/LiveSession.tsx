import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from '../utils/audioUtils';
import AvatarVisualizer from './AvatarVisualizer';
import { Scenario, SupportedLanguage } from '../types';
import { Mic, MicOff, X, Loader2, AlertCircle, ChevronLeft, ChevronRight, BookOpen, Lightbulb, CheckCircle, Flag } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface LiveSessionProps {
  scenario: Scenario;
  onClose: (completed: boolean) => void;
  onAddXp: (amount: number) => void;
  onUpdateChallenge: (type: string, amount: number) => void;
  uiLanguage: SupportedLanguage;
  learningLanguage: SupportedLanguage;
}

interface TranscriptItem {
  id: string;
  role: 'user' | 'model';
  text: string;
  isFinal: boolean;
}

const LiveSession: React.FC<LiveSessionProps> = ({ scenario, onClose, onAddXp, onUpdateChallenge, uiLanguage, learningLanguage }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'connecting' | 'active' | 'error' | 'disconnected' | 'completed'>('connecting');
  const [activityMode, setActivityMode] = useState<'listening' | 'speaking' | 'idle'>('idle');
  const [showHints, setShowHints] = useState(false);

  // Script State - handle cases where script is undefined
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = scenario.script && scenario.script[currentStepIndex];
  // Default showScript to false if no script exists, otherwise true
  const [showScript, setShowScript] = useState(!!scenario.script);

  // Transcription State
  const [transcripts, setTranscripts] = useState<TranscriptItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const t = UI_TEXT[uiLanguage];

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const sessionRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const mountedRef = useRef(true);
  const sessionStartTimeRef = useRef<number>(0);
  const isMutedRef = useRef(isMuted);

  // Sync mute state to ref for audio processor usage
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Temporary buffers for streaming transcription
  const currentInputTranscriptionRef = useRef('');
  const currentOutputTranscriptionRef = useRef('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcripts, showScript]);

  const getAvatarImage = () => {
      switch(scenario.icon) {
          case 'Coffee': return "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop";
          case 'Briefcase': return "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop";
          case 'Utensils': return "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=600&auto=format&fit=crop";
          case 'Plane': return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";
          default: return "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&auto=format&fit=crop";
      }
  };

  const initializeSession = useCallback(async () => {
    if (!process.env.API_KEY) {
      setError(t.api_missing);
      setStatus('error');
      return;
    }

    try {
      setStatus('connecting');
      setError(null);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000
        } });
      } catch (permErr: any) {
        if (permErr.name === 'NotAllowedError' || permErr.name === 'PermissionDeniedError') {
           throw new Error("Permissão de microfone negada. Por favor, permita o acesso.");
        }
        throw permErr;
      }
      
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            if (!mountedRef.current) return;
            setIsConnected(true);
            setStatus('active');
            sessionStartTimeRef.current = Date.now();
            
            if (inputAudioContextRef.current && streamRef.current) {
              const source = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
              sourceRef.current = source;
              
              const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
              scriptProcessorRef.current = processor;
              
              processor.onaudioprocess = (e) => {
                 if (isMutedRef.current) return;
                 const inputData = e.inputBuffer.getChannelData(0);
                 const pcmBlob = createPcmBlob(inputData);
                 
                 sessionPromise.then(session => {
                   session.sendRealtimeInput({ media: pcmBlob });
                 });
              };
              
              source.connect(processor);
              processor.connect(inputAudioContextRef.current.destination);
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            if (!mountedRef.current) return;
            
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              setActivityMode('speaking');
              
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBytes = base64ToUint8Array(base64Audio);
              const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                 sourcesRef.current.delete(source);
                 if (sourcesRef.current.size === 0 && mountedRef.current) {
                   setActivityMode('idle');
                 }
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.outputTranscription) {
                const text = message.serverContent.outputTranscription.text;
                currentOutputTranscriptionRef.current += text;
            }
            
            if (message.serverContent?.inputTranscription) {
                const text = message.serverContent.inputTranscription.text;
                currentInputTranscriptionRef.current += text;
                setActivityMode('listening');
            }

            if (message.serverContent?.turnComplete) {
                setActivityMode('idle');

                if (currentInputTranscriptionRef.current.trim()) {
                    setTranscripts(prev => [...prev, {
                        id: Date.now() + '_user',
                        role: 'user',
                        text: currentInputTranscriptionRef.current,
                        isFinal: true
                    }]);
                    currentInputTranscriptionRef.current = '';
                }

                if (currentOutputTranscriptionRef.current.trim()) {
                     setTranscripts(prev => [...prev, {
                        id: Date.now() + '_model',
                        role: 'model',
                        text: currentOutputTranscriptionRef.current,
                        isFinal: true
                    }]);
                    currentOutputTranscriptionRef.current = '';
                }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(src => {
                try { src.stop(); } catch(e){}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setActivityMode('idle');
              currentOutputTranscriptionRef.current = ''; 
            }
          },
          onclose: () => {
            if (mountedRef.current) {
                setIsConnected(false);
                if (status !== 'completed') {
                  setStatus('disconnected');
                }
            }
          },
          onerror: (err) => {
            console.error('Session error:', err);
            if (mountedRef.current) {
                setError(t.error_conn);
                setStatus('error');
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `
${scenario.systemInstruction}

CONTEXTO ADICIONAL:
- Aja como se estivesse em uma chamada de vídeo.
- Seja expressivo e encorajador.
- Mantenha respostas curtas para diálogos dinâmicos.
`,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } }
          }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err: any) {
      console.error("Failed to initialize:", err);
      setError(err.message || "Failed to access microphone or connect to AI.");
      setStatus('error');
    }
  }, [scenario, uiLanguage, learningLanguage]);

  useEffect(() => {
    mountedRef.current = true;
    initializeSession();

    return () => {
      mountedRef.current = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
        inputAudioContextRef.current.close();
      }
      if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
        outputAudioContextRef.current.close();
      }
      sourcesRef.current.forEach(s => {
        try { s.stop(); } catch(e){}
      });
    };
  }, []);

  const handleFinishLesson = () => {
      setStatus('completed');
      
      // Calculate XP
      let xpEarned = 100;
      if (sessionStartTimeRef.current > 0) {
          const durationSeconds = (Date.now() - sessionStartTimeRef.current) / 1000;
          // Bonus XP for duration
          xpEarned += Math.floor(durationSeconds / 2);
      }
      onAddXp(xpEarned);
      onUpdateChallenge('live', 1);
  };

  const handleExit = () => {
      onClose(status === 'completed');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleNextStep = () => {
      if (scenario.script && currentStepIndex < scenario.script.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
      }
  };

  const handlePrevStep = () => {
      if (currentStepIndex > 0) {
          setCurrentStepIndex(prev => prev - 1);
      }
  };

  // Completion Screen
  if (status === 'completed') {
    return (
      <div className="flex flex-col h-full bg-slate-950 text-white relative overflow-hidden font-sans items-center justify-center p-6 text-center animate-fade-in">
         <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-400" />
         </div>
         <h2 className="text-3xl font-bold mb-2 text-white">{t.lesson_complete}</h2>
         <p className="text-slate-400 mb-8 max-w-md">
            Você completou "{scenario.title}" com sucesso. Continue praticando para desbloquear o próximo nível!
         </p>
         <button 
           onClick={handleExit}
           className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-500/20"
         >
           {t.continue}
         </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-copper-900/30 via-slate-950 to-black z-0 pointer-events-none"></div>
      
      <div className="relative z-10 flex items-center justify-between p-6 glass-dark border-b border-white/5">
        <div className="flex items-center space-x-4">
           <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${status === 'active' ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]' : 'bg-red-500'}`}></div>
           <div>
             <h2 className="text-lg font-bold tracking-tight">{scenario.title}</h2>
             <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Coach Virtual</p>
           </div>
        </div>
        <div className="flex items-center space-x-2">
            <button onClick={handleExit} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-4 md:p-6 overflow-hidden items-center justify-center">
        
        {status === 'connecting' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm">
                <Loader2 className="w-12 h-12 animate-spin text-copper-500 mb-4" />
                <p className="text-copper-200 animate-pulse">{t.connecting}</p>
            </div>
        )}

        {status === 'error' && (
             <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm px-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-red-200 mb-4">{error}</p>
                <button onClick={() => initializeSession()} className="px-6 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/30">{t.retry}</button>
            </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center relative w-full">
            <AvatarVisualizer 
                imageUrl={getAvatarImage()} 
                isActive={activityMode !== 'idle'} 
                mode={activityMode} 
            />

            {(showScript || showHints) && (
                <div className="mt-8 max-w-sm w-full animate-fade-in-up">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
                        {showScript && currentStep ? (
                             <>
                                <p className="text-copper-400 text-xs font-bold uppercase tracking-widest mb-2">
                                    Passo {currentStepIndex + 1}/{scenario.script?.length || 1}
                                </p>
                                <p className="text-white text-lg font-medium mb-1">"{currentStep.original}"</p>
                                <p className="text-slate-400 text-sm">{currentStep.translation}</p>
                             </>
                        ) : showHints && scenario.hints ? (
                             <>
                                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
                                    Dica do Coach
                                </p>
                                <p className="text-white text-md italic">
                                    "{scenario.hints[Math.floor(Math.random() * scenario.hints.length)]}"
                                </p>
                             </>
                        ) : null}
                    </div>
                </div>
            )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 w-full max-w-md relative z-30 pb-8">
            <button 
                onClick={() => { setShowScript(false); setShowHints(!showHints); }}
                className={`p-4 rounded-full transition-all border ${showHints ? 'bg-copper-600 border-copper-500 text-white shadow-lg shadow-copper-500/30' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                title={t.hint_button}
            >
                <Lightbulb className="w-6 h-6" />
            </button>

            <button 
                onClick={toggleMute}
                disabled={status !== 'active'}
                className={`p-6 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 ${
                    isMuted ? 'bg-red-500 text-white shadow-red-500/30 border-red-400' : 'bg-white text-black shadow-white/20'
                } ${status !== 'active' ? 'opacity-50 grayscale' : ''}`}
            >
                {isMuted ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            {scenario.script && (
              <button 
                  onClick={() => { setShowHints(false); setShowScript(!showScript); }}
                  className={`p-4 rounded-full transition-all border ${showScript ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                  title={t.script_mode}
              >
                  <BookOpen className="w-6 h-6" />
              </button>
            )}
            
            {/* Completion Button if on last step or no script */}
            {((scenario.script && currentStepIndex === scenario.script.length - 1) || !scenario.script) && (
                 <button 
                 onClick={handleFinishLesson}
                 className="absolute right-0 translate-x-16 p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg animate-pulse"
                 title={t.finish_lesson}
                >
                 <Flag className="w-6 h-6" />
                </button>
            )}

            {showScript && scenario.script && (
                <div className="absolute -top-16 flex gap-4">
                     <button onClick={handlePrevStep} disabled={currentStepIndex === 0} className="p-2 rounded-full bg-black/50 hover:bg-black/70 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
                     <button onClick={handleNextStep} disabled={currentStepIndex === scenario.script.length - 1} className="p-2 rounded-full bg-black/50 hover:bg-black/70 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default LiveSession;