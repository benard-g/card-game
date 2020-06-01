export type PropsWithStyle<TUseStyles extends (...arg: any) => any> = {
  classes?: Partial<ReturnType<TUseStyles>>;
};
