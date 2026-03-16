import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  CheckCircle2, 
  Layout, 
  Cpu, 
  GitBranch, 
  Users, 
  UserCheck, 
  Lightbulb, 
  Heart, 
  Zap,
  Star,
  MessageSquare,
  Trophy,
  Rocket
} from 'lucide-react';
import { SURVEY_CATEGORIES } from './constants';
import { Rating } from './types';

const LOGO_NORDESTE = "https://nordesteloc.com.br/wp-content/themes/edeas/assets/images/favicon-nordeste.svg";
const LOGO_NIT = "https://raw.githubusercontent.com/nit-a11y/portal-compras-/refs/heads/main/nit%20(2).png";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  infra: <Layout className="w-6 h-6" />,
  tech: <Cpu className="w-6 h-6" />,
  process: <GitBranch className="w-6 h-6" />,
  comm: <Users className="w-6 h-6" />,
  lead: <UserCheck className="w-6 h-6" />,
  innov: <Lightbulb className="w-6 h-6" />,
  sat: <Heart className="w-6 h-6" />,
  nit: <Zap className="w-6 h-6" />,
  golden: <Star className="w-6 h-6" />,
};

const RATING_EMOJIS = ['😠', '🙁', '😐', '🙂', '🤩'];
const RATING_LABELS_SHORT = [
  'Discordo Totalmente',
  'Discordo Parcialmente',
  'Neutro',
  'Concordo Parcialmente',
  'Concordo Totalmente'
];

