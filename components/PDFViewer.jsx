import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, X } from 'lucide-react';

/**
 * PDF Viewer Component
 * Displays PDF documents with page navigation, zoom, and download capabilities
 */
export default function PDFViewer({ pdfUrl, title, onClose, showDownload = true }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfDocument, setPdfDocument] = useState(null);

  // Handle PDF loading and rendering
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);

        // Dynamically import pdfjs-dist to avoid SSR issues
        const pdfjsLib = await import('pdfjs-dist');

        // Set up worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        // Load PDF
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        setPdfDocument(pdf);
        setNumPages(pdf.numPages);
        setError(null);
      } catch (err) {
        setError('Failed to load PDF. Please try again.');
        console.error('PDF load error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (pdfUrl) {
      loadPDF();
    }
  }, [pdfUrl]);

  // Render PDF page to canvas
  useEffect(() => {
    if (!pdfDocument) return;

    const renderPage = async () => {
      try {
        const page = await pdfDocument.getPage(currentPage);
        const canvas = document.getElementById(`pdf-canvas-${currentPage}`);

        if (!canvas) return;

        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: zoom / 100 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
      } catch (err) {
        console.error('Page render error:', err);
      }
    };

    renderPage();
  }, [pdfDocument, currentPage, zoom]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < numPages) setCurrentPage(currentPage + 1);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl flex flex-col h-full md:h-5/6 w-full md:max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{title || 'PDF Document'}</h2>
            <p className="text-sm text-slate-600 mt-1">
              Page {currentPage} of {numPages || '...'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Close"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50 flex items-center justify-center p-6">
          {loading && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-600">Loading PDF...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700 font-semibold mb-2">Error Loading PDF</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {!loading && pdfDocument && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <canvas
                id={`pdf-canvas-${currentPage}`}
                className="max-w-full mx-auto"
                style={{ maxHeight: '70vh' }}
              />
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            {/* Page Navigation */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || !pdfDocument}
              className="p-2 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              title="Previous page"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>

            <input
              type="number"
              min="1"
              max={numPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= numPages) {
                  setCurrentPage(page);
                }
              }}
              className="w-16 px-3 py-2 border border-slate-300 rounded-lg text-center text-sm focus:outline-none focus:border-amber-500"
              disabled={!pdfDocument}
            />

            <button
              onClick={handleNextPage}
              disabled={currentPage >= numPages || !pdfDocument}
              className="p-2 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              title="Next page"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 50 || !pdfDocument}
                className="p-2 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                title="Zoom out"
              >
                <ZoomOut size={20} className="text-slate-600" />
              </button>

              <span className="text-sm text-slate-600 w-12 text-center">{zoom}%</span>

              <button
                onClick={handleZoomIn}
                disabled={zoom >= 200 || !pdfDocument}
                className="p-2 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                title="Zoom in"
              >
                <ZoomIn size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Download Button */}
            {showDownload && pdfUrl && (
              <a
                href={pdfUrl}
                download={title || 'document.pdf'}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Download</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
