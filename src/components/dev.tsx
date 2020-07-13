import { default as React, Component } from "react";

interface ComponentProps {}
interface ComponentState {}

export class DevInfo extends Component<ComponentProps, ComponentState> {
  render() {
    return (
      <div>
        <p>Developer Information</p>
      </div>
    )
  }
}
