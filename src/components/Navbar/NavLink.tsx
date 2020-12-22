import React, { ReactElement } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

interface NavLinkProps {
  children: ReactElement | ReactElement[] | string;
  to: string;
  exact: boolean;
}

export default function NavLink (props: NavLinkProps) {
  const match = useRouteMatch({
    path: props.to,
    exact: props.exact
  });

  return (
    <Link to={props.to} className={match ? 'selected' : ''}>
      { props.children}
    </Link >
  );
}
