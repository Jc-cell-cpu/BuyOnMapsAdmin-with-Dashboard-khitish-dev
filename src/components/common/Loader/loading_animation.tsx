"use client"

import DefaultLayout from "@/components/Layouts/DefaultLaout"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingAnimationf() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <DefaultLayout>
            <div className="h-screen w-full flex items-center justify-center backdrop-blur-sm">
                <div className="relative flex items-center justify-center">
                    {/* Outer rotating ring with gradient */}
                    <motion.div
                        className="absolute w-40 h-40 rounded-full border-4 border-transparent backdrop-blur-sm"
                        style={{
                            background:
                                "linear-gradient(45deg, transparent 40%, rgba(2, 132, 199, 0.7) 100%)",
                            backgroundClip: "padding-box",
                        }}
                        animate={{
                            rotate: [0, 180, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 4,
                            ease: "easeInOut",
                            repeat: Infinity,
                            times: [0, 0.5, 1],
                        }}
                    />

                    {/* Inner spinning gradient ring */}
                    <motion.div
                        className="absolute w-32 h-32 rounded-full border-4 border-transparent backdrop-blur-sm"
                        style={{
                            background:
                                "linear-gradient(-45deg, transparent 40%, rgba(8, 145, 178, 0.7) 100%)",
                            backgroundClip: "padding-box",
                        }}
                        animate={{
                            rotate: [360, 180, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 4,
                            ease: "easeInOut",
                            repeat: Infinity,
                            times: [0, 0.5, 1],
                        }}
                    />

                    {/* Orbiting particles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green-950 to-cyan-950"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3],
                                filter: [
                                    "blur(0px)",
                                    "blur(2px)",
                                    "blur(0px)",
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                            style={{
                                left: "50%",
                                top: "50%",
                                transform: `rotate(${i * 45}deg) translateY(-60px)`,
                            }}
                        />
                    ))}

                    {/* Center pulsing circle */}
                    <motion.div
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-lime-700 to-emerald-600 shadow-lg shadow-sky-700/50"
                        animate={{
                            scale: [0.8, 1.1, 0.8],
                            opacity: [0.5, 1, 0.5],
                            filter: [
                                "blur(0px)",
                                "blur(4px)",
                                "blur(0px)",
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Loading text */}
                    <motion.div
                        className="absolute ml-3 mt-36 text-teal-950 text-2xl font-semibold tracking-[0.3em]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            y: [0, -5, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        LOADING..
                    </motion.div>
                </div>
            </div>
        </DefaultLayout>
    )
}