// Progress circle component for each category
const StepIndicator: React.FC<{ index: number; active: boolean }> = ({ index, active }) => (
  <div className={`flex flex-col items-center gap-1 ${active ? 'opacity-100' : 'opacity-30'}`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
      active ? 'bg-nit-red text-white scale-110 shadow-lg shadow-nit-red/30' : 'bg-nit-gray-medium text-nit-gray-dark'
    }`}>
      {index + 1}
    </div>
  </div>
);

export default function App() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const totalSteps = SURVEY_CATEGORIES.length;
  const currentCategory = SURVEY_CATEGORIES[currentStep];

  const progress = useMemo(() => {
    if (currentStep < 0) return 0;
    return ((currentStep + 1) / totalSteps) * 100;
  }, [currentStep, totalSteps]);

  const handleRating = (questionId: string, rating: Rating) => {
    setAnswers(prev => ({ ...prev, [questionId]: rating }));
    // Auto-scroll to next question if it's not the last one in category? 
    // Maybe too aggressive. Let's just highlight.
  };

  const handleOpenAnswer = (questionId: string, text: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: text }));
  };

  const handleComment = (questionId: string, text: string) => {
    setComments(prev => ({ ...prev, [questionId]: text }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > -1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    console.log('Survey submitted:', { answers, comments });
    setIsSubmitted(true);
    setShowCelebration(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-nit-gray-light">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          className="nit-card max-w-lg w-full text-center py-16 relative overflow-hidden"
        >
          {/* Confetti-like background elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-nit-red/20"
              initial={{ 
                x: Math.random() * 400 - 200, 
                y: Math.random() * 400 - 200,
                opacity: 0 
              }}
              animate={{ 
                y: [0, -100, 100],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}

          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Trophy className="w-24 h-24 text-nit-red" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-black mb-4 text-nit-gray-dark">Missão Cumprida!</h1>
          <p className="text-xl text-nit-gray-dark opacity-80 mb-10 px-6">
            Sua voz foi ouvida! Juntos, estamos transformando a <span className="font-bold text-nit-red">Nordeste Locações</span> através da inovação do <span className="font-bold">NIT</span>.
          </p>
          
          <div className="flex flex-col gap-4 items-center">
            <button 
              onClick={() => window.location.reload()}
              className="nit-button-primary text-lg px-10 py-4 flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Responder Novamente
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentStep === -1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white overflow-hidden relative">
        {/* Background Decoration */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-nit-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-nit-red/5 rounded-full blur-3xl" />

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-2xl w-full text-center z-10"
        >
          <div className="flex justify-center gap-6 mb-12">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={LOGO_NORDESTE} 
              alt="Nordeste Locações" 
              className="h-20" 
              referrerPolicy="no-referrer" 
            />
            <div className="h-20 w-px bg-nit-gray-medium" />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src={LOGO_NIT} 
              alt="NIT" 
              className="h-14 self-center" 
              referrerPolicy="no-referrer" 
            />
          </div>
          
          <h1 className="text-5xl font-black text-nit-gray-dark mb-8 leading-tight">
            Pesquisa de Clima <br/>
            <span className="text-nit-red relative">
              Organizacional
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-2 bg-nit-red/20 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h1>
          
          <p className="text-xl text-nit-gray-dark opacity-70 mb-12 leading-relaxed max-w-lg mx-auto">
            Sua opinião é o combustível da nossa evolução. Participe e ajude o <span className="font-bold text-nit-red">NIT</span> a construir o futuro da Nordeste Locações.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Zap className="w-8 h-8" />, title: "Rápido", desc: "Menos de 5 min" },
              { icon: <Users className="w-8 h-8" />, title: "Anônimo", desc: "100% Seguro" },
              { icon: <Lightbulb className="w-8 h-8" />, title: "Impactante", desc: "Gera Mudanças" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                whileHover={{ y: -5, borderColor: '#C00000' }}
                className="p-8 rounded-3xl bg-white border-2 border-nit-gray-light shadow-sm transition-all"
              >
                <div className="text-nit-red mb-4 flex justify-center">{item.icon}</div>
                <p className="font-black text-lg text-nit-gray-dark">{item.title}</p>
                <p className="text-sm opacity-50">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep(0)}
            className="nit-button-primary text-xl px-16 py-5 shadow-2xl shadow-nit-red/40 flex items-center gap-4 mx-auto group"
          >
            Começar Agora
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
        
        <footer className="mt-16 text-sm text-nit-gray-dark opacity-30 font-medium">
          © 2026 Nordeste Locações — Núcleo de Inteligência e Tecnologia (NIT)
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nit-gray-light pb-32">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 px-4 py-4 border-b border-nit-gray-medium">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_NORDESTE} alt="Nordeste Locações" className="h-8" referrerPolicy="no-referrer" />
              <div className="h-6 w-px bg-nit-gray-medium" />
              <img src={LOGO_NIT} alt="NIT" className="h-6" referrerPolicy="no-referrer" />
            </div>
            
            <div className="hidden md:flex gap-2">
              {SURVEY_CATEGORIES.map((_, i) => (
                <StepIndicator key={i} index={i} active={i <= currentStep} />
              ))}
            </div>

            <div className="text-right">
              <span className="text-[10px] font-black text-nit-red uppercase tracking-[0.2em] block">Progresso</span>
              <span className="text-sm font-bold text-nit-gray-dark">{Math.round(progress)}%</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-nit-gray-medium rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-nit-red to-nit-red-dark"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="flex flex-col items-center text-center mb-12">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-nit-red/10 flex items-center justify-center text-nit-red mb-6 border border-nit-gray-light"
              >
                {CATEGORY_ICONS[currentCategory.id]}
              </motion.div>
              <h2 className="text-3xl font-black text-nit-gray-dark mb-2">{currentCategory.title}</h2>
              <p className="text-lg text-nit-gray-dark opacity-60 max-w-md">{currentCategory.description}</p>
            </div>

            <div className="space-y-10">
              {currentCategory.questions.map((q, idx) => (
                <motion.div 
                  key={q.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.15 }}
                  className="nit-card group relative"
                >
                  <div className="flex justify-between items-start mb-8">
                    <p className="text-xl font-bold text-nit-gray-dark leading-tight pr-8">{q.text}</p>
                    {q.type === 'rating' && (
                      <button 
                        onClick={() => setActiveCommentId(activeCommentId === q.id ? null : q.id)}
                        className={`p-2 rounded-full transition-all ${
                          comments[q.id] || activeCommentId === q.id 
                            ? 'bg-nit-red text-white' 
                            : 'bg-nit-gray-light text-nit-gray-dark hover:bg-nit-gray-medium'
                        }`}
                        title="Adicionar comentário"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  {q.type === 'rating' ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-5 gap-2 sm:gap-4">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            onClick={() => handleRating(q.id, val as Rating)}
                            className={`group/btn relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                              answers[q.id] === val 
                                ? 'bg-nit-red border-nit-red text-white shadow-xl shadow-nit-red/30 -translate-y-2' 
                                : 'bg-white border-nit-gray-light hover:border-nit-red/30 text-nit-gray-dark'
                            }`}
                          >
                            <span className="text-3xl sm:text-4xl mb-1 filter grayscale-[0.5] group-hover/btn:grayscale-0 transition-all">
                              {RATING_EMOJIS[val - 1]}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-none ${
                              answers[q.id] === val ? 'text-white' : 'opacity-40'
                            }`}>
                              {RATING_LABELS_SHORT[val - 1].split(' ')[0]}
                            </span>
                            
                            {answers[q.id] === val && (
                              <motion.div 
                                layoutId={`active-glow-${q.id}`}
                                className="absolute inset-0 rounded-2xl bg-white/10"
                              />
                            )}
                          </button>
                        ))}
                      </div>

                      <AnimatePresence>
                        {(activeCommentId === q.id || comments[q.id]) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4">
                              <label className="text-xs font-black text-nit-red uppercase mb-2 block">Seu comentário (opcional)</label>
                              <textarea
                                value={comments[q.id] || ''}
                                onChange={(e) => handleComment(q.id, e.target.value)}
                                placeholder="Conte-nos mais sobre sua resposta..."
                                className="w-full p-4 rounded-2xl bg-nit-gray-light border-2 border-transparent focus:border-nit-red outline-none transition-all min-h-[80px] text-sm"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="relative">
                      <textarea
                        value={answers[q.id] || ''}
                        onChange={(e) => handleOpenAnswer(q.id, e.target.value)}
                        placeholder="Sua resposta sincera ajuda muito..."
                        className="w-full p-6 rounded-2xl bg-nit-gray-light border-2 border-transparent focus:border-nit-red outline-none transition-all min-h-[160px] text-lg font-medium"
                      />
                      <div className="absolute bottom-4 right-4 text-nit-red opacity-20">
                        <MessageSquare className="w-8 h-8" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50">
          <div className="bg-nit-gray-dark/90 backdrop-blur-xl rounded-[2rem] p-3 flex justify-between items-center shadow-2xl border border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`p-4 rounded-2xl font-bold transition-all ${
                currentStep === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Categoria</span>
              <span className="text-white font-bold">{currentStep + 1} / {totalSteps}</span>
            </div>

            <button
              onClick={nextStep}
              className="bg-nit-red hover:bg-nit-red-dark text-white p-4 px-8 rounded-2xl font-black flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-nit-red/40"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  Finalizar
                  <Send className="w-5 h-5" />
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
