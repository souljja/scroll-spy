import React from "react";
import ReactDOM from "react-dom";
import Subject, { Subscription } from "rxjs";
import { LoadDataService } from "./LoadDataService";
import { scrollIntoView, isInView } from "./ScrollService";

export function withLoading(Component, props) {
  class LoadingHock extends React.Component {
    private loadDataService = new LoadDataService();
    private timerId: number;
    state = {
      loading: true
    };

    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
      document.documentElement.style.overflow = "hidden";
      this.loadDataService.getStream().subscribe(data => {
        console.log("here", this.state.loading, data);
        this.setState({ loading: false }, () => {
          console.log(this.state);
          document.documentElement.style.overflow = "auto";
          scrollIntoView("card-5000");
        });
      });
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
      this.loadDataService.unsubscribe();
    }

    private handleScroll = () => {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }

      this.timerId = setTimeout(() => {
        console.log(isInView("card-5000"), isInView("card-10000"));
      }, 100);
    };

    public render() {
      const { loading } = this.state;
      return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {loading && (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                background: "white",
                overflow: "hidden",
                top: 0,
                left: 0
              }}
            >
              Loading
            </div>
          )}
          <Component {...props} />
        </div>
      );
    }
  }

  return LoadingHock;
}
