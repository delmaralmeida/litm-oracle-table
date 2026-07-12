import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";

interface IRouteConfig {
  path: string;
  element: ReactElement;
}

interface IRenderWithRouterOptions {
  initialEntries?: string[];
  routes: IRouteConfig[];
}

export default function renderWithRouter({
  initialEntries = ["/"],
  routes,
}: IRenderWithRouterOptions) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </MemoryRouter>,
  );
}
