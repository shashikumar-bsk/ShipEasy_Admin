import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (callback) => {
  const observer = useRef<IntersectionObserver>();

  const lastOptionRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [callback]
  );

  return lastOptionRef;
};

export default useInfiniteScroll;
