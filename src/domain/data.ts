export type MonthData = {
  index: number;
  date: number;
  data: DateData[];
};

export type DateData = {
  index: number;
  todo: string;
  completed: boolean;
};
