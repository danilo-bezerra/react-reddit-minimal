import { ReactNode, createContext, useState } from "react";
import { SubRedditModel } from "../models/SubRedditModel";

interface IRedditContext {
  selectedSubReddit: SubRedditModel | null;
  selectSubReddit: (s: SubRedditModel) => void;
}

export const RedditContext = createContext<IRedditContext>({
  selectedSubReddit: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectSubReddit: (_s: SubRedditModel) => undefined,
});

type Props = {
  children: ReactNode;
};

export function RedditContextProvider({ children }: Props) {
  const [selectedSubReddit, setSelectedSubreddit] =
    useState<null | SubRedditModel>(null);

  function selectSubReddit(s: SubRedditModel) {
    setSelectedSubreddit(s);
  }

  return (
    <RedditContext.Provider
      value={{
        selectedSubReddit,
        selectSubReddit,
      }}
    >
      {children}
    </RedditContext.Provider>
  );
}
