import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, BrainCircuit, Moon, Undo2, Lock } from 'lucide-react';
import { SPREADS } from '@/data/spreads';
import { TAROT_DECK } from '@/data/cards';
import { Spread, TarotCard, CardInReading } from '@/types';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent } from '@/components/ui/Card';
import { generateTarotReading } from '@/services/ai';
import { useAuth } from '@/context/AuthContext';
import { db, signInWithGoogle } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

export default function Draw() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Question, 2: Spread, 3: Draw, 4: Interpreting
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [drawnCards, setDrawnCards] = useState<{ card: TarotCard; isReversed: boolean }[]>([]);
  const [isCasting, setIsCasting] = useState(false);

  const handleStartDrawing = (spread: Spread) => {
    setSelectedSpread(spread);
    setStep(3);
  };

  const drawCard = () => {
    if (!selectedSpread || drawnCards.length >= selectedSpread.cardCount) return;

    // Filter out already drawn cards
    const availableCards = TAROT_DECK.filter(c => !drawnCards.find(d => d.card.id === c.id));
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    const isReversed = Math.random() > 0.7; // 30% chance for reversed

    setDrawnCards(prev => [...prev, { card: randomCard, isReversed }]);
  };

  const finalizeReading = async () => {
    setIsCasting(true);
    setStep(4);

    if (!selectedSpread) return;

    try {
      const drawnWithContext = drawnCards.map((dc, i) => ({
        ...dc,
        position: selectedSpread.positions[i],
        positionMeaning: selectedSpread.positionMeanings[i]
      }));

      const readingData = await generateTarotReading(question, selectedSpread.name, drawnWithContext);
      
      const readingPayload = {
        userId: user ? user.uid : 'anonymous',
        question,
        spreadId: selectedSpread.id,
        cards: drawnWithContext.map(c => ({
          cardId: c.card.id,
          name: c.card.name,
          isReversed: c.isReversed,
          position: c.position,
          positionMeaning: c.positionMeaning,
          meaning: c.isReversed ? c.card.meaningReversed : c.card.meaningUpright
        })),
        aiSummary: readingData.summary,
        aiGuidance: readingData.aiGuidance,
        createdAt: serverTimestamp(),
        isPremium: selectedSpread.isPremium
      };

      if (user) {
        // Save to Firestore
        const docRef = await addDoc(collection(db, 'readings'), readingPayload);
        
        // Update user stats
        await updateDoc(doc(db, 'users', user.uid), {
          lastReadingAt: serverTimestamp(),
          streak: increment(1)
        });

        navigate(`/reading/${docRef.id}`);
      } else {
        // Fallback to local storage for guests
        const id = Date.now().toString();
        const guestReading = { ...readingPayload, id, createdAt: Date.now() };
        const history = JSON.parse(localStorage.getItem('arcana_history') || '[]');
        history.unshift(guestReading);
        localStorage.setItem('arcana_history', JSON.stringify(history));
        navigate(`/reading/${id}`);
      }
    } catch (err) {
      console.error(err);
      setIsCasting(false);
      setStep(3);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, filter: 'blur(10px)', scale: 0.98, y: 10 },
    animate: { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 },
    exit: { opacity: 0, filter: 'blur(10px)', scale: 1.02, y: -10 },
  };

  const stepTransition = {
    duration: 0.8,
    ease: [0.23, 1, 0.32, 1],
  };

  return (
    <div className="min-h-screen px-6 pt-24 pb-32 overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* Step 1: Question Entry */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            className="max-w-xl mx-auto space-y-8"
          >
            <div className="text-center">
              <Moon className="mx-auto mb-6 text-primary" size={40} />
              <h1 className="text-3xl md:text-5xl font-serif mb-4">What brings you here?</h1>
              <p className="text-muted-foreground font-light">Enter a question or focus on a situation. Or, simply proceed for a general reading.</p>
            </div>

            <div className="space-y-6">
              <Textarea 
                placeholder="Type your question here (e.g., What should I know about my career right now?)"
                className="min-h-[160px] glass text-lg p-6 rounded-3xl"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              
              <div className="flex flex-wrap gap-2 justify-center">
                {['Relationship', 'Career', 'Learning', 'Personal Growth'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setQuestion(`What should I know about my ${p.toLowerCase()} right now?`)}
                    className="px-4 py-2 rounded-full glass text-xs font-semibold tracking-wider uppercase hover:bg-primary/20 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-16 rounded-full text-lg font-serif bg-primary hover:bg-primary/90"
              >
                Choose Spread <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Spread Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            className="max-w-4xl mx-auto pb-12"
          >
            <div className="flex items-center gap-4 mb-10">
              <button onClick={() => setStep(1)} className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                <Undo2 size={20} />
              </button>
              <h1 className="text-3xl md:text-5xl font-serif">Select your spread.</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPREADS.map((spread) => (
                <div 
                  key={spread.id} 
                  onClick={() => handleStartDrawing(spread)}
                  className="relative glass p-6 rounded-3xl cursor-pointer group transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-xl bg-primary/20 text-primary">
                      <Sparkles size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif mb-1">{spread.name}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-4">{spread.cardCount} Cards</p>
                  <p className="text-sm text-muted-foreground font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity">{spread.description}</p>
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Draw Cards */}
        {step === 3 && selectedSpread && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            className="w-full max-w-5xl mx-auto flex flex-col items-center pt-6"
          >
            <div className="text-center mb-12">
              <p className="text-accent uppercase tracking-widest text-[10px] font-bold mb-2">Sacred Space</p>
              <h2 className="text-3xl md:text-5xl font-serif mb-2">{selectedSpread.name}</h2>
              <p className="text-muted-foreground text-sm font-light">
                {drawnCards.length < selectedSpread.cardCount 
                  ? `Focus your energy and draw the ${drawnCards.length + 1}th card...`
                  : 'All cards have been revealed. Proceed to interpretation.'}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start w-full">
              {/* Left: The Deck */}
              <div className="lg:sticky lg:top-32 flex flex-col items-center">
                <div className="relative w-40 h-64 md:w-48 md:h-72 mb-10 perspective-1000">
                  <AnimatePresence>
                    {/* Visual Stack Effect */}
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute inset-0 bg-card border border-primary/20 rounded-2xl shadow-xl"
                        style={{ transform: `translateY(${i * -2}px) translateZ(${i * -5}px)`, opacity: 1 - (i * 0.15) }}
                      >
                        <div className="w-full h-full bg-[#0d0d1a]/40 rounded-2xl flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] mix-blend-overlay" />
                          <Moon size={40} className="text-primary/20" />
                        </div>
                      </div>
                    ))}
                    
                    {/* The "Draw" Trigger */}
                    {drawnCards.length < selectedSpread.cardCount && (
                      <motion.div 
                        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                        drag
                        dragSnapToOrigin
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.6}
                        onDragEnd={(_, info) => {
                          if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
                            drawCard();
                          }
                        }}
                        onTap={() => drawCard()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-full h-full glass rounded-2xl flex items-center justify-center p-8 border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                          <div className="w-full h-full border border-primary/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                             {/* Magical glow effect */}
                             <motion.div 
                               className="absolute inset-0 bg-primary/10"
                               animate={{ opacity: [0, 0.5, 0] }}
                               transition={{ duration: 2, repeat: Infinity }}
                             />
                            <div className="flex flex-col items-center gap-2 relative z-10">
                              <Moon size={48} className="text-primary animate-pulse" />
                              <p className="text-[10px] uppercase tracking-widest text-primary/60 font-medium">Swipe to Draw</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="w-48 space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground font-semibold uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{drawnCards.length} / {selectedSpread.cardCount}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(drawnCards.length / selectedSpread.cardCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: The Spread Grid */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {selectedSpread.positions.map((pos, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative w-32 h-52 md:w-36 md:h-60 perspective-1000">
                      <AnimatePresence mode="wait">
                        {!drawnCards[i] ? (
                          <motion.div 
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full rounded-2xl border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center p-4 text-center group"
                          >
                             <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-primary/30 transition-colors mb-3" />
                             <p className="text-[10px] uppercase tracking-tighter text-muted-foreground/60 leading-tight">{pos}</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="card-reveal"
                            initial={{ scale: 0.5, opacity: 0, x: -200, rotate: -45, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
                            transition={{ type: "spring", stiffness: 80, damping: 15 }}
                            className="w-full h-full preserve-3d relative group/card"
                            drag="y"
                            dragConstraints={{ top: -150, bottom: 0 }}
                            dragElastic={0.1}
                            dragSnapToOrigin
                          >
                            {/* Magical Sparkle Burst on Reveal */}
                            <motion.div 
                              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-50"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }}
                              transition={{ duration: 1, delay: 0.6 }}
                            >
                               <div className="relative">
                                 {[...Array(6)].map((_, j) => (
                                   <motion.div
                                     key={j}
                                     className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
                                     animate={{ 
                                       x: Math.cos(j * 60 * Math.PI / 180) * 100,
                                       y: Math.sin(j * 60 * Math.PI / 180) * 100,
                                       scale: 0
                                     }}
                                     transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                                   />
                                 ))}
                               </div>
                            </motion.div>

                            <motion.div 
                              className="w-full h-full preserve-3d relative"
                              initial={{ rotateY: 0 }}
                              animate={{ rotateY: 180 }}
                              transition={{ 
                                duration: 1.2, 
                                delay: 0.4, 
                                ease: [0.34, 1.56, 0.64, 1] // Magical overshoot
                              }}
                            >
                              {/* Glowing Aura during flip */}
                              <motion.div 
                                className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl opacity-0"
                                animate={{ opacity: [0, 0.4, 0] }}
                                transition={{ duration: 1.2, delay: 0.4 }}
                              />

                              {/* Card Back */}
                              <div className="absolute inset-0 backface-hidden glass rounded-2xl flex items-center justify-center border-primary/20 bg-[#0d0d1a] shadow-2xl">
                                <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] mix-blend-overlay" />
                                <Moon size={24} className="text-primary/20" />
                              </div>
                              
                              {/* Card Front */}
                              <div 
                                className="absolute inset-0 backface-hidden rounded-2xl bg-cover bg-center border-2 border-primary/40 overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                                style={{ 
                                  transform: `rotateY(180deg) ${drawnCards[i].isReversed ? 'rotateZ(180deg)' : ''}`,
                                  backgroundImage: `url(${drawnCards[i].card.image || `https://picsum.photos/seed/${drawnCards[i].card.id}/300/500`})`
                                }}
                              >
                                <div className="absolute inset-0 bg-black/20" />
                                
                                {/* Overlay Meaning (Visible on Swipe - simulated by CSS for performance or Framer for magic) */}
                                <div className="absolute inset-x-0 bottom-0 p-3 bg-black/90 backdrop-blur-md border-t border-primary/20 transition-all transform translate-y-full group-hover/card:translate-y-0 duration-500">
                                   <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Meaning</p>
                                   <p className="text-[9px] text-foreground leading-tight line-clamp-3">
                                     {drawnCards[i].isReversed ? drawnCards[i].card.reversed : drawnCards[i].card.upright}
                                   </p>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-2 bg-black/90 backdrop-blur-md border-t border-primary/20 group-hover/card:opacity-0 transition-opacity">
                                  <p className="text-[10px] md:text-xs uppercase tracking-tighter text-primary font-bold truncate text-center leading-none py-1">
                                    {drawnCards[i].card.name}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                            
                            {/* Swipe Hint */}
                            <motion.div 
                              className="absolute -top-6 left-0 right-0 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                               <p className="text-[8px] uppercase tracking-widest text-primary/60 font-bold">Swipe Up</p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.div 
                      className="mt-4 text-center"
                      animate={{ opacity: drawnCards[i] ? 1 : 0.4 }}
                    >
                       <p className="text-[10px] uppercase tracking-widest text-accent font-bold">{pos}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {drawnCards.length === selectedSpread.cardCount && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }}
                className="pt-16 pb-20 w-full max-w-sm"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-primary via-accent to-primary rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <Button 
                    onClick={finalizeReading} 
                    className="relative w-full h-16 rounded-full text-lg font-serif bg-black hover:bg-zinc-900 border border-white/10 text-white shadow-2xl"
                  >
                    Consult the Oracle <BrainCircuit size={20} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 4: Interpreting Animation */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-arcana p-6 text-center"
            transition={stepTransition}
          >
            <div className="relative">
              <motion.div 
                className="w-32 h-32 rounded-full border-2 border-primary/20 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                 <div className="w-24 h-24 rounded-full border border-primary/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10" />
                 </div>
              </motion.div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles size={40} className="text-primary" />
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-serif mt-12 mb-4">Consulting the Arcana...</h2>
            <div className="space-y-2 max-w-xs mx-auto">
              {['Synthesizing your spirit...', 'Reading the cards...', 'Translating symbols...', 'Finalizing guidance...'].map((text, i) => (
                <motion.p 
                  key={text}
                  className="text-sm text-muted-foreground font-light italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 1.5 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
