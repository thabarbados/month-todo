import { Component } from "vue-property-decorator";
import { useStore } from "vuex-simple";

import { VueComponent } from "../../shims-vue";
import { RootModule } from "../../store/store";
import { MonthData } from "../../domain/data";

import styles from "./month.styles.css?module";

const SUNDAY_LIST_INDEX = 6;
const DAYS_AT_WEEK = 7;

@Component
export default class Month extends VueComponent {
  private store: RootModule = useStore(this.$store);

  private currentYear: number = new Date().getFullYear();
  private currentMonth: number = new Date().getMonth();
  private currentDate: number = new Date().getDate();

  private montsList: Array<string> = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Авгус",
    "Сентябрь",
    "Оетябрь",
    "Ноябрь",
    "Декабрь",
  ];
  private daysList: Array<string> = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  get monthCalendar(): MonthData[] {
    return this.store.commonModule.monthData || [];
  }

  get selectedDay(): number {
    return this.store.commonModule.selectedDate || 0;
  }

  beforeMount() {
    this.calculateDateData();
  }

  private calculateDateData() {
    const firstDayAtMonthIndex = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    // получаем индекс первого дня месяца в массиве дней
    const firstDayAtMonth =
      firstDayAtMonthIndex > 0 ? firstDayAtMonthIndex - 1 : SUNDAY_LIST_INDEX;

    const currentMonthDaysCount = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    const weeksAtMonth = Math.ceil(
      (firstDayAtMonth + currentMonthDaysCount) / DAYS_AT_WEEK
    );

    this.calculateMonthData(
      firstDayAtMonth,
      currentMonthDaysCount,
      weeksAtMonth
    );
  }

  private calculateMonthData(
    firstDay: number,
    daysCount: number,
    weeksCount: number
  ) {
    let monthData = [];
    let dayData = {};
    let monthDate = 1;
    let indexCurrentDay = 0;

    for (let i = 0; i < weeksCount * DAYS_AT_WEEK; i++) {
      if (this.currentDate === monthDate) {
        indexCurrentDay = i;
      }

      if (i < firstDay || i >= daysCount + firstDay) {
        dayData = {
          index: i,
          date: 0,
          data: [],
        };
        monthData.push(dayData);
      } else {
        dayData = {
          index: i,
          date: monthDate,
          data: [],
        };
        monthData.push(dayData);
        monthDate++;
      }
    }
    this.store.commonModule.setModuleStateData({
      date: indexCurrentDay,
      goals: [],
      data: monthData,
    });
  }

  private changeSelectedDay(index: number, date: number) {
    if (date > 0) {
      this.store.commonModule.changeSelectedDate(index);
    }
  }

  render() {
    return (
      <div class={styles.monthContainer}>
        <span class={styles.header}>{`${this.montsList[this.currentMonth]} ${
          this.currentYear
        }`}</span>
        <div class={styles.dates}>
          {this.daysList.map((name, index) => (
            <div class={styles.dayName}>{name}</div>
          ))}
          {this.monthCalendar.map((day: MonthData) => (
            <div
              class={[
                day.date > 0 ? styles.day : "",
                day.index === this.selectedDay ? styles.selected : "",
                day.data.length > 0 ? styles.dayWithData : "",
              ]}
              onClick={() => this.changeSelectedDay(day.index, day.date)}
            >
              {day.date > 0 ? day.date : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
