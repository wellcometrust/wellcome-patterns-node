import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mockUser } from '../../mocks/UserInfo.mock';
import { UserInfo } from '../../types/UserInfo';

const mockApiCall = () =>
  Promise.resolve({
    status: 200,
    user: mockUser,
  });

export type UserInfoContextState = {
  user?: UserInfo;
  isLoading: boolean;
  error?: unknown;
};

const UserInfoContext = React.createContext<UserInfoContextState | null>(null);

export function useUserInfo(): UserInfoContextState {
  const contextState = useContext(UserInfoContext);
  if (contextState === null) {
    throw new Error('useUserInfo must be used with a UserInfoProvider');
  }
  return contextState;
}

export const UserInfoProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<UserInfoContextState>({ isLoading: true });
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const fetchUser = async (): Promise<{ status: number; user: UserInfo }> => {
      return mockApiCall();
    };
    setState({ isLoading: true });
    fetchUser().then(({ user }) => setState({ isLoading: false, user }));
  }, [userId]);

  return (
    <UserInfoContext.Provider value={state}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const TestUserInfoProvider: React.FC<{
  value: UserInfoContextState;
}> = props => {
  return (
    <UserInfoContext.Provider value={props.value}>
      {props.children}
    </UserInfoContext.Provider>
  );
};
