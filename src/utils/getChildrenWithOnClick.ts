import React from "react";

const getChildrenWithOnClick = (children: React.ReactNode) => {
  const childrenWithOnClick = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) =>
          e.stopPropagation(),
      });
    }
    return child;
  });

  return childrenWithOnClick;
};

export default getChildrenWithOnClick;
