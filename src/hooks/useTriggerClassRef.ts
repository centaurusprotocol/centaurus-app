import { useEffect, useRef } from 'react';

export default function useTriggerClassRef(
  className: string,
  additionalTriggers?: [string, React.RefObject<HTMLDivElement>][],
) {
  const element = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animation
          if (element.current) {
            // @ts-ignore
            element.current.classList.add(className);
            if (additionalTriggers) {
              for (const item of additionalTriggers) {
                if (item[1].current) {
                  item[1].current.classList.add(item[0]);
                }
              }
            }
          }
        }
      });
    });
    if (element.current) {
      observer.observe(element.current);
    }
    return () => observer.disconnect();
  }, [className, additionalTriggers]);
  return element;
}
