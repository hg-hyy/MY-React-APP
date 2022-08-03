import { createSlice } from "@reduxjs/toolkit";
export const SELECT_SUBREDDIT = "SELECT_SUBREDDIT";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const INVALIDATE_SUBREDDIT = "INVALIDATE_SUBREDDIT";
const initialState = {
  selectedsubreddit: "frontend",
  entities: {
    users: {
      2: {
        id: 2,
        name: "Andrew",
      },
    },
    posts: {
      42: {
        id: 42,
        title: "Confusion about Flux and Relay",
        author: 2,
      },
      100: {
        id: 100,
        title:
          "Creating a Simple Application Using React JS and Flux Architecture",
        author: 2,
      },
    },
  },
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: [],
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [42, 100],
    },
  },
};

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export function fetchPosts(subreddit) {
  return (dispatch) => {
    dispatch(requestPosts(subreddit));
    return fetch(`http://127.0.0.1:8000/blog/login`)
      .then(
        (response) => response.json(),
        (error) => console.log("An error occurred.", error)
      )
      .then((json) => dispatch(receivePosts(subreddit, json)));
  };
}

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: initialState,
  reducers: {
    selectSubreddit(state, action) {
      state.selectedsubreddit = action.subreddit;
    },
    requestPosts(state, action) {
      Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    },
    receivePosts(state, action) {
      state.img = action.payload.img;
    },
    invalidateSubreddit(state, action) {
      state.img = action.payload.img;
    },
  },
});

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json,
    receivedAt: Date.now(),
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  // 注意这个函数也接收了 getState() 方法
  // 它让你选择接下来 dispatch 什么。

  // 当缓存的值是可用时，
  // 减少网络请求很有用。

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchPosts(subreddit));
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}

// Action creators are generated for each case reducer function
export const { changeTheme } = subredditSlice.actions;

export default subredditSlice.reducer;
