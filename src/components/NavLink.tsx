import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type RouterClassName = NavLinkProps["className"];

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: RouterClassName;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={(args) => {
          const base = typeof className === "function" ? className(args) : className;
          return cn(base, args.isActive && activeClassName, args.isPending && pendingClassName);
        }}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
