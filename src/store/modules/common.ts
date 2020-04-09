import { State, Mutation, Getter } from "vuex-simple";
import { MonthData, DateData } from "../../domain/data";

export class CommonModule {
  @State()
  public selectedDate: number = 0;

  @State()
  public dateGoals: DateData[] = [];

  @State()
  public monthData: MonthData[] = [];

  @Getter()
  public get getSelectedDayData(): DateData[] {
    return this.monthData[this.selectedDate].data;
  }

  @Mutation()
  public setModuleStateData(params: any) {
    const { date, goals, data } = params;

    this.selectedDate = date;
    this.dateGoals = goals;
    this.monthData = data;
  }

  @Mutation()
  public changeSelectedDate(date: number) {
    this.selectedDate = date;
  }

  @Mutation()
  public setSelectedDayData(todo: string) {
    const data = {
      index: this.monthData[this.selectedDate].data.length,
      todo,
      completed: false,
    };
    this.monthData[this.selectedDate].data.push(data);
  }

  @Mutation()
  public changeGoalComplete(params: any) {
    const { index, completed } = params;
    this.monthData[this.selectedDate].data[index].completed = completed;
  }
}
