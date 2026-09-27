"use client";
import { CaretDownIcon } from "@phosphor-icons/react";
import { AnimatePresence, easeOut, motion } from "motion/react";
import { useState } from "react";
import { cn } from "../utility/cn";

type AccordionWrapperType = {
  accordionList: { title: string; subtitle: string }[];
};

export default function AccordionWrapper({
  accordionList,
}: AccordionWrapperType) {
  const [open, setOpen] = useState(-1);

  return (
    <div>
      {accordionList.map((value, index) => {
        const isOpen = index == open;
        const isLastElement = index === accordionList.length - 1;
        return (
          <motion.div
            key={index}
            layout
            animate={{ height: "auto" }}
            transition={{ duration: 2 }}
            onClick={() => {
              setOpen(index);
              if (isOpen) setOpen(-1);
            }}
            className={cn(
              "w-lg border-neutral-800 border-t  border-x  py-4 px-6",
              isLastElement ? "border-b" : "border-b-0 ",
            )}
          >
            <div className="w-full select-none flex flex-row justify-between items-center text-gray-300">
              <p className="text-xl">{value.title}</p>
              <motion.div
                animate={{ rotateZ: isOpen ? 180 : 0 }}
                transition={{ duration: 0.13, ease: easeOut }}
                className="text-gray-300"
              >
                <CaretDownIcon weight="bold" size={18} />
              </motion.div>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.13, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="pt-4">
                    
                  <p className="text-md text-gray-400 select-none font-light tracking-wide ">
                    {value.subtitle}
                  </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
