import { motion } from 'framer-motion';

// Animated loading spinner
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <motion.div
      className="w-8 h-8 border-3 border-t-transparent border-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Animated dots loading
export const LoadingDots = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((dot) => (
      <motion.div
        key={dot}
        className="w-2 h-2 bg-white/60 rounded-full"
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: dot * 0.2,
        }}
      />
    ))}
  </div>
);

// Animated progress indicator
export const LoadingProgress = ({ progress = 0 }) => (
  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-blue-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </div>
);

// Animated loading pulse
export const LoadingPulse = () => (
  <motion.div
    className="w-full h-12 bg-white/10 rounded-lg"
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [0.98, 1, 0.98],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated loading skeleton
export const LoadingSkeleton = () => (
  <div className="space-y-4">
    <motion.div
      className="h-4 bg-white/10 rounded w-3/4"
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="h-4 bg-white/10 rounded w-1/2"
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    />
    <motion.div
      className="h-4 bg-white/10 rounded w-5/6"
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
    />
  </div>
);