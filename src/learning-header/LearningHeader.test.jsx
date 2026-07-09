import React from 'react';
import {
  authenticatedUser, initializeMockApp, render, screen,
} from '../setupTest';
import { LearningHeader as Header } from '../index';

describe('Header', () => {
  beforeAll(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
    await initializeMockApp();
  });

  it('displays user button with full name', () => {
    render(<Header />);
    // Prefer the JWT `name` claim (full display name) over the opaque
    // `username` so the learner sees their real name in the dropdown trigger.
    // Falls back to `username` only when the JWT has no `name` claim.
    expect(screen.getByText(authenticatedUser.name)).toBeInTheDocument();
  });

  it('displays course data', () => {
    const courseData = {
      courseOrg: 'course-org',
      courseNumber: 'course-number',
      courseTitle: 'course-title',
    };
    render(<Header {...courseData} />);

    expect(screen.getByText(`${courseData.courseOrg} ${courseData.courseNumber}`)).toBeInTheDocument();
    expect(screen.getByText(courseData.courseTitle)).toBeInTheDocument();
  });
});
