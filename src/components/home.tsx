import { default as React, Component } from "react";

interface ComponentProps {}
interface ComponentState {}

export class Home extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div>
        <p>Welcome to the Composita Website</p>
      </div>
    )
  }
}
