import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './HelloWorld.css?module'

interface Props {
  msg: string
}

@Component
export default class HelloWorld extends VueComponent<Props> {

  @Prop()
  private msg!: string;

  mounted() {
    console.log(this.getDate());
  }

  getDate() {
    const date = new Date()
    console.log(date.getMonth() + 1);
    return (new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
  }

  render() {
    return (
      <div class={styles.hello}>
        <h1>{ this.msg }</h1>
      </div>
    )
  }
}
