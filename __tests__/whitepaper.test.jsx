import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhitepaperPage from '../pages/whitepaper';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => <>{children}</>,
  };
});

jest.mock('../components/OpenGraphHead', () => {
  return {
    __esModule: true,
    default: ({ title, description, image, url, type, imageWidth, imageHeight }) => (
      <div data-testid="og-head">
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content={imageWidth} />
        <meta property="og:image:height" content={imageHeight} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
      </div>
    ),
  };
});

describe('Whitepaper Page', () => {
  test('renders whitepaper page with correct title', () => {
    render(<WhitepaperPage />);
    const heading = screen.getByRole('heading', {
      name: /Bitcoin Land Bond White Paper/i
    });
    expect(heading).toBeInTheDocument();
  });

  test('renders Open Graph head component', () => {
    render(<WhitepaperPage />);
    const ogHead = screen.getByTestId('og-head');
    expect(ogHead).toBeInTheDocument();
  });

  test('displays document overview section', () => {
    render(<WhitepaperPage />);
    const overview = screen.getByText(/Document Overview/i);
    expect(overview).toBeInTheDocument();
  });

  test('displays key sections list', () => {
    render(<WhitepaperPage />);
    expect(screen.getByText(/Executive Summary & Problem Statement/i)).toBeInTheDocument();
    expect(screen.getByText(/Criminal Asset Recovery Framework/i)).toBeInTheDocument();
    expect(screen.getByText(/Housing Solution Design & Implementation/i)).toBeInTheDocument();
    expect(screen.getByText(/Financial Model & Sustainability/i)).toBeInTheDocument();
    expect(screen.getByText(/Governance & Accountability Mechanisms/i)).toBeInTheDocument();
    expect(screen.getByText(/Impact Metrics & Research Evidence/i)).toBeInTheDocument();
  });

  test('displays quick facts section with key metrics', () => {
    render(<WhitepaperPage />);
    expect(screen.getByText(/Total Asset Deployment/i)).toBeInTheDocument();
    expect(screen.getByText(/\$15 billion in seized digital assets/i)).toBeInTheDocument();
    expect(screen.getByText(/Annual Beneficiaries/i)).toBeInTheDocument();
    expect(screen.getByText(/600,000\+ formerly incarcerated individuals/i)).toBeInTheDocument();
    expect(screen.getByText(/Recidivism Reduction/i)).toBeInTheDocument();
    expect(screen.getByText(/20-30% expected impact/i)).toBeInTheDocument();
  });

  test('renders download buttons with correct attributes', () => {
    render(<WhitepaperPage />);

    const fullWhitepaperLink = screen.getByTestId('download-full-whitepaper');
    expect(fullWhitepaperLink).toHaveAttribute('href', '/bitcoin-land-bond-whitepaper.docx');
    expect(fullWhitepaperLink).toHaveAttribute('download', 'Bitcoin-Land-Bond-Whitepaper.docx');

    const summaryLink = screen.getByTestId('download-summary');
    expect(summaryLink).toHaveAttribute('href', '/bitcoin-land-bond-whitepaper.docx');
    expect(summaryLink).toHaveAttribute('download', 'Bitcoin-Land-Bond-Whitepaper.docx');
  });

  test('displays download options heading', () => {
    render(<WhitepaperPage />);
    const heading = screen.getByRole('heading', {
      name: /Download Options/i
    });
    expect(heading).toBeInTheDocument();
  });

  test('renders document information section', () => {
    render(<WhitepaperPage />);
    expect(screen.getByText(/Document Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Published/i)).toBeInTheDocument();
    expect(screen.getByText(/2026 - Current Version 2.0/i)).toBeInTheDocument();
    expect(screen.getByText(/Organization/i)).toBeInTheDocument();
    expect(screen.getByText(/Bitcoin Land Bond Initiative/i)).toBeInTheDocument();
    expect(screen.getByText(/Domain/i)).toBeInTheDocument();
    expect(screen.getByText(/formerlyincarcerated.org/i)).toBeInTheDocument();
  });

  test('renders contact section with email link', () => {
    render(<WhitepaperPage />);
    const contactLink = screen.getByRole('link', {
      name: /Contact Us/i
    });
    expect(contactLink).toHaveAttribute('href', 'mailto:hello@formerlyincarcerated.org');
  });

  test('renders back to home link', () => {
    render(<WhitepaperPage />);
    const backLink = screen.getByRole('link', {
      name: /Back to Home/i
    });
    expect(backLink).toHaveAttribute('href', '/');
  });

  test('has proper accessibility attributes', () => {
    render(<WhitepaperPage />);

    // Check that download links are focusable and have proper semantics
    const downloadLinks = screen.getAllByRole('link');
    downloadLinks.forEach(link => {
      expect(link).toBeVisible();
      expect(link).not.toHaveAttribute('disabled');
    });
  });
});
