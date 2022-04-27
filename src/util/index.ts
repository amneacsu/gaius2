export const throttle = (fn: () => unknown, duration: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: unknown[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(args), duration);
  };
};
