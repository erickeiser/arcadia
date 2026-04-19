import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ShieldCheck, Zap, ArrowRight, Quote, Moon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center overflow-hidden">
        {/* Animated Background Element */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 animate-pulse">
            <Sparkles size={14} className="text-accent" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent/80">AI-Powered Intuition</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-[0.1em] mb-6 leading-[0.9] uppercase text-primary">
            Arcana<span className="text-white">.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="max-w-lg mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10">
            Clarity, symbolism, and guidance — one card at a time. Receive beautifully personalized tarot guidance powered by timeless archetypes and modern AI.
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button asChild size="lg" className="h-14 px-10 rounded-full text-lg group bg-primary hover:bg-primary/90 text-black">
              <Link to="/draw" className="flex items-center gap-2">
                Start Your Reading <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        {/* Floating Cards Preview */}
        <div className="mt-20 flex gap-4 -rotate-1 skew-x-1 scale-90 md:scale-100 opacity-40 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-24 h-40 md:w-32 md:h-52 bg-[#0d0d1a] border-2 border-primary/30 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.1)]"
              initial={{ y: 50 * i, rotate: -10 + i * 5 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
            >
              <img src={`https://picsum.photos/seed/tarot${i}/200/300`} className="w-full h-full object-cover grayscale brightness-50 contrast-125" alt="Tarot Card" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-black/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif mb-16 text-center">Spiritual wisdom, modern intelligence.</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Instant Insights", text: "Draw cards and receive detailed interpretations in seconds." },
              { icon: ShieldCheck, title: "True Guidance", text: "No deterministic predictions, only deep reflection and archetypal wisdom." },
              { icon: Star, title: "Personalized AI", text: "Advanced AI that synthesizes your question with the cards pulled." }
            ].map((feature, i) => (
              <div key={i}>
                <FadeIn delay={0.1 * i}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 text-primary">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{feature.text}</p>
                </div>
              </FadeIn>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Spreads Preview */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <FadeIn>
              <div className="text-left">
                <p className="text-accent uppercase tracking-widest text-xs font-bold mb-4">Choose Your Path</p>
                <h2 className="text-4xl md:text-6xl font-serif">Curated Spreads.</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link to="/draw" className="text-primary hover:underline flex items-center gap-2 font-medium">
                See all spreads <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Daily Pull", cards: 1, desc: "A single card for quick daily clarity." },
              { name: "The Past-Present-Future", cards: 3, desc: "Understand the flow of your journey." },
              { name: "Celtic Cross", cards: 10, desc: "The ultimate 10-card deep dive into your soul." },
            ].map((spread, i) => (
              <div key={i}>
                <FadeIn delay={0.1 * i}>
                <Card className="glass group cursor-pointer hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                        <Moon size={24} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif mb-2">{spread.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{spread.cards} Cards • {spread.desc}</p>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40 w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 py-24 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <Quote size={48} className="text-primary/20 mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-serif italic mb-8 leading-relaxed">
              "Arcana transformed my morning routine. The insights I receive every day feel incredibly personal and hauntingly accurate."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800" />
              <div className="text-left">
                <p className="font-bold">Elena R.</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Digital Architect</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-serif mb-2">Arcana<span className="text-primary">.</span></div>
            <p className="text-xs text-muted-foreground">© 2026 Arcana Spiritual Intelligence. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Terms</Link>
            <Link to="/" className="hover:text-foreground">Privacy</Link>
            <Link to="/profile" className="hover:text-foreground">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
