import React, { useState } from 'react';

import { Redirect, Switch } from "react-router-dom";
import { renderRoute } from "../../utils/renderRoute"
import { postRoutes } from "../../router/Routes"
import { PageContext } from "../../context/PageContext";


const Post: React.FC = () => {

  const [pageNumber, setPageNumber] = useState(1)
  const [limit, setLimit] = useState(5)

  return (
    <PageContext.Provider value={{ pageNumber, setPageNumber, limit, setLimit }}>
      <Switch>
        {
          postRoutes.map(route => renderRoute(route))
        }
        <Redirect to="/post/all" />
      </Switch>
    </PageContext.Provider>
  );
}

export default Post