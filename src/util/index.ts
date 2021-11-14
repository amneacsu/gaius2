export const throttle = (fn: any, duration: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(args), duration);
  };
};
