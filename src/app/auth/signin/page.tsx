'use client'

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Signin from "@/components/Auth/Signin"

export default function SignIn() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="grid h-full w-full overflow-hidden border-none bg-white/70 shadow-none backdrop-blur-sm dark:bg-gray-900/70 lg:grid-cols-2">
        {/* Sign In Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center p-6 sm:p-8 lg:p-12"
        >
          <div className="w-full max-w-[480px]">
            <Signin />
          </div>
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary"></div>

          <div className="relative flex h-full flex-col justify-center p-12 text-white">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-medium">Sign in to your account</h2>
                <h1 className="mt-2 text-5xl font-bold">Welcome Back!</h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="max-w-[440px] text-xl leading-relaxed text-white/90"
              >
                Please sign in to your account by completing the necessary fields below
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="relative mt-12"
              >
                {/* Decorative Elements */}
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/10"></div>

                <Image
                  src="/images/grids/grid-02.svg"
                  alt="Decorative Pattern"
                  width={500}
                  height={400}
                  className="relative z-10 mx-auto transform transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            </div>

            {/* Bottom Pattern */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg
                viewBox="0 0 1000 100"
                preserveAspectRatio="none"
                className="h-24 w-full fill-white/5"
              >
                <path d="M0,0 C200,100 800,100 1000,0 L1000,100 L0,100 Z"></path>
              </svg>
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  )
}