/* eslint-disable quotes */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

it('renders welcome message', () => {
    render(<App />);
    expect(screen.getByText('123')).toBeInTheDocument();
});
