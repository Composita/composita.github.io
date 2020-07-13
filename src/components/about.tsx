import { default as React, Component } from "react";

interface ComponentProps {}
interface ComponentState {}

export class About extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div>
        <p>About</p>
      </div>
    )
  }
}
