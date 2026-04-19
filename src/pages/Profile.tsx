import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Bell, CreditCard, LogOut, ChevronRight, Moon, Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { signInWithGoogle, logout } from '@/lib/firebase';

export default function Profile() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen pt-24 px-6 flex items-center justify-center italic">Consulting the oracle...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen px-6 pt-24 pb-32 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-8 mx-auto text-primary">
          <Moon size={40} />
        </div>
        <h1 className="text-4xl font-serif mb-4">Start your Chronicle.</h1>
        <p className="text-muted-foreground font-light mb-12">Sign in to save your readings across devices and access premium insights.</p>
        <Button onClick={signInWithGoogle} className="h-16 px-10 rounded-full bg-primary text-white text-lg font-serif">
          <LogIn size={20} className="mr-2" /> Sign in with Google
        </Button>
      </div>
    );
  }

  const menuItems = [
    { icon: Bell, title: "Notifications", desc: "Daily reading reminders" },
    { icon: CreditCard, title: "Subscription", desc: "Manage your plan" },
    { icon: Shield, title: "Privacy & Data", desc: "Your chronicle settings" },
    { icon: Settings, title: "Preferences", desc: "Theme, language, and deck" },
  ];

  return (
    <div className="min-h-screen px-6 pt-24 pb-32 max-w-2xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="relative mb-6">
          <Avatar className="w-24 h-24 border-2 border-primary p-1 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <AvatarImage src={user.photoURL || "https://picsum.photos/seed/user123/200/200"} className="rounded-full" />
            <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background text-black shadow-lg">
            <Moon size={14} fill="currentColor" />
          </div>
        </div>
        <h1 className="text-3xl font-serif mb-1">{user.displayName}</h1>
        <p className="text-muted-foreground text-sm font-light mb-4">{user.email}</p>
        
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-2xl">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Daily Streak</p>
            <p className="text-lg font-serif text-primary">{profile?.streak || 0} Days</p>
          </div>
          <div className="glass px-4 py-2 rounded-2xl">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Status</p>
            <p className="text-lg font-serif text-primary">Sovereign</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {menuItems.map((item, i) => (
          <button key={i} className="w-full glass p-5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <item.icon size={20} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.desc}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      <Separator className="my-10 bg-white/5" />

      <Button onClick={logout} variant="ghost" className="w-full h-14 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-2">
        <LogOut size={18} /> Sign Out
      </Button>

      <p className="text-center mt-12 text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-30">Arcana v1.0.4</p>
    </div>
  );
}
