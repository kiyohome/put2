import { Configuration, Middleware, TrashApi, UsersApi } from './generated-rest-client';

const logger: Middleware = {
  pre: async (context) => {
    console.log(`>> ${context.init.method} ${context.url}`, context.init);
  },
  post: async (context) => {
    console.log(`<< ${context.response.status} ${context.url}`);
  },
};

const config = new Configuration({
  middleware: [logger],
});

const trashApi = new TrashApi(config);

const usersApi = new UsersApi(config);

const login = async (userName: string, password: string) => {
  return usersApi.login({ inlineObject: { userName, password } });
};

const logout = async () => {
  return usersApi.logout();
};

const getTrashList = async () => {
  return trashApi.getTrashList();
};

const postTrash = async (trash: Blob) => {
  return trashApi.postTrash({ body: trash });
};

export const BackendService = {
  login,
  logout,
  getTrashList,
  postTrash,
};
