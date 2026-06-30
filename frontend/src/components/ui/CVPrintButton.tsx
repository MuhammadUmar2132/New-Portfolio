'use client';

import { Download } from 'lucide-react';

export default function CVPrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all text-sm font-semibold shadow-lg"
    >
      <Download size={16} />
      Save as PDF
    </button>
  );
}
