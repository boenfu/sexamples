import { createContext, useContext, useEffect, useState, useRef } from "react";

const StoreContext = createContext(null);

const Provider = () => (
  <StoreContext.Provider value={this.props.store}>
    {this.props.children}
  </StoreContext.Provider>
);

export function connect(mapStateToProps, mapDispatchToProps) {
  return function (Component) {
    const ConnectComponent = (props) => {
      const store = useContext(StoreContext);

      const updaterRef = useRef();

      updaterRef.current = () => {
        let stateToProps = mapStateToProps(store.getState());
        let dispatchToProps = mapDispatchToProps(store.dispatch);

        return {
          ...props,
          ...stateToProps,
          ...dispatchToProps,
        };
      };

      const [propsState, setPropsState] = useState(updaterRef.current);

      useEffect(
        () => store.subscribe(() => setPropsState(updaterRef.current())),
        []
      );

      return <Component {...propsState} />;
    };

    return ConnectComponent;
  };
}
