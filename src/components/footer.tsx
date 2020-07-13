import { default as React, Component } from "react";

interface ComponentProps {}
interface ComponentState {}

export class Footer extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div>
        <p>Copyright © 2020 Hansruedi Patzen, licensed under the 0BSD license.</p>
      </div>
    )
  }
}
