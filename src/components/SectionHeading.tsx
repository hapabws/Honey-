import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ title, subtitle, alignment = "center", light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 flex flex-col ${alignment === "center" ? "items-center text-center" : "items-start text-left"}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-display ${light ? "text-white" : "text-foreground"}`}
      >
        {title}
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-4 mt-4"
      >
        <div className={`h-[1px] w-12 ${light ? "bg-white/50" : "bg-secondary/50"}`}></div>
        <div className={`w-2 h-2 rotate-45 ${light ? "bg-white" : "bg-secondary"}`}></div>
        <div className={`h-[1px] w-12 ${light ? "bg-white/50" : "bg-secondary/50"}`}></div>
      </motion.div>

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mt-4 max-w-2xl text-lg ${light ? "text-white/80" : "text-muted-foreground"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
