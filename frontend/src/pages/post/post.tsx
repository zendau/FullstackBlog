import React, { useState } from 'react';

import { Redirect, Switch } from "react-router-dom";
import { renderRoute } from "../../utils/renderRoute"
import { postRoutes } from "../../router/Routes"


const Post: React.FC = () => {

  const [pageNumber, setPageNumber] = useState(1)
  const [limit, setLimit] = useState(5)

  return (
    <Switch>
      {
        postRoutes.map(route => renderRoute(route))
      }
      <Redirect to="/post/all" />
    </Switch>
  );
}

export default Post