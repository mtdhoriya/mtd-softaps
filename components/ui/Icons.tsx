import React from 'react';
import { 
  Zap, Droplet, Hammer, Sparkles, Thermometer, Paintbrush, Scissors, Wrench, 
  MapPin, Star, Phone, MessageCircle, Home, User, Briefcase, Search,
  ChevronRight, ShieldCheck, Clock, CheckCircle, Menu, X, ArrowLeft, Send
} from 'lucide-react';

export const IconMap: Record<string, React.FC<any>> = {
  Zap, Droplet, Hammer, Sparkles, Thermometer, Paintbrush, Scissors, Wrench,
  MapPin, Star, Phone, MessageCircle, Home, User, Briefcase, Search,
  ChevronRight, ShieldCheck, Clock, CheckCircle, Menu, X, ArrowLeft, Send
};

export const GetIcon = ({ name, className, size = 20 }: { name: string, className?: string, size?: number }) => {
  const IconComponent = IconMap[name] || Star;
  return <IconComponent className={className} size={size} />;
};