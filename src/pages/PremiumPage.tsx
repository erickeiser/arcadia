import React from 'react';
import { motion } from 'motion/react';
import { Check, Star, Zap, Crown, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PremiumPage() {
  const benefits = [
    { icon: Crown, title: "Deep-Dive AI Readings", desc: "Longer, more complex interpretations with advanced symbolic synthesis." },
    { icon: Zap, title: "Premium Spreads", desc: "Access the Celtic Cross, Shadow Work, and Relationship compatibility layouts." },
    { icon: Sparkles, title: "Daily Guidance", desc: "Personalized morning cards sent directly to your path." },
    { icon: Shield, title: "Unlimited Archive", desc: "Save Every reading you've ever drawn, forever." },
  ];

  return (
    <div className="min-h-screen px-6 pt-24 pb-32 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6"
        >
          <Star size={14} className="fill-accent" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Arcana Sovereign</span>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Master your path.</h1>
        <p className="text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
          Upgrade to Arcana Premium for deeper insights, exclusive spreads, and a complete chronicle of your spiritual growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        {/* Benefits List */}
        <div className="space-y-8">
          {benefits.map((b, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl glass border-primary/20 flex items-center justify-center shrink-0 text-primary">
                <b.icon size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-primary border-2 relative overflow-hidden shadow-2xl shadow-primary/10">
            <div className="absolute top-0 right-0 p-4">
              <Badge className="bg-primary text-black border-none rounded-full h-6 px-3 font-bold uppercase tracking-tighter">Most Popular</Badge>
            </div>
            <CardContent className="p-10">
              <h3 className="text-2xl font-serif text-primary mb-2">Sovereign Tier</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-serif">$12.99</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              
              <div className="space-y-4 mb-10">
                {['All Premium Spreads', 'Advanced AI Synthesis', 'Personalized Daily Pulls', 'Early Access to New Features'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                    <Check size={16} className="text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-xl shadow-accent/20">
                Unlock Everything
              </Button>
              <p className="text-[10px] text-center mt-4 text-muted-foreground uppercase tracking-widest font-semibold">Cancel anytime • 7-day free trial</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Comparison Toggle or FAQ could go here */}
      <div className="text-center">
         <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-4 opacity-50 italic">Guided by the stars, built for the soul.</p>
      </div>
    </div>
  );
}
