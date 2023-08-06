import { Route, Routes } from 'react-router-dom';
import routes from '@routes/index';

const ClientRoutes = () => {
  const getRoutes = () => {
    const routeList = [];

    const renderElement = (route) => {
      const { layout: Layout, component: Component } = route;

      if (typeof Layout !== 'undefined') {
        return (
          <Layout>
            <Component />
          </Layout>
        );
      }

      return <Component />;
    };

    routes.forEach((route) => {
      if (route.subRoutes && route.subRoutes.length > 0) {
        route.subRoutes.forEach((subRoute) => {
          const fullPath = `${route.path}${subRoute.path}`;
          const element = renderElement(subRoute);
          routeList.push({
            path: fullPath,
            element,
          });
        });
      } else {
        const element = renderElement(route);
        routeList.push({
          path: route.path,
          element,
        });
      }
    });

    return routeList;
  };

  const routeList = getRoutes();

  return (
    <Routes>
      {routeList.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default ClientRoutes;
