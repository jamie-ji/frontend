import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const RippleButton = ({
  children,
  onClick,
  color,
  size,
  className,
  disabled,
  outline,
  group,
  gradient,
  tag,
  to,
  type,
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 }),
    [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <Button
      disabled={disabled}
      size={size}
      tag={tag}
      to={to}
      type={type}
      className={classNames(
        `btn btn-${color ? color : "primary"} ripple-button ${className}`,
        {
          btn_outline: outline,
          gradient: gradient,
        }
      )}
      onClick={(e) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      {children}
    </Button>
  );
};

export default RippleButton;
