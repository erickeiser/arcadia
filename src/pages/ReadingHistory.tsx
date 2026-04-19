import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { History, Calendar, ChevronRight, Moon, Sparkles, Loader2 } from 'lucide-react';
import { SPREADS } from '../data/spreads';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function ReadingHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, 'readings'), 
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setHistory(docs);
        } catch (err) {
          console.error("Error fetching history:", err);
        } finally {
          setLoading(false);
        }
      } else {
        const data = JSON.parse(localStorage.getItem('arcana_history') || '[]');
        setHistory(data);
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-8 text-muted-foreground/30">
          <History size={40} />
        </div>
        <h1 className="text-3xl font-serif mb-4">Your book is empty.</h1>
        <p className="text-muted-foreground max-w-xs mx-auto mb-10 font-light">
          Your path is yet to be recorded. Start your first reading to begin your chronicle.
        </p>
        <Link to="/draw">
          <button className="h-14 px-10 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
            Start First Reading
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-24 pb-32 max-w-2xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-serif mb-2">Chronicle.</h1>
        <p className="text-muted-foreground font-light italic">Reflecting on your past guidance.</p>
      </div>

      <div className="space-y-4">
        {history.map((reading: any, idx: number) => {
          const spread = SPREADS.find(s => s.id === reading.spreadId);
          return (
            <motion.div
              key={reading.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/reading/${reading.id}`}>
                <Card className="glass hover:border-primary/50 hover:bg-white/10 transition-all duration-300 border-white/5 overflow-hidden group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[9px] uppercase tracking-widest bg-primary/5 text-primary border-primary/20">
                          {spread?.name || 'Reading'}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-widest">
                          <Calendar size={10} />
                          {new Date(reading.createdAt?.seconds ? reading.createdAt.seconds * 1000 : reading.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif text-foreground/90 group-hover:text-primary transition-colors">
                        {reading.question || "Universal Check-in"}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light line-clamp-1 italic">
                        {reading.aiSummary}
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors translate-x-0 group-hover:translate-x-1 duration-300" />
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold mb-6">Continue your journey</p>
        <Link to="/draw" className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-xl shadow-primary/20 hover:scale-110 transition-transform">
          <Sparkles size={24} />
        </Link>
      </div>
    </div>
  );
}
