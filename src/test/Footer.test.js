import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from '../components/Footer';

describe('Footer component', () => {
  test('renders About Us section', () => {
    render(<Footer/>)
    const { getByText } = render(<Footer />);
    const [aboutUsTitle] = screen.getAllByText('About Us');
    expect(aboutUsTitle).toBeInTheDocument();

    // You can add more assertions to check the content of the About Us section if needed
  });

  test('renders Quick Links section', () => {
    const { getByText } = render(<Footer />);
    const quickLinksTitle = screen.getByText('Quick Links');
    expect(quickLinksTitle).toBeInTheDocument();

    // You can add more assertions to check the content of the Quick Links section if needed
  });

  test('renders Contact Us section', () => {
    const { getByText } = render(<Footer />);
    const contactUsTitle = screen.getByText('Contact Us');
    expect(contactUsTitle).toBeInTheDocument();

    // You can add more assertions to check the content of the Contact Us section if needed
  });

  test('renders copyright notice', () => {
    const { getByText } = render(<Footer />);
    const copyrightNotice = screen.getByText('© 2024 All rights reserved. Designed by Academix');
    expect(copyrightNotice).toBeInTheDocument();
  });
});
