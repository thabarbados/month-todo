import { Component, Vue } from "vue-property-decorator";
import Month from "./components/month/month.component";
import Day from "./components/day/day.component";

import "./App.css";

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <Month />
        <Day />
      </div>
    );
  }
}
