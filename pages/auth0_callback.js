import React, { useEffect } from "react";
import { useAuth } from "react-use-auth";
import { motion } from "framer-motion";

const AUTHCallback = () => {
  const { handleAuthentication } = useAuth();
  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <div className="container mx-auto">
      <motion.div
        className="container mx-auto border bg-color-gray-500 border-full h-12 w-12"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          loop: Infinity,
          repeatDelay: 1,
        }}
      />
    </div>
  );
};

export default AUTHCallback;
