import React from "react";
import { LoadDataService } from "./LoadDataService";
interface CardProps {
  delay: number;
}
export class CardComponent extends React.Component<CardProps> {
  private loadDataService = new LoadDataService();
  componentDidMount() {
    this.loadDataService.loadStarted();
    window.setTimeout(() => {
      this.loadDataService.loadFinished({ value: this.props.delay });
    }, this.props.delay);
  }
  public render() {
    return (
      <div
        id={`card-${this.props.delay}`}
        style={{
          width: "200px",
          height: "900px",
          color: "yellow",
          background: "blue",
          margin: "50px"
        }}
      >
        Some text
      </div>
    );
  }
}
