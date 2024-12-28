"use client";

import * as React from "react";

import { EmailReducer } from "../reducers/email-reducer";

import type { EmailContextType, EmailType } from "../types";

// Create Email context
export const EmailContext = React.createContext<EmailContextType | undefined>(
  undefined
);

export function EmailProvider({
  emailsData,
  children,
}: {
  emailsData: EmailType[];
  children: React.ReactNode;
}) {
  // Reducer to manage Email state
  const [emailState, dispatch] = React.useReducer(EmailReducer, {
    initalEmails: emailsData,
    emails: [],
    selectedEmails: [],
    currentPage: 1,
    totalPages: 1,
    totalEmails: 0,
  });

  // Sidebar state management
  const [isEmailSidebarOpen, setIsEmailSidebarOpen] = React.useState(false);

  // Handlers for email actions
  const handleGetFilteredEmails = React.useCallback(
    (filter: string, currentPage: number) => {
      dispatch({ type: "getFilteredEmails", filter, currentPage });
    },
    []
  );

  function handleGetFilteredEmailsBySearchTerm(
    term: string,
    filter: string,
    currentPage: number
  ) {
    dispatch({
      type: "getFilteredEmailsBySearchTerm",
      term,
      filter,
      currentPage,
    });
  }

  function handleToggleSelectEmail(email: EmailType) {
    dispatch({
      type: "toggleSelectEmail",
      email,
    });
  }

  function handleToggleSelectAllEmails() {
    dispatch({
      type: "toggleSelectAllEmail",
    });
  }

  function handleToggleStarEmail(email: EmailType) {
    dispatch({
      type: "toggleStarEmail",
      email,
    });
  }

  return (
    <EmailContext.Provider
      value={{
        emailState,
        handleGetFilteredEmails,
        handleGetFilteredEmailsBySearchTerm,
        handleToggleSelectEmail,
        handleToggleSelectAllEmails,
        handleToggleStarEmail,
        isEmailSidebarOpen,
        setIsEmailSidebarOpen,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
}
