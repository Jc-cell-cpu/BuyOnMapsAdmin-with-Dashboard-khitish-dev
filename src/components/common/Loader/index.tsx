"use client"

import DefaultLayout from "@/components/Layouts/DefaultLaout"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DefaultLayout>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Outer ring with morphing shape */}
          <motion.div
            className="absolute w-40 h-40 border-4 border-indigo-900"
            animate={{
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 0.8, 1.1, 1],
              borderRadius: ["40% 60% 60% 40%", "60% 40% 40% 60%", "40% 60% 60% 40%"],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          />

          {/* Middle spinning ring */}
          <motion.div
            className="absolute w-32 h-32 border-4 border-violet-800"
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1.3, 0.9, 1],
              borderRadius: ["30% 70% 70% 30%", "50% 50% 50% 50%", "30% 70% 70% 30%"],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          />

          {/* Orbiting particles with trails */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
              }}
            >
              <motion.div
                className="w-4 h-4 bg-fuchsia-500"
                animate={{
                  scale: [1, 0.5, 1],
                  opacity: [0.8, 0.3, 0.8],
                  borderRadius: ["50%", "0%", "50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  transform: `translateX(${60}px)`,
                }}
              />
              {/* Particle trail */}
              <motion.div
                className="absolute w-2 h-2 bg-fuchsia-500/30"
                style={{
                  transform: `translateX(${45}px)`,
                }}
                animate={{
                  opacity: [0.5, 0.1, 0.5],
                  scale: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}

          {/* Center element with geometric patterns */}
          <motion.div
            className="relative w-24 h-24 bg-indigo-600"
            animate={{
              rotate: [0, 45, 0],
              borderRadius: ["20%", "50%", "20%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Inner geometric pattern */}
            <motion.div
              className="absolute inset-2 border-2 border-violet-400"
              animate={{
                rotate: [45, 0, 45],
                borderRadius: ["50%", "20%", "50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Enhanced loading text with letter animation */}
          <div className="absolute mt-40">
            {"LOADING".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-lg font-bold text-indigo-950 tracking-widest"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

