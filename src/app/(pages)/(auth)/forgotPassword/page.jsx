'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ForgotPasswordForm } from '@/components/form/ForgotPassword';
import { WavyBackground } from '@/components/ui/wavy-background';

const ForgotPassword = () => {
    return (
        <WavyBackground>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center h-full"
            >
                <ForgotPasswordForm />
            </motion.div>
        </WavyBackground>
    )
}

export default ForgotPassword