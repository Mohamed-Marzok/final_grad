import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../components/Hero';

describe('Hero component', () => {
  test('renders main heading and subheading', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    const mainHeading = screen.getByRole('heading');
    const subHeading = screen.getByText(/Acadmix is an interesting platform that will teach you in a more interactive way./i);

    expect(mainHeading).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
  });

  test('renders login and sign up buttons with correct links', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('link', { name: /Log In/i });
    const signUpButton = screen.getByRole('link', { name: /Sign Up/i });

    expect(loginButton).toHaveAttribute('href', '/login');
    expect(signUpButton).toHaveAttribute('href', '/signup');
  });

  test('renders hero image with correct alt text', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );

    const heroImage = screen.getByAltText('hero img');

    expect(heroImage).toBeInTheDocument();
  });
});
