import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpecialOfferModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SpecialOfferModal({ isVisible, onClose }: SpecialOfferModalProps) {

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-[32px] shadow-2xl max-w-xl w-full p-12 md:p-14"
          >
        {/* Close Button */}
        <div
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm cursor-pointer select-none"
          aria-label="Close modal"
          role="button"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </div>

        {/* Briefcase Emoji */}
        <div className="flex justify-center mb-6">
          <span className="text-5xl">💼</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-black tracking-tight mb-8">
          WAIT! BLACK FRIDAY SPECIAL OFFER!
        </h2>

        {/* Offer Details */}
        <div className="text-center mb-8">
          <p className="text-black text-base md:text-lg">
            Get flat $20 discount on all plans
          </p>
        </div>

        {/* Social Proof */}
        <p className="text-gray-400 text-sm text-center leading-relaxed max-w-sm mx-auto">
          90% of our users land interviews within the first week
        </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}



