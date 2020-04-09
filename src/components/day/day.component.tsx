import { Component } from "vue-property-decorator";
import { useStore } from "vuex-simple";

import { VueComponent } from "../../shims-vue";
import { RootModule } from "../../store/store";
import { DateData } from '../../domain/data';

import styles from "./day.styles.css?module";

@Component
export default class Day extends VueComponent {
  private store: RootModule = useStore(this.$store);

  private goalText: string = "";

  get dayData(): DateData[] {
    return this.store.commonModule.getSelectedDayData;
  }

  get selectedDay(): number {
    return this.store.commonModule.selectedDate || 0;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.store.commonModule.setSelectedDayData(this.goalText);
      this.goalText = "";
    }
  }

  changeGoalComplete(index: number, completed: boolean) {
    this.store.commonModule.changeGoalComplete({ index, completed });
  }

  render() {
    return (
      <div class={styles.dayContainer}>
        <span class={styles.header}>События</span>
        {this.dayData.map((item: any, index: number) => (
          <div class={styles.goals}>
            <input
              class={styles.checkbox}
              type="checkbox"
              checked={item.completed}
              onChange={() => {
                this.changeGoalComplete(index, !item.completed);
              }}
            />
            <span
              class={[
                styles.goalName,
                item.completed ? styles.completedGoal : "",
              ]}
            >
              {item.todo}
            </span>
          </div>
        ))}
        <input
          class={styles.input}
          type="text"
          placeholder="Текст"
          value={this.goalText}
          onInput={(event: { target: HTMLInputElement }) => {
            this.goalText = event.target.value;
          }}
          onKeydown={(event: KeyboardEvent) => this.onKeydown(event)}
        />
      </div>
    );
  }
}
