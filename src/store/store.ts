import { Module } from "vuex-simple";
import { CommonModule } from "./modules/common";

export class RootModule {
  @Module()
  public commonModule = new CommonModule();
}
