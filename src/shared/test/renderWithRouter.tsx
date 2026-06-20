import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";

interface RouteConfig {
  path: string;
  element: ReactElement;
}

interface RenderWithRouterOptions {
  initialEntries?: string[];
  routes: RouteConfig[];
}

export function renderWithRouter({
  initialEntries = ["/"],
  routes,
}: RenderWithRouterOptions) {
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
