import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft, Share2, CornerRightDown, BrainCircuit, Moon } from 'lucide-react';
import { TAROT_DECK } from '../data/cards';
import { SPREADS } from '../data/spreads';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ReadingDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reading, setReading] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReading = async () => {
      if (!id) return;

      // Try local storage first
      const history = JSON.parse(localStorage.getItem('arcana_history') || '[]');
      const local = history.find((x: any) => x.id === id);
      
      if (local) {
        setReading(local);
        setLoading(false);
      } else {
        // Fetch from Firestore
        try {
          const docRef = doc(db, 'readings', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setReading({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (err) {
          console.error("Error fetching reading:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchReading();
  }, [id]);

  if (loading || !reading) {
    return (
      <div className="p-6 space-y-8 animate-pulse pt-24">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-64 w-full rounded-3xl" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  const currentSpread = SPREADS.find(s => s.id === reading.spreadId);
  const drawnCards = reading.cards.map((c: any) => ({
    ...c,
    data: TAROT_DECK.find(d => d.id === c.cardId)
  }));

  return (
    <div className="min-h-screen px-6 pt-12 pb-32 max-w-2xl mx-auto overflow-x-hidden">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8 sticky top-0 z-10 py-4 bg-background/80 backdrop-blur-md -mx-6 px-6">
        <Button variant="ghost" className="rounded-full h-10 w-10 p-0" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
            <Share2 size={18} />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary uppercase tracking-widest text-[10px]">{currentSpread?.name}</Badge>
          <h1 className="text-3xl font-serif mb-4 leading-relaxed">
            {reading.question || "Universal Check-in"}
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
            {new Date(reading.createdAt?.seconds ? reading.createdAt.seconds * 1000 : reading.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
          </p>
        </div>

        {/* AI Summary Card */}
        <Card className="glass rounded-[2rem] border-primary/20 mb-12 shadow-2xl shadow-primary/10">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <BrainCircuit size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Arcana Synthesis</span>
            </div>
            <p className="text-xl font-serif leading-relaxed mb-6 italic text-foreground/90">
              "{reading.aiSummary}"
            </p>
            <div className="h-px w-full bg-white/5 mb-6" />
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-muted-foreground font-light leading-relaxed">
                {reading.aiGuidance}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <h2 className="text-xl font-serif mb-8 flex items-center gap-2">
          <Sparkles size={20} className="text-accent" />
          The Drawn Path
        </h2>

        <div className="space-y-12">
          {drawnCards.map((card: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Card Visualization */}
                <div className="flex flex-col items-center">
                  <div className={`relative w-48 h-72 rounded-2xl border-2 border-primary/40 bg-linear-to-br from-[#0d0d1a] to-[#1a1a2e] overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)] ${card.isReversed ? 'rotate-180' : ''}`}>
                    <img 
                      src={card.data?.image} 
                      className="w-full h-full object-cover grayscale brightness-75 transition-all hover:grayscale-0"
                      alt={card.data?.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                        <p className={`text-white font-serif text-sm ${card.isReversed ? 'rotate-180 text-center' : ''}`}>{card.data?.name}</p>
                    </div>
                  </div>
                  <p className="text-[10px] mt-4 uppercase tracking-[0.2em] font-bold text-muted-foreground">
                    {card.isReversed ? 'Reversed' : 'Upright'}
                  </p>
                </div>

                {/* Card Interpretation */}
                <div className="space-y-4 pt-4 md:pt-0">
                  <div className="flex items-center gap-2 text-accent">
                    <CornerRightDown size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Position: {card.position}</span>
                  </div>
                  <h3 className="text-2xl font-serif">{card.data?.name}</h3>
                  <div className="flex flex-wrap gap-1.5 pb-2">
                    {card.data?.keywords.map((k: string) => (
                      <span key={k} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground uppercase font-semibold">
                        {k}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed font-light">
                    {card.isReversed ? card.data?.reversed : card.data?.upright}
                  </p>
                  
                  <div className="pt-4 p-4 rounded-2xl glass border-primary/10">
                    <p className="text-xs font-bold text-primary italic mb-2">Insight in Context</p>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                      In the position of "{card.positionMeaning}", this card suggests that your energy is currently centered on themes of {card.data?.keywords[0].toLowerCase()} and {card.data?.keywords[1].toLowerCase()}...
                    </p>
                  </div>
                </div>
              </div>
              {idx < drawnCards.length - 1 && <div className="h-px w-1/3 bg-white/5 mx-auto mt-12" />}
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 text-center space-y-8 pb-12">
           <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
           <p className="text-muted-foreground text-sm font-light italic">Reflect on these messages today.</p>
           <Button asChild variant="outline" className="rounded-full h-12 glass border-white/10">
              <Link to="/draw" className="flex items-center gap-2">
                New Reading <Sparkles size={16} />
              </Link>
           </Button>
        </div>
      </motion.div>
    </div>
  );
}
