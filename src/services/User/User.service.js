import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import {
  getUser as getUserQuery,
  listUsers as listUsersQuery,
} from 'graphql/queries';

export const getCurrentUserService =
  async function authGetCurrentUserService() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return {
        id: user.attributes.sub,
        name: user.username,
      };
    } catch (e) {
      return null;
    }
  };

export const getUserService = async function apiGetUserService(id) {
  const userData = await API.graphql({
    query: getUserQuery,
    variables: { id },
  });
  return userData.data.getUser;
};

export const getUserByNameService = async function apiGetUserByNameService(
  name
) {
  const userListData = await API.graphql({
    query: listUsersQuery,
    variables: {
      filter: {
        name: { eq: name },
      },
    },
  });
  const userData = userListData.data.listUsers.items.find(
    (user) => user.name === name
  );
  return userData;
};

export const listUsersService = async function apiListUsersService() {
  const userData = await API.graphql({ query: listUsersQuery });
  return userData.data.listUsers.items;
};